import { createSlice } from "@reduxjs/toolkit";
import {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriendRequest,
  getUserFriendsRequest,
  getFriendRequests,
  updateProfileImageRequest,
  updateUserRequest,
} from "../../services/api/userApi";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    userData: null,
    err: null,
    userFriends: [],
    FriendRequests:[]
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateUserRequest.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserRequest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userData = action.payload;
    });
    builder.addCase(updateUserRequest.rejected, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateProfileImageRequest.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateProfileImageRequest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userData = action.payload;
    });
    builder.addCase(updateProfileImageRequest.rejected, (state, action) => {
      state.err = action.error.message;
    });
    builder.addCase(getUserFriendsRequest.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUserFriendsRequest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userFriends = action.payload;
    });
    builder.addCase(getUserFriendsRequest.rejected, (state, action) => {
      state.err = action.error.message;
    });
    builder.addCase(sendFriendRequest.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(sendFriendRequest.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(sendFriendRequest.rejected, (state, action) => {
      state.err = action.error.message;
    });
    builder.addCase(acceptFriendRequest.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(acceptFriendRequest.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(acceptFriendRequest.rejected, (state, action) => {
      state.err = action.error.message;
    });
    builder.addCase(getFriendRequests.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getFriendRequests.fulfilled, (state, action) => {
      state.isLoading = false;
      state.FriendRequests = action.payload
    });
    builder.addCase(getFriendRequests.rejected, (state, action) => {
      state.err = action.error.message;
    });
    builder.addCase(rejectFriendRequest.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(rejectFriendRequest.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(rejectFriendRequest.rejected, (state, action) => {
      state.err = action.error.message;
    });
    builder.addCase(removeFriendRequest.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(removeFriendRequest.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(removeFriendRequest.rejected, (state, action) => {
      state.err = action.error.message;
    });
  },
});

export default userSlice.reducer;
