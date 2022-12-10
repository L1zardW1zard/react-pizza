import { configureStore } from "@reduxjs/toolkit";
import filter from "./slieces/filterSlice";
import cart from "./slieces/cartSlice";
import pizza from "./slieces/pizzaSlice";

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});
