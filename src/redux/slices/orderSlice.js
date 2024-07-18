import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { builders } from "prettier/doc.js";

const initialState = {
  orders: null,
  loading: false,
  error: null,
};

export const userOrders = createAsyncThunk("user/orders", async (body) => {
  const loggedInUser = sessionStorage.getItem("loggedInUser")
    ? JSON.parse(sessionStorage.getItem("loggedInUser"))
    : "";
  const orderData = {
    userId: loggedInUser.id,
    products: body,
    total: body
      .map((item) => Number(item.price))
      .reduce((a, c) => a + c, 0)
      .toFixed(2),
    orderDate: new Date().toLocaleString(),
    status: "Panding",
  };
  const res = await fetch(`http://localhost:8300/orders`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(orderData),
  });
  return await res.json();
});

const orderSlice = createSlice({
  name: "orders",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(userOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(userOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(userOrders.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      });
  },
});

export default orderSlice.reducer;
