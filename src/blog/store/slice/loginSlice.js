import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginRequest } from "../../services/api/loginApi";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
    loading: false,
    err: null,
    data: null,
  },

  reducers: {
    setLogout(state) {
      state.isLoggedIn = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginRequest.pending, (state) => {
        state.isLoggedIn = false;
        state.loading = true;
      })
      .addCase(loginRequest.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loginRequest.rejected, (state, action) => {
        // Handle the error state
        state.err = action.payload;
        console.log(action.payload); // Error response data
      });
  },
});

export const { setLogout } = loginSlice.actions;
export default loginSlice.reducer;
