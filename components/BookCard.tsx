"use client";

import { useAppDispatch } from "@/hooks/hook";
import { addToCart } from "@/store/nextSlice";
import { Book } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const BookCard = ({ book }: { book: Book }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleImageClick = () => {
    router.push(`/book/${book.isbn13}`);
  };
  return (
    <div className="shadow-md rounded-md p-4">
      <div onClick={handleImageClick}>
        <Image
          src={book.image}
          width={300}
          height={350}
          alt={book.title}
          className=" object-cover scale-90 hover:scale-100 transition-transform duration-300 mx-auto cursor-pointer"
        />
      </div>
      <h3 className=" font-bold text-xs min-h-[2.8em]">{book.title}</h3>
      <p className="text-gray-500 text-sm py-1 float-right">{book.price}</p>

      <button
        className=" w-full px-3 sm:px-5 py-2 bg-drim_dark text-lightText rounded-lg font-medium sm:text-base text-xs whitespace-nowrap hover:text-black hover:bg-drim_yellow duration-300 mt-4"
        onClick={() =>
          dispatch(
            addToCart({
              title: book.title,
              subtitle: book.subtitle,
              isbn13: book.isbn13,
              price: book.price,
              image: book.image,
              url: book.url,
              quantity: 1,
            })
          )
        }
      >
        Add to cart
      </button>
    </div>
  );
};
