import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, BookStore, SortType, User } from "@/types/types";

interface NextState {
  bookData: BookStore[];
  allbooks: BookStore[];
  userInfo: User | null;
  bookResponse: Book[];
  searchText: string;
  searchTimeout: NodeJS.Timeout | null;
  searchResults: Book[];
  sort: SortType;
}

const initialState: NextState = {
  bookData: [],
  allbooks: [],
  userInfo: null,
  bookResponse: [],
  searchText: "",
  searchTimeout: null,
  searchResults: [],
  sort: "newest",
};

function findBook(
  state: NextState,
  action: PayloadAction<Book>
): BookStore | undefined {
  return state.bookData.find(
    (item: BookStore) => item.isbn13 === action.payload.isbn13
  );
}

export const nextSlice = createSlice({
  name: "next",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<BookStore>) => {
      const existingBook = findBook(state, action);
      if (existingBook) {
        existingBook.quantity += action.payload.quantity;
      } else {
        state.bookData.push(action.payload);
      }
    },

    increaseQuantity: (state, action: PayloadAction<Book>) => {
      const existingBook = findBook(state, action);
      existingBook && existingBook.quantity++;
    },
    decreaseQuantity: (state, action: PayloadAction<Book>) => {
      const existingBook = findBook(state, action);
      if (existingBook?.quantity === 1) {
        existingBook.quantity = 1;
      } else {
        existingBook!.quantity--;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.bookData = state.bookData.filter(
        (item) => item.isbn13 !== action.payload
      );
    },

    resetCart: (state) => {
      state.bookData = [];
    },

    addUser: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
    },
    removeUser: (state) => {
      state.userInfo = null;
    },

    setBookResponse: (state, action: PayloadAction<Book[]>) => {
      state.bookResponse = action.payload;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setSearchTimeout: (state, action: PayloadAction<NodeJS.Timeout | null>) => {
      state.searchTimeout = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<Book[]>) => {
      state.searchResults = action.payload;
    },
    setSort: (state, action: PayloadAction<SortType>) => {
      state.sort = action.payload;
    },
  },
});

export const {
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
} = nextSlice.actions;
export default nextSlice.reducer;
