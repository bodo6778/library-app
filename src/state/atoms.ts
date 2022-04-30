import { atom } from "recoil";
import { book } from "../types/interfaces";
import { defaultBooks } from "../types/mockData";

export const booksState = atom({
  key: "booksAtom", // unique ID (with respect to other atoms/selectors)
  default: defaultBooks, // default value (aka initial value)
});

export const rentedBooksState = atom({
  key: "rentedBooksAtom", // unique ID (with respect to other atoms/selectors)
  default: [] as book[], // default value (aka initial value)
});
