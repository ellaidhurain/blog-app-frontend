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
  getOneUserRequest,
} from "../../services/api/userApi";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoadingUser: false,
    isLoadingFriend: false,
    userData: [],
    isUserErr: null,
    isFriendErr: null,
    userFriends: [],
    FriendRequests: [],
    userStatus: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOneUserRequest.pending, (state) => {
      state.isLoadingUser = true;
    })
    builder.addCase(getOneUserRequest.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.isLoadingUser = false;
      state.userStatus = "success"
    })
    builder.addCase(getOneUserRequest.rejected, (state, action) => {
      state.isUserErr = action.payload;
      state.userStatus = "failed"
    })
    builder.addCase(updateUserRequest.pending, (state, action) => {
      state.isLoadingUser = true;
    });
    builder.addCase(updateUserRequest.fulfilled, (state, action) => {
      state.isLoadingUser = false;
      state.userData = action.payload;
    });
    builder.addCase(updateUserRequest.rejected, (state, action) => {
      state.isUserErr = action.payload;
    });
    builder.addCase(updateProfileImageRequest.pending, (state, action) => {
      state.isLoadingUser = true;
    });
    builder.addCase(updateProfileImageRequest.fulfilled, (state, action) => {
      state.isLoadingUser = false;
      state.userData = action.payload;
    });
    builder.addCase(updateProfileImageRequest.rejected, (state, action) => {
      state.isUserErr = action.payload;
    });
    builder.addCase(getUserFriendsRequest.pending, (state, action) => {
      state.isLoadingFriend = true;
    });
    builder.addCase(getUserFriendsRequest.fulfilled, (state, action) => {
      state.isLoadingFriend = false;
      state.userFriends = action.payload;
    });
    builder.addCase(getUserFriendsRequest.rejected, (state, action) => {
      state.isFriendErr = action.payload;
    });
    builder.addCase(sendFriendRequest.pending, (state, action) => {
      state.isLoadingFriend = true;
    });
    builder.addCase(sendFriendRequest.fulfilled, (state, action) => {
      state.isLoadingFriend = false;
    });
    builder.addCase(sendFriendRequest.rejected, (state, action) => {
      state.isFriendErr = action.payload;
    });
    builder.addCase(acceptFriendRequest.pending, (state, action) => {
      state.isLoadingFriend = true;
    });
    builder.addCase(acceptFriendRequest.fulfilled, (state, action) => {
      state.isLoadingFriend = false;
    });
    builder.addCase(acceptFriendRequest.rejected, (state, action) => {
      state.isFriendErr = action.payload;
    });
    builder.addCase(getFriendRequests.pending, (state, action) => {
      state.isLoadingFriend = true;
    });
    builder.addCase(getFriendRequests.fulfilled, (state, action) => {
      state.isLoadingFriend = false;
      state.FriendRequests = action.payload;
    });
    builder.addCase(getFriendRequests.rejected, (state, action) => {
      state.isFriendErr = action.payload;
    });
    builder.addCase(rejectFriendRequest.pending, (state, action) => {
      state.isLoadingFriend = true;
    });
    builder.addCase(rejectFriendRequest.fulfilled, (state, action) => {
      state.isLoadingFriend = false;
    });
    builder.addCase(rejectFriendRequest.rejected, (state, action) => {
      state.isFriendErr = action.payload;
    });
    builder.addCase(removeFriendRequest.pending, (state, action) => {
      state.isLoadingFriend = true;
    });
    builder.addCase(removeFriendRequest.fulfilled, (state, action) => {
      state.isLoadingFriend = false;
    });
    builder.addCase(removeFriendRequest.rejected, (state, action) => {
      state.isFriendErr = action.payload;
    });
  },
});

export default userSlice.reducer;
