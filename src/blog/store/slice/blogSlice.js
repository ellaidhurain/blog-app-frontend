import { createSlice } from "@reduxjs/toolkit";
import {
  deleteBlogRequest,
  getAllBlogsRequest,
  postBlogRequest,
  updateBlogRequest,
} from "../../services/api/blogApi";
import {
  refreshTokenRequest,
} from "../../services/api/userApi";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    isLoadingUser: false,
    isLoadingBlogs: false,
    isBlogErr: null,
    mode: "light",
    blogStatus: "idle",
  },
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },

    // addBlog: (state, action) => {
    //   state.blogs.push(action.payload);
    // },

    // updateBlog: (state, action) => {
    //   const updatedBlog = action.payload;
    //   // match arr element id with req id
    //   const index = state.blogs.findIndex(blog => blog.id === updatedBlog.id);
    //   if (index !== -1) { // this means if id exist
    //     state.blogs[index] = updatedBlog;
    //   }
    // },
    // deleteBlog: (state, action) => {
    //   const deletedBlogId = action.payload;
    //   state.blogs = state.blogs.filter(blog => blog.id !== deletedBlogId);
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(refreshTokenRequest.pending, (state) => {
        state.isLoadingUser = true;
      })
      .addCase(refreshTokenRequest.fulfilled, (state, action) => {
        state.blogs = action.payload;
      })
      .addCase(refreshTokenRequest.rejected, (state, action) => {
        state.isBlogErr = action.payload;
      })
      .addCase(getAllBlogsRequest.pending, (state) => {
        state.isLoadingBlogs = true;
      })
      .addCase(getAllBlogsRequest.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.isLoadingBlogs = false;
      })
      .addCase(getAllBlogsRequest.rejected, (state, action) => {
        state.isBlogErr = action.payload;
      })
      .addCase(postBlogRequest.pending, (state) => {
        state.isLoadingBlogs = true;
      })
      .addCase(postBlogRequest.fulfilled, (state, action) => {
        state.isLoadingBlogs = false;
      })
      .addCase(postBlogRequest.rejected, (state, action) => {
        state.isBlogErr = action.payload;
      })
      .addCase(updateBlogRequest.pending, (state) => {
        state.isLoadingBlogs = true;
      })
      .addCase(updateBlogRequest.fulfilled, (state) => {
        state.isLoadingBlogs = false;
      })
      .addCase(updateBlogRequest.rejected, (state, action) => {
        state.isBlogErr = action.payload;
      })
      .addCase(deleteBlogRequest.pending, (state) => {
        state.isLoadingBlogs = true;
      })
      .addCase(deleteBlogRequest.fulfilled, (state) => {
        state.isLoadingBlogs = false;
      })
      .addCase(deleteBlogRequest.rejected, (state, action) => {
        state.isBlogErr = action.payload;
      });
  },
});

export default blogSlice.reducer;
export const { setMode } = blogSlice.actions;
