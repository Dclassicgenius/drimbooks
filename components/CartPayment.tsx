import { SiMediamarkt } from "react-icons/si";
import { useState, useEffect } from "react";
import { FormattedPrice } from "./CartItem";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { useRouter } from "next/navigation";
import { resetCart } from "@/store/nextSlice";
import { signIn } from "next-auth/react";

const CartPayment = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const { bookData, userInfo } = useAppSelector((state) => state.next);

  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    let amt = 0;
    bookData.map((item) => {
      const price = parseFloat(item.price.replace("$", ""));
      amt += price * item.quantity;
      return;
    });
    setTotalAmount(amt);
  }, [bookData]);

  const handleCheckout = async () => {
    router.push("/cart/success");
    dispatch(resetCart());
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <span className="bg-green-600 rounded-full p-1 h-6 w-6 text-sm text-white flex items-center justify-center mt-1">
          <SiMediamarkt />
        </span>
        <p className="text-sm">
          Order will be shipped freely to the selected location
        </p>
      </div>
      <p className="flex items-center justify-between px-2 font-semibold">
        Total:{" "}
        <span className="font-bold text-xl">
          <FormattedPrice amount={totalAmount} />
        </span>
      </p>
      {userInfo ? (
        <div className="flex flex-col items-center">
          <button
            onClick={handleCheckout}
            className="w-full h-10 text-sm font-semibold bg-drim_dark text-white rounded-lg hover:bg-drim_yellow hover:text-black duration-300"
          >
            Checkout
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <button className="w-full h-10 text-sm font-semibold bg-drim_dark bg-opacity-50 text-white rounded-lg cursor-not-allowed">
            Checkout
          </button>
          <p className="text-xs mt-2 text-red-500 font-semibold animate-bounce">
            Please login to continue
          </p>

          <span
            className=" font-medium cursor-pointer hover:underline hover:text-blue-600 duration-300"
            onClick={() => signIn()}
          >
            Sign in
          </span>
        </div>
      )}
    </div>
  );
};

export default CartPayment;
