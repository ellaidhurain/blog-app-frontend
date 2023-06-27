import { createSlice } from "@reduxjs/toolkit";
import {
  deleteBlogRequest,
  getAllBlogsRequest,
  getOneUserRequest,
  postBlogRequest,
  refreshTokenRequest,
  updateBlogRequest,
} from "../../services/api/blogApi";


const blogSlice = createSlice({
  name: "blog",
  initialState: {
    userData: [],
    blogs: [],
    isLoadingUser: false,
    isLoadingBlogs: false,
    error: null,
    mode:"light"
  },
  reducers: {
    setMode: (state,action) =>{
      state.mode = action.payload
    },

    addBlog: (state, action) => {
      state.blogs.push(action.payload);
    },

    updateBlog: (state, action) => {
      const updatedBlog = action.payload;
      // match arr element id with req id
      const index = state.blogs.findIndex(blog => blog.id === updatedBlog.id);
      if (index !== -1) { // this means if id exist
        state.blogs[index] = updatedBlog;
      }
    },
    deleteBlog: (state, action) => {
      const deletedBlogId = action.payload;
      state.blogs = state.blogs.filter(blog => blog.id !== deletedBlogId);
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(getOneUserRequest.pending, (state) => {
        state.isLoadingUser = true;
      })
      .addCase(getOneUserRequest.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isLoadingUser = false;
      })
      .addCase(getOneUserRequest.rejected, (state, action) => {
        state.isLoadingUser = false;
        state.error = action.error.message;
      })
      .addCase(getAllBlogsRequest.pending, (state) => {
        state.isLoadingBlogs = true;
      })
      .addCase(getAllBlogsRequest.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.isLoadingBlogs = false;
      })
      .addCase(getAllBlogsRequest.rejected, (state, action) => {
        state.isLoadingBlogs = false;
        state.error = action.error.message;
      })
      .addCase(refreshTokenRequest.pending, (state) => {
        state.isLoadingUser = true;
      })
      .addCase(refreshTokenRequest.fulfilled, (state, action) => {
        state.blogs = action.payload;
      })
      .addCase(refreshTokenRequest.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(postBlogRequest.pending, (state) => {
        state.isLoadingBlogs = true;
      })
      .addCase(postBlogRequest.fulfilled, (state) => {
        state.isLoadingBlogs = false;
      })
      .addCase(postBlogRequest.rejected, (state, action) => {
        state.isLoadingBlogs = false;
        state.error = action.error.message;
      })
      .addCase(updateBlogRequest.pending, (state) => {
        state.isLoadingBlogs = true;
      })
      .addCase(updateBlogRequest.fulfilled, (state) => {
        state.isLoadingBlogs = false;
      })
      .addCase(updateBlogRequest.rejected, (state, action) => {
        state.isLoadingBlogs = false;
        state.error = action.error.message;
      })
      .addCase(deleteBlogRequest.pending, (state) => {
        state.isLoadingBlogs = true;
      })
      .addCase(deleteBlogRequest.fulfilled, (state) => {
        state.isLoadingBlogs = false;
      })
      .addCase(deleteBlogRequest.rejected, (state, action) => {
        state.isLoadingBlogs = false;
        state.error = action.error.message;
      });
  },
});

export default blogSlice.reducer;
export const { addBlog,updateBlog,deleteBlog,setMode } = blogSlice.actions