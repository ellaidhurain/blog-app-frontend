import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addRemoveLikeRequest,
  getallLikesForBlogRequest,
} from "../../services/api/blogApi";

const likeSlice = createSlice({
  name: "likes",
  initialState: {
    isLoading: false,
    blogLikes: [],
    err: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getallLikesForBlogRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getallLikesForBlogRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogLikes = action.payload;
      })
      .addCase(getallLikesForBlogRequest.rejected, (state, action) => {
        state.err = action.payload;
      })
      .addCase(addRemoveLikeRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRemoveLikeRequest.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addRemoveLikeRequest.rejected, (state, action) => {
        state.err = action.payload;
      });
  },
});

export default likeSlice.reducer;
