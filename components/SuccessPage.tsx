"use client";

import { useAppDispatch } from "@/hooks/hook";
import { resetCart } from "@/store/nextSlice";
import Link from "next/link";
const SuccessPage = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col gap-2 items-center justify-center py-20">
      <h1 className="text-2xl text-hoverBg font-semibold">
        Thank you for shopping with us at DrimBooks
      </h1>
      <Link
        className="text-lg text-gray-500 hover:underline underline-offset-4 decoration-[1px] hover:text-blue-600 duration-300"
        href={"/"}
      >
        <p>Continue Shopping</p>
      </Link>
    </div>
  );
};

export default SuccessPage;
