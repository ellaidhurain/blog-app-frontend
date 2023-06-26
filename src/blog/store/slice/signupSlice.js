import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signupRequest } from "../../services/api/userApi";

const signupSlice = createSlice({
  name: "signup",
  initialState: {
    loading: false,
    err: null,
    data: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(signupRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(signupRequest.rejected, (state, action) => {
        state.err = action.payload;
        console.log(action.payload); 
      });
  },
});

export const { setLogout } = signupSlice.actions;
export default signupSlice.reducer;
