import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/blog",
  // baseURL : "https://snaplinkbackend.onrender.com/api/blog",
  withCredentials: true, // Enable sending cookies with requests
});

const token = localStorage.getItem("token");
api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

// Redux AsyncThunk is a Middleware for handling asynchronous actions in Redux and do operations on promise obj handled by redux
// synchronous operation waits for response of previous line or request
// asynchronous operation not waits for response of previous line or request. like api calls is asynchronous. 
// to handle this we use js built in method called Promise. Redux thunk use This Promise internally we can access using Redux middleware called thunk.
export const getAllBlogsRequest = createAsyncThunk(
  "blog/getAllBlogsRequest",
  async () => {
    if (token) {
      try {
        const res = await api.get(`/getAllBlogs`);
        return res.data;
      } catch (err) {
        const error = err.response.data.error;
        // console.log(error);
        return thunkAPI.rejectWithValue(error);
      }
    }
  }
);

// createAsyncThunk accepts two arguments first one is string which is action type, second one is call back fn which returns promise.
export const postBlogRequest = createAsyncThunk(
  "blog/postBlogRequest",
  async ({ formData }) => {
    try {
      const res = await api.post(`/addBlog`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
        },
      });
      const data = await res.data;
      return data;
    } catch (err) {
      // error throwed here is captured in extra reducers
      const error = err.response.data.error;
      // console.log(error);
      return thunkAPI.rejectWithValue(error); //sending the captured error to Slice
    }
  }
);

export const updateBlogRequest = createAsyncThunk(
  "blog/updateBlogRequest",
  //When using createAsyncThunk, the payload creator function should only take one argument, which is an object containing the parameters you need.
  async ({ blogId, formData }) => {
    try {
      const res = await api.put(`updateBlog/${blogId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
        },
      });

      const data = res.data;
      return data;
    } catch (err) {
      const error = err.response.data.error;
      // console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBlogRequest = createAsyncThunk(
  "blog/blogDeleteRequest",
  async ({ blogId }) => {
    try {
      const res = await api.delete(`/deleteOneBlog/${blogId}`);
      const data = res.data;
      return data;
    } catch (err) {
      const error = err.response.data.error;
      // console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCommentRequest = createAsyncThunk(
  "blog/getCommentRequest",
  async () => {
    if (token) {
      try {
        const res = await api.get(`/getAllComments`);
        // console.log(res.data);
        return res.data;
      } catch (err) {
        const error = err.response.data.error;
        // console.log(error);
        return thunkAPI.rejectWithValue(error);
      }
    }
  }
);

export const getallCommentsForBlogRequest = createAsyncThunk(
  "blog/getAllCommentsForBlog",
  async (blogId) => {
    if (token) {
      try {
        const res = await api.get(`/getAllCommentsForBlog/${blogId}`);
        // console.log(res.data);
        return res.data;
      } catch (err) {
        const error = err.response.data.error;
        // console.log(error);
        return thunkAPI.rejectWithValue(error);
      }
    }
  }
);

export const addCommentRequest = createAsyncThunk(
  "blog/addCommentRequest",
  async ({ comment, blogId }) => {
    try {
      const res = await api.post(`/addComment/${blogId}`, {
        comment: comment,
      });

      return res.data;
    } catch (err) {
      const error = err.response.data.error;
      // console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateCommentRequest = createAsyncThunk(
  "blog/addCommentRequest",
  async ({ updatedCommentText, blogId, commentId }) => {
    try {
      const res = await api.put(`/updateComment/${blogId}/${commentId}`, {
        comment: updatedCommentText,
      });

      return res.data;
    } catch (err) {
      const error = err.response.data.error;
      // console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCommentRequest = createAsyncThunk(
  "blog/deleteCommentRequest",
  async ({ commentId }) => {
    try {
      const res = await api.delete(`/deleteComment/${commentId}`);
      return res.data;
    } catch (err) {
      const error = err.response.data.error;
      // console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addRemoveLikeRequest = createAsyncThunk(
  "blog/addRemoveLikeRequest",
  async (blogId) => {
    try {
      const res = await api.post(`/addRemoveLike/${blogId}`);
      return res.data;
    } catch (err) {
      const error = err.response.data.error;
      // console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// {
//   "like": {
//       "_id": "649a938c837811381af49f72",
//       "user": "6499240451621d0bc46b8771",
//       "blog": "64981a6a6d5fe3e37b64ffaa",
//       "createdAt": "2023-06-27T07:45:16.590Z",
//       "updatedAt": "2023-06-27T07:45:16.590Z",
//       "__v": 0
//   },
//   "message": "liked"
// }

export const getallLikesForBlogRequest = createAsyncThunk(
  "blog/getallLikesForBlogRequest",
  async (blogId) => {
    if (token) {
      try {
        const res = await api.get(`/getallLikesForBlog/${blogId}`);
        // console.log(res.data);
        return res.data;
      } catch (err) {
        const error = err.response.data.error;
        // console.log(error);
        return thunkAPI.rejectWithValue(error);
      }
    }
  }
);

// [
//   {
//       "_id": "648803efd885801dee86772b",
//       "user": "6486e91f6be2850abc6ca91c",
//       "blog": "638ea69d64b5c0be233458fa",
//       "createdAt": "2023-06-13T05:51:43.283Z",
//       "updatedAt": "2023-06-13T05:51:43.283Z",
//       "__v": 0
//   },
//   {
//     "_id": "648803efd885801dee86772c",
//     "user": "6486e91f6be2850abc6ca91d",
//     "blog": "638ea69d64b5c0be233458fa",
//     "createdAt": "2023-06-13T05:51:43.283Z",
//     "updatedAt": "2023-06-13T05:51:43.283Z",
//     "__v": 0
// }
// ]

export const getAllLikesRequest = createAsyncThunk(
  "blog/getAllLikesRequest",
  async () => {
    if (token) {
      try {
        const res = await api.get(`/getAllLikes`);
        return res.data;
      } catch (err) {
        const error = err.response.data.error;
        // console.log(error);
        return thunkAPI.rejectWithValue(error);
      }
    }
  }
);
