"use client";

import React from "react";

import Link from "next/link";
import { useAppSelector } from "@/hooks/hook";
import CartItem from "./CartItem";
import ResetCart from "./ResetCart";
import CartPayment from "./CartPayment";

const CartPage = () => {
  const { bookData } = useAppSelector((state) => state.next);
  return (
    <div className="max-w-4xl mx-auto px-6 grid grid-cols-5 gap-10 py-4 items-start">
      {bookData.length > 0 ? (
        <>
          <div className="bg-white col-span-5 md:col-span-4 p-4 rounded-lg">
            <div className="flex items-center justify-between border-b-[1px] border-b-gray-400 pb-1">
              <p className="text-2xl font-semibold text-drim_dark">
                Shopping Cart
              </p>
              <p className="text-lg font-semibold text-drim_dark hidden md:flex">
                Subtotal
              </p>
            </div>
            <div className="pt-2 flex flex-col gap-2">
              {bookData.map((item) => (
                <div key={item.isbn13}>
                  <CartItem item={item} />
                </div>
              ))}
              <ResetCart />
            </div>
          </div>
          <div className="bg-white w-full col-span-5 md:col-span-1 p-4 rounded-lg flex items-center justify-center md:mt-10">
            <CartPayment />
          </div>
        </>
      ) : (
        <div className="bg-white h-64 col-span-5 flex flex-col items-center justify-center py-5 rounded-lg shadow-lg">
          <h1 className="text-lg font-medium">Your cart is empty!</h1>
          <Link href={"/"}>
            <button className="w-52 h-10 bg-drim_dark text-white rounded-lg text-sm font-semibold hover:bg-drim_yellow hover:text-black col-span-5 md:col-span-1">
              go to shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
