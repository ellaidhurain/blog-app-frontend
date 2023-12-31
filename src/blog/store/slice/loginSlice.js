import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginRequest } from "../../services/api/userApi";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
    loading: false,
    err: null,
    data: null,
  },

  reducers: {
    // setLogin(state) {
    //   return {
    //     ...state,
    //     isLoggedIn: true,
    //   };
    // },
    // setLogout(state) {
    //   state.isLoggedIn = false;
    // },
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
        state.err = action.payload;
        state.loading = false;
      })
  },
});

export const { setLogout, setLogin } = loginSlice.actions;
export default loginSlice.reducer;

