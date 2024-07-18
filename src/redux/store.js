import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import cartSlice, { addToCart, removeFromCart } from "./slices/cartSlice";
import { productlists } from "../assets/data/data";
import Wishlist from "./slices/Wishlist";
import userSlice, { removeUserFromState } from "./slices/userSlice";
import orderSlice from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    wishlist: Wishlist,
    user: userSlice,
    orders: orderSlice,
  },
});
// console.log(store.getState().user);

// setTimeout(() => {
//   //   console.log(store);
//   console.log(store.getState().cart.itemList);
//   const cartItemIds = store.getState().cart.itemList;
//   const cartItems = cartItemIds.map(({ id, quantity }) => {
//     const cartI = productlists.find((pro) => pro.id === id);
//     console.log(cartI);
//     return { ...cartI, quantity };
//   });
//   console.log(cartItems);
// }, 2000);
// store.dispatch(addToCart(1));
// store.dispatch(addToCart(1));
// setTimeout(() => {
//   console.log("asdads");
//   removeUserFromState("");
// }, 2000);
