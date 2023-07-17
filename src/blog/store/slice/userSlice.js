import { createSlice } from "@reduxjs/toolkit";
import { updateUserRequest } from "../../services/api/userApi";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    err: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateUserRequest.pending, (state) => {
      state.isLoadingUser = true;
    });
    builder.addCase(updateUserRequest.fulfilled, (state) => {
      state.isLoadingUser = true;
      state.userData = action.payload;
    });
    builder.addCase(updateUserRequest.rejected, (state) => {
      state.err =  action.error.message;
    });
  },
});

export default userSlice.reducer;
