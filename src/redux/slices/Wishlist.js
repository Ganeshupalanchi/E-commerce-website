import { createSlice } from "@reduxjs/toolkit";
import React, { act } from "react";
import { toast } from "react-toastify";

const intialState = [];

const Wishlistslice = createSlice({
  name: "wishlist",
  initialState: {
    itemList: [],
  },
  reducers: {
    addToWishlist(state, action) {
      const newItem = action.payload;
      state.itemList.push(newItem);
      toast.success(`${newItem.title} Added To Wishlist.`, {
        position: "bottom-right",
      });
    },
    removeFromWishlist(state, action) {
      const itemId = action.payload;
      const exitinItem = state.itemList.find((item) => item.id === itemId);
      state.itemList = state.itemList.filter((item) => item.id !== itemId);
      toast.warning(`${exitinItem.title} Removed From Wishlist.`, {
        position: "bottom-right",
      });
    },
  },
});
export const { addToWishlist, removeFromWishlist } = Wishlistslice.actions;
export default Wishlistslice.reducer;
