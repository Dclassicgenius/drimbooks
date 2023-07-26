import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
  resetCart,
  addUser,
  removeUser,
  setBookResponse,
  setSearchText,
  setSearchTimeout,
  setSearchResults,
  setSort,
} from "@/store/nextSlice";
import { RootState, store } from "@/store/store";
import { BookStore } from "@/types/types";
import { PURGE } from "redux-persist";

// Define a sample book to use in tests
const book: BookStore = {
  isbn13: "1",
  title: "1984",
  subtitle: "A Novel",
  image: "image_url",
  url: "book_url",
  price: "10",
  quantity: 1,
};

beforeEach(() => {
  store.dispatch({
    type: PURGE,
    result: () => null,
  });
});

// Test the addToCart action
test("Add book to cart", () => {
  store.dispatch(addToCart(book));
  let state: RootState = store.getState();
  const addedBook = state.next.bookData.find((book) => book.isbn13 === "1");
  expect(addedBook).toEqual(book);
});

// Test the increaseQuantity action
test("Increase book quantity", () => {
  store.dispatch(increaseQuantity(book));
  let state: RootState = store.getState();
  const updatedBook = state.next.bookData.find((book) => book.isbn13 === "1");
  expect(updatedBook?.quantity).toEqual(2);
});

// Test the decreaseQuantity action
test("Decrease book quantity", () => {
  store.dispatch(decreaseQuantity(book));
  let state: RootState = store.getState();
  const updatedBook = state.next.bookData.find((book) => book.isbn13 === "1");
  expect(updatedBook?.quantity).toEqual(1);
});

// Test the deleteProduct action
test("Delete book from cart", () => {
  store.dispatch(deleteProduct(book.isbn13));
  let state: RootState = store.getState();
  const deletedBook = state.next.bookData.find((book) => book.isbn13 === "1");
  expect(deletedBook).toBeUndefined();
});

// Test the resetCart action
test("Reset cart", () => {
  store.dispatch(addToCart(book));
  store.dispatch(resetCart());
  let state: RootState = store.getState();
  expect(state.next.bookData.length).toEqual(0);
});

// Test the addUser action
test("Add user", () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
  };
  store.dispatch(addUser(user));
  let state: RootState = store.getState();
  expect(state.next.userInfo).toEqual(user);
});

// Test the removeUser action
test("Remove user", () => {
  store.dispatch(removeUser());
  let state: RootState = store.getState();
  expect(state.next.userInfo).toBeNull();
});

// Test the setBookResponse action
test("Set book response", () => {
  const books = [book];
  store.dispatch(setBookResponse(books));
  let state: RootState = store.getState();
  expect(state.next.bookResponse).toEqual(books);
});

// Test the setSearchText action
test("Set search text", () => {
  const searchText = "1984";
  store.dispatch(setSearchText(searchText));
  let state: RootState = store.getState();
  expect(state.next.searchText).toEqual(searchText);
});

// Test the setSearchTimeout action
test("Set search timeout", () => {
  const timeout = setTimeout(() => {}, 1000);
  store.dispatch(setSearchTimeout(timeout));
  let state: RootState = store.getState();
  expect(state.next.searchTimeout).toEqual(timeout);
});

// Test the setSearchResults action
test("Set search results", () => {
  const books = [book];
  store.dispatch(setSearchResults(books));
  let state: RootState = store.getState();
  expect(state.next.searchResults).toEqual(books);
});

// Test the setSort action
test("Set sort", () => {
  const sortType = "newest";
  store.dispatch(setSort(sortType));
  let state: RootState = store.getState();
  expect(state.next.sort).toEqual(sortType);
});
