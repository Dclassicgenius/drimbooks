"use client";

import Image from "next/image";
import { LuMinus, LuPlus } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import {
  decreaseQuantity,
  deleteProduct,
  increaseQuantity,
} from "@/store/nextSlice";

import { BookStore } from "@/types/types";
import { useAppDispatch } from "@/hooks/hook";

export const FormattedPrice = ({ amount }: { amount: number }) => {
  const formattedAmount = new Number(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  return <span>{formattedAmount}</span>;
};

const CartItem = ({ item }: { item: BookStore }) => {
  const price = parseFloat(item.price.replace("$", ""));
  const cartItem = {
    title: item.title,
    subtitle: item.subtitle,
    isbn13: item.isbn13,
    price: item.price,
    image: item.image,
    url: item.url,
    quantity: 1,
  };

  const dispatch = useAppDispatch();

  return (
    <div className="bg-gray-100 rounded-lg flex flex-col items-start  md:items-center gap-4 md:justify-between p-4 md:p-2 md:flex-row">
      <div>
        <Image
          className="object-cover mx-auto"
          width={150}
          height={150}
          src={item.image}
          alt={item.title + "Image"}
        />
      </div>
      <div className="flex items-center px-2 gap-4 flex-col md:flex-row">
        <div className="flex flex-col gap-1">
          <p className=" font-semibold text-drim_dark text-sm">{item.title}</p>

          <p className="text-sm text-gray-600">
            Unit Price{" "}
            <span className="font-semibold text-drim_dark">
              <FormattedPrice amount={price} />
            </span>
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center mt-1 justify-between border border-gray-300 px-4 py-1 rounded-full w-28 shadow-lg shadow-gray-300">
              <span
                onClick={() => dispatch(increaseQuantity(cartItem))}
                className="w-6 h-6 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer decoration-purple-300"
              >
                <LuPlus />
              </span>
              <span>{item.quantity}</span>
              <span
                onClick={() => dispatch(decreaseQuantity(cartItem))}
                className="w-6 h-6 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer decoration-purple-300"
              >
                <LuMinus />
              </span>
            </div>
            <div
              onClick={() => dispatch(deleteProduct(item.isbn13))}
              className="flex items-center text-sm font-medium text-gray-400 hover:text-red-600 cursor-pointer duration-300"
            >
              <IoMdClose className="mt-[2px]" /> <p>remove</p>
            </div>
          </div>
        </div>
        <div className=" text-sm font-semibold text-drim_dark flex justify-between md:block">
          <p className="md:hidden">
            Subtotal: <FormattedPrice amount={price * item.quantity} />
          </p>

          <div className="hidden md:flex font-semibold text-drim_dark">
            <FormattedPrice amount={price * item.quantity} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
