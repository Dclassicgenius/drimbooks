"use client";

import { Book, BookList, SortType } from "@/types/types";
import { BookCard } from "./BookCard";
import { useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import {
  setBookResponse,
  setSearchResults,
  setSearchText,
  setSearchTimeout,
  setSort,
} from "@/store/nextSlice";
type BookCardProps = {
  books: Book[];
};

const BookCardList = ({ books }: BookCardProps) => {
  return (
    <div className="w-full px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
      {books.map((book) => (
        <BookCard key={book.isbn13} book={book} />
      ))}
    </div>
  );
};

const BookDisplay = () => {
  const { bookResponse, searchText, searchTimeout, searchResults, sort } =
    useAppSelector((state) => state.next);

  const dispatch = useAppDispatch();

  const sortBooks = (books: Book[], sort: SortType): Book[] => {
    let sortedBooks;
    switch (sort) {
      case "asc":
        sortedBooks = [...books].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "desc":
        sortedBooks = [...books].sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        sortedBooks = [...books];
        break;
    }
    return sortedBooks;
  };

  useEffect(() => {
    async function getData() {
      const res = await fetch("https://api.itbook.store/1.0/new");

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = (await res.json()) as BookList;

      dispatch(setBookResponse(data.books));
    }

    getData();
  }, [dispatch]);

  const filterBooks = (searchtext: string) => {
    const regex = new RegExp(searchtext, "i");
    return bookResponse.filter(
      (item) => regex.test(item.title) || regex.test(item.subtitle)
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout!);
    dispatch(setSearchText(e.target.value));

    dispatch(
      setSearchTimeout(
        setTimeout(() => {
          const searchResult = filterBooks(e.target.value);
          dispatch(setSearchResults(searchResult));
        }, 500)
      )
    );
  };

  let sortedBookData = sortBooks(bookResponse, sort);

  let sortedSearchResults = sortBooks(searchResults, sort);

  return (
    <section>
      <div className=" bg-drim_brown flex flex-col mdl:flex-row mdl:justify-between md:items-center gap-4 px-6 pb-4">
        <div className="flex items-center justify-between relative w-full ">
          <input
            type="text"
            className=" h-full w-full rounded-md p-2 placeholder:text-sm text-sm text-black border-[3px] border-transparent outline-none focus-visible:border-drim_yellow"
            placeholder="Search for a book"
            value={searchText}
            onChange={handleSearchChange}
            required
          />
          <span className="h-full w-11 bg-drim_yellow text-black text-2xl flex items-center justify-center absolute right-0 rounded-tr-md rounded-br-md">
            <HiOutlineSearch />
          </span>
        </div>

        <div className=" flex flex-row gap-4 items-center text-xs sm:text-sm">
          <input
            id="newest"
            type="checkbox"
            checked={sort === "newest"}
            onChange={() => dispatch(setSort("newest"))}
            className=" w-6 h-6  accent-drim_yellow"
          />
          <label htmlFor="newest" className="text-drim_dark font-semibold">
            Newest
          </label>

          <input
            id="asc"
            type="checkbox"
            checked={sort === "asc"}
            onChange={() => dispatch(setSort("asc"))}
            className=" w-6 h-6 accent-drim_yellow"
          />
          <label htmlFor="asc" className="text-drim_dark font-semibold">
            Ascending
          </label>

          <input
            id="desc"
            type="checkbox"
            checked={sort === "desc"}
            onChange={() => dispatch(setSort("desc"))}
            className=" w-6 h-6 accent-drim_yellow"
          />
          <label htmlFor="desc" className="text-drim_dark font-semibold">
            Descending
          </label>
        </div>
      </div>

      <h1 className="text-3xl text-drim_dark font-bold px-6 my-3">New Books</h1>

      {searchText ? (
        <BookCardList books={sortedSearchResults} />
      ) : (
        <BookCardList books={sortedBookData} />
      )}
    </section>
  );
};

export default BookDisplay;
