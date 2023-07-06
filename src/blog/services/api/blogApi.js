import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/blog",
  withCredentials: true, // Enable sending cookies with requests
});

// Redux AsyncThunk is a Middleware for handling asynchronous actions in Redux and do operations on promise obj handled by redux
// const url = "https://blog-app-api-production-7b00.up.railway.app"
const url = "http://localhost:5000/api/user";

export const getOneUserRequest = createAsyncThunk(
  "blog/getOneUserRequest",
  async () => {
    try {
      const res = await axios.get(`${url}/getUser`);
      // console.log(res.data);
      return res.data;
    } catch (err) {
      console.log("Error:", err);
      throw err;
    }
  }
);

export const getAllBlogsRequest = createAsyncThunk(
  "blog/getAllBlogsRequest",
  async () => {
    try {
      const res = await api.get(`/getAllBlogs`, {
        withCredentials: true,
      });
      // console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const refreshTokenRequest = createAsyncThunk(
  "blog/refreshToken",
  async () => {
    try {
      const res = await api.get(`/refresh`, {
        withCredentials: true,
      });
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const postBlogRequest = createAsyncThunk(
  "blog/postBlogRequest",
  async ({ formData }) => {
    try {
      const res = await api.post(`/addBlog`, formData);
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateBlogRequest = createAsyncThunk(
  "blog/updateBlogRequest",
  //When using createAsyncThunk, the payload creator function should only take one argument, which is an object containing the parameters you need.
  async ({ blogId, inputs }) => {
    try {
      const res = await api.put(`updateOneBlog/${blogId}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
      });

      const data = res.data;
      return data;
    } catch (err) {
      console.log(err);
      return isRejectedWithValue(err.response.data);
    }
  }
);

export const deleteBlogRequest = createAsyncThunk(
  "blog/blogDeleteRequest",
  async ({ blogId }) => {
    try {
      const res = await api.delete(`/deleteOneBlog/${blogId}`, {
        withCredentials: true,
      });

      const data = res.data;
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const getCommentRequest = createAsyncThunk(
  "blog/getCommentRequest",
  async () => {
    try {
      const res = await api.get(`/getAllComments`, {
        withCredentials: true,
      });
      // console.log(res.data);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
);

export const getallCommentsForBlogRequest = createAsyncThunk(
  "blog/getAllCommentsForBlog",
  async (blogId) => {
    try {
      const res = await api.get(`/getAllCommentsForBlog/${blogId}`);
      // console.log(res.data);
      return res.data;
    } catch (err) {
      throw err;
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
      throw err;
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
      throw err;
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
      throw err;
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
      throw err;
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
    try {
      const res = await api.get(`/getallLikesForBlog/${blogId}`);
      // console.log(res.data);
      return res.data;
    } catch (err) {
      throw err;
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
    try {
      const res = await api.get(`/getAllLikes`);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
);
