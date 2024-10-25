import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const signUpUser = createAsyncThunk("user/signupuser", async (body) => {
  const res = await fetch(`http://localhost:8300/users`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUserFromState(state, action) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload) {
          state.loading = false;
          state.user = action.payload;
        } else {
          toast.error("Signup Failed.");
        }
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default userSlice.reducer;
export const { removeUserFromState } = userSlice.actions;
