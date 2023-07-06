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
        state.err = null;
      })
      .addCase(getallLikesForBlogRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.err = null;
        state.blogLikes = action.payload;
        // console.log(action.payload);
      })
      .addCase(getallLikesForBlogRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.err = action.error.message;
      })
      .addCase(addRemoveLikeRequest.pending, (state) => {
        state.isLoading = true;
        state.err = null;
      })
      .addCase(addRemoveLikeRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.err = null;
      })
      .addCase(addRemoveLikeRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.err = action.error.message;
      });
  },
});

export default likeSlice.reducer;
