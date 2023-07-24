"use client";

import { BookDetail } from "@/types/types";
import { BookCard } from "./BookCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const DetailPage = () => {
  const [book, setBook] = useState<BookDetail | null>(null);

  const params = useParams();
  const id = params.id;

  const decodeHtmlEntities = (str: string) => {
    const parser = new DOMParser();
    const decodedString = parser.parseFromString(
      `<!doctype html><body>${str}`,
      "text/html"
    ).body.textContent;
    return decodedString;
  };

  useEffect(() => {
    const getBookDetail = async () => {
      const response = await fetch(`https://api.itbook.store/1.0/books/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = (await response.json()) as BookDetail;

      data.desc = data.desc ? decodeHtmlEntities(data.desc) : "";

      setBook(data);
    };
    if (id) getBookDetail();
  }, [id]);
  return (
    <>
      {book && (
        <div className="">
          <div className=" bg-drim_blue p-5 flex flex-col items-center justify-center ">
            <h1 className="text-2xl font-bold text-center text-drim_dark">
              {book.title}
            </h1>
            <h2 className="text-xl font-semibold text-drim_yellow text-center">
              {book.subtitle}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-10 px-5 mt-20 max-w-4xl mx-auto items-center">
            <div className=" col-span-2 md:col-span-1">
              <BookCard book={book} />
            </div>

            <div className="mb-5 text-sm col-span-2 md:col-span-1">
              <div className="grid grid-cols-2 bg-drim_blue p-3">
                <p>Price</p>
                <p className=" font-semibold text-drim_yellow">{book.price}</p>
              </div>
              <div className="grid grid-cols-2 bg-gray-100 p-3">
                <p>Rating</p>
                <p className=" font-semibold">
                  {book.rating !== "0" ? (
                    <span>{book.rating}/5</span>
                  ) : (
                    <span>No rating</span>
                  )}
                </p>
              </div>
              <div className="grid grid-cols-2 bg-drim_blue p-3">
                <p>Authors</p>
                <p className=" font-semibold">{book.authors}</p>
              </div>
              <div className="grid grid-cols-2 p-3">
                <p>Publisher</p>
                <p className=" font-semibold">{book.publisher}</p>
              </div>
              <div className="grid grid-cols-2 bg-drim_blue p-3">
                <p>Published</p>
                <p className=" font-semibold">{book.year}</p>
              </div>
              <div className="grid grid-cols-2 bg-gray-100 p-3">
                <p>Pages</p>
                <p className=" font-semibold">{book.pages}</p>
              </div>
              <div className="grid grid-cols-2 bg-drim_blue p-3">
                <p>Language</p>
                <p className=" font-semibold">English</p>
              </div>
              <div className="grid grid-cols-2 p-3">
                <p>Format</p>
                <p className=" font-semibold">Paper book / ebook (PDF)</p>
              </div>
              <div className="grid grid-cols-2 bg-drim_blue p-3">
                <p>ISBN-10</p>
                <p className=" font-semibold">{book.isbn10}</p>
              </div>
              <div className="grid grid-cols-2 p-3">
                <p>ISBN-13</p>
                <p className=" font-semibold">{book.isbn13}</p>
              </div>
            </div>
          </div>

          <div className="px-5 my-5 max-w-4xl mx-auto">
            <p className=" font-semibold mb-2 text-base">Description</p>
            <p>{book.desc}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailPage;
