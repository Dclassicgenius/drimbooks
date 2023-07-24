"use client";

import { useAppDispatch } from "@/hooks/hook";
import { resetCart } from "@/store/nextSlice";

const ResetCart = () => {
  const dispatch = useAppDispatch();

  const handleResetCart = () => {
    const confirmReset = window.confirm(
      "Are you sure to delete all items from the cart?"
    );
    if (confirmReset) {
      dispatch(resetCart());
    }
  };
  return (
    <button
      onClick={handleResetCart}
      className="w-44 h-10 font-semibold bg-gray-200 rounded-lg hover:bg-red-600 hover:text-white duration-300"
    >
      reset cart
    </button>
  );
};

export default ResetCart;
