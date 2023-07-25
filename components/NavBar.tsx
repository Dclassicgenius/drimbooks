"use client";

import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { addUser, removeUser } from "@/store/nextSlice";
import { BookStore } from "@/types/types";

const getTotalItems = (bookData: BookStore[]) => {
  return bookData.reduce((acc, book) => {
    acc += book.quantity;
    return acc;
  }, 0);
};

const NavBar = () => {
  const { bookData, userInfo } = useAppSelector((state) => state.next);
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const totalItems = getTotalItems(bookData);

  useEffect(() => {
    if (session) {
      dispatch(
        addUser({
          name: session?.user?.name,
          email: session?.user?.email,
          image: session?.user?.image,
        })
      );
    }
  }, [dispatch, session]);

  const handleSignOut = () => {
    signOut();
    dispatch(removeUser());
  };

  return (
    <nav className="w-full bg-drim_brown text-lightText sticky top-0 z-50 py-5">
      <div className="h-full w-full mx-auto flex items-center justify-between gap-1 mdl:gap-3 px-4">
        <Link
          href={"/"}
          className="px-2 text-drim_white border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] font-bold text-xl md:text-4xl mt-1"
        >
          DRIMBOOKS
        </Link>

        <div className="flex items-center gap-3 md:gap-10">
          {userInfo ? (
            <div className="flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] gap-1">
              <Image
                src={userInfo.image!}
                alt="user Image"
                className="rounded-full object-cover"
                width={32}
                height={32}
              />
              <div className=" hidden sml:flex text-xs text-gray-100 flex-col justify-between">
                <p className="text-white font-bold">{userInfo.name}</p>
                <p>{userInfo.email}</p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className=" py-1 px-3 border border-transparent hover:border-green-600 hover:text-green-400 text-drim_yellow cursor-pointer duration-300 bg-drim_dark rounded-full text-xs"
            >
              Sign In
            </button>
          )}

          <Link
            href={"/cart"}
            className="flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative py-1"
          >
            <Image
              className="object-cover h-auto "
              src="/cartIcon.png"
              alt="cartImg"
              width={32}
              height={32}
            />
            <p className="hidden md:block text-xs text-white font-bold mt-3">
              Cart
            </p>
            <span className="absolute text-drim_yellow text-xs sm:text-sm -top-0.5 sm:left-[22px] left-[18px] font-semibold">
              {bookData.length > 0 ? totalItems : 0}
            </span>
          </Link>

          {userInfo && (
            <div>
              <button
                onClick={handleSignOut}
                className=" py-1 px-3 border border-transparent hover:border-red-600 hover:text-red-400 text-drim_yellow cursor-pointer duration-300 bg-drim_dark rounded-full text-xs whitespace-nowrap"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
