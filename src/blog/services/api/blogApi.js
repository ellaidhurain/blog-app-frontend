import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

//Redux Thunk: Middleware for handling asynchronous actions in Redux

export const getOneUserRequest = createAsyncThunk(
  "blog/getOneUserRequest",
  async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/blog/getOneUser/${id}`
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
      const res = await axios.get(
        `http://localhost:5000/api/blog/getAllBlogs`,
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
      const res = await axios.get(`http://localhost:5000/api/blog/refresh`, {
        withCredentials: true,
      });
      //   console.log(res.data);
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
    const res = await axios
      .post(`http://localhost:5000/api/blog/addBlog`, {
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
      const res = await axios.put(
        `http://localhost:5000/api/blog/updateOneBlog/${blogId}`,
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
      const res = await axios.delete(
        `http://localhost:5000/api/blog/deleteOneBlog/${blogId}`,
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
      const res = await axios.get(
        `http://localhost:5000/api/blog/getAllComments`,
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
      const res = await axios.get(
        `http://localhost:5000/api/blog/http://localhost:5000/api/blog/addComment`,
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
      const res = await axios.get(
      `http://localhost:5000/api/blog/http://localhost:5000/api/blog/updateComment/${commentId}`,
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
      const res = await axios.delete(
        `http://localhost:5000/api/blog/http://localhost:5000/api/blog/deleteComment/${commentId}`,
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
      const res = await axios.delete(
        `http://localhost:5000/api/blog/addLike`,
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
      const res = await axios.delete(
        `http://localhost:5000/api/blog/http://localhost:5000/api/blog/removeLike/${likeId}`,
      )
      return res.data
    } catch (err) {
      throw err;
    }
  }
);
