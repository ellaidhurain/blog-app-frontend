import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/blog", 
  withCredentials: true, // Enable sending cookies with requests
});

// Redux AsyncThunk is a Middleware for handling asynchronous actions in Redux and do operations on promise obj handled by redux
// const url = "https://blog-app-api-production-7b00.up.railway.app"
const url = "http://localhost:5000/api/user"

export const getOneUserRequest = createAsyncThunk(
  "blog/getOneUserRequest",
  async () => {
   
    try {
      const res = await axios.get(
        `${url}/getUser`
      );
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
      const res = await api.get(
        `/getAllBlogs`,
        {
          withCredentials: true,
        }
      );
      //   console.log(res.data);
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
  async ({ post }) => {
    const res = await api
      .post(`addBlog`, {
        title: post.title,
        description: post.description,
        image: post.image,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  }
);

export const updateBlogRequest = createAsyncThunk(
  "blog/updateBlogRequest",
  //When using createAsyncThunk, the payload creator function should only take one argument, which is an object containing the parameters you need.
  async ({ blogId, inputs }) => {
    try {
      const res = await api.put(
        `updateOneBlog/${blogId}`,
        {
          title: inputs.title,
          description: inputs.description,
          image: inputs.image,
        }
      );

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
      const res = await api.delete(
        `/deleteOneBlog/${blogId}`,
        {
          withCredentials: true,
        }
      );

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
      const res = await api.get(
        `/getAllComments`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
);

export const addCommentRequest = createAsyncThunk(
  "blog/addCommentRequest",
  async ({ comment,userId,blogId }) => {
    try {
      const res = await api.get(
        `/addComment`,
        {
          comment: comment,
          user: userId,
          blog: blogId ,
        }
      );

      return res.data;
    } catch (err) {
      throw err;
    }
  }
);


export const updateCommentRequest = createAsyncThunk(
  "blog/addCommentRequest",
  async ({ comment,userId,blogId,commentId }) => {
    try {
      const res = await api.get(
      `/updateComment/${commentId}`,
        {
          comment: comment,
          user: userId,
          blog: blogId ,
        }
      );

      return res.data;
    } catch (err) {
      throw err;
    }
  }
);


export const deleteCommentRequest = createAsyncThunk(
  "blog/deleteCommentRequest",
  async ({commentId}) => {
    try {
      const res = await api.delete(
        `/deleteComment/${commentId}`,
      )
      return res.data
    } catch (err) {
      throw err;
    }
  }
);

export const addLikeRequest = createAsyncThunk(
  "blog/addLikeRequest",
  async ({userId,blogId}) => {
    try {
      const res = await api.post(
        `/addLike`,
      {
        user:userId,
        blog:blogId
      })
      return res.data
    } catch (err) {
      throw err;
    }
  }
);

export const removeLikeRequest = createAsyncThunk(
  "blog/removeLikeRequest",
  async ({likeId}) => {
    try {
      const res = await api.delete(
        `/removeLike/${likeId}`,
      )
      return res.data
    } catch (err) {
      throw err;
    }
  }
);
