import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slice/products";
import cartDataSlice from "./slice/cartDataSlice";

export const store = configureStore({
  reducer: {
    products : productsReducer,
    cartData : cartDataSlice
  }
})