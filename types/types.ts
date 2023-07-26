export interface Book {
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
}

export interface BookList {
  total: string;
  books: Book[];
}

export interface BookStore extends Book {
  quantity: number;
}

export interface User {
  name: string | null | undefined;
  email: string | null | undefined;
  image?: string | null | undefined;
}

export interface BookDetail extends Book {
  error: string;
  authors: string;
  publisher: string;
  isbn10: string;
  isbn13: string;
  pages: string;
  year: string;
  rating: string;
  desc: string | null;
}

export type SortType = "newest" | "asc" | "desc";
