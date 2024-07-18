import { createSlice } from "@reduxjs/toolkit";
import React, { act } from "react";
import { toast } from "react-toastify";

const initialState = {};
const getExitingItem = (state, id) => {
  const exitingPro = state.itemList.find((item) => item.id === id);
  return exitingPro;
};
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemList: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    totalQuantity: 0,
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const quantity = newItem.quantity || 1;
      const exitingItem = getExitingItem(state, newItem.id);
      if (exitingItem) {
        exitingItem.quantity = exitingItem.quantity + quantity;
        toast.success(`${newItem.title} Added To Cart.`, {
          position: "bottom-right",
        });
      } else {
        state.itemList.push({ ...newItem, quantity });
        toast.success(`${newItem.title} Added To Cart.`, {
          position: "bottom-right",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.itemList));
    },
    removeFromCart(state, action) {
      const itemId = action.payload;
      const exitingItem = getExitingItem(state, itemId);
      state.itemList = state.itemList.filter((item) => item.id !== itemId);
      toast.warning(`${exitingItem.title} Removed From Cart.`, {
        position: "bottom-right",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.itemList));
    },
    increaseQty(state, action) {
      const itemId = action.payload;
      const exitingItem = state.itemList.find((item) => item.id === itemId);
      exitingItem.quantity++;
      localStorage.setItem("cartItems", JSON.stringify(state.itemList));
    },
    decreaseQty(state, action) {
      const itemId = action.payload;
      const exitingItem = state.itemList.find((item) => item.id === itemId);
      if (exitingItem.quantity > 1) {
        exitingItem.quantity--;
      } else {
        state.itemList = state.itemList.filter((item) => item.id !== itemId);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.itemList));
    },
    clearCart(state, action) {
      state.itemList = [];
      localStorage.setItem("cartItems", JSON.stringify(state.itemList));
      toast.warning(`Cart is empty.`, {
        position: "bottom-right",
      });
    },
    checkout(state, action) {
      state.itemList = [];
      localStorage.setItem("cartItems", JSON.stringify(state.itemList));
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
  checkout,
} = cartSlice.actions;
export default cartSlice.reducer;
