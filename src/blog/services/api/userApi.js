import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const api = axios.create({
  baseURL : "https://snaplinkbackend.onrender.com/api/user",
  // baseURL: "http://localhost:5000/api/user",
  withCredentials: true, // Enable sending cookies with requests
});

const token = localStorage.getItem("token");
api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export const loginRequest = createAsyncThunk(
  "login/loginUser",
  async (inputs, thunkAPI) => {
    try {
      const res = await api.post(`/login`, {
        Email: inputs.Email,
        Password: inputs.Password,
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

export const refreshTokenRequest = createAsyncThunk(
  "blog/refreshToken",
  async () => {
    try {
      const res = await api.get(`/refresh`);
      return res.data;
    } catch (err) {
      const error = err.response.data.error;
      // console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signupRequest = createAsyncThunk(
  "signup/signupUser",
  async (inputs, thunkAPI) => {
    try {
      const res = await api.post(`/signup`, {
        Name: inputs.Name,
        Email: inputs.Email,
        Password: inputs.Password,
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

export const getOneUserRequest = createAsyncThunk(
  "blog/getOneUserRequest",
  async () => {
    if (token) {
      try {
        const res = await api.get(`/getUser`);
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

export const updateUserRequest = createAsyncThunk(
  "update/updateUser",
  async ({ post, thunkAPI }) => {
    try {
      const res = await api.put(`/updateUser`, {
        Name: post.Name,
        Email: post.Email,
        location: post.location,
        about: post.about,
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

export const updateProfileImageRequest = createAsyncThunk(
  "update/updateProfileImage",
  async ({ formData, thunkAPI }) => {
    try {
      const res = await api.put(`/updateProfileImage`, formData, {
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

export const getUserFriendsRequest = createAsyncThunk(
  "get/getUserFriends",
  async () => {
    if (token) {
      try {
        const res = await api.get(`/getUserFriends`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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

export const getFriendRequests = createAsyncThunk(
  "get/getFriendRequests",
  async () => {
    if (token) {
      try {
        const res = await api.get(`/getFriendRequests`);
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

export const sendFriendRequest = createAsyncThunk(
  "post/sendFriendRequest",
  async (friendId, thunkAPI) => {
    try {
      const res = await api.post(`/sendFriendRequest/${friendId}`);
      const data = res.data;
      // console.log("Response data:", data);
      return data;
    } catch (err) {
      const error = err.response.data.error;
      // console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const acceptFriendRequest = createAsyncThunk(
  "post/acceptFriendRequest",
  async (friendId, thunkAPI) => {
    try {
      const res = await api.post(`/acceptFriendRequest/${friendId}`);
      const data = res.data;
      return data;
    } catch (err) {
      const error = err.response.data.error;
      // console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const rejectFriendRequest = createAsyncThunk(
  "post/rejectFriendRequest",
  async (friendId, thunkAPI) => {
    try {
      const res = await api.post(`/rejectFriendRequest/${friendId}`);
      const data = res.data;
      return data;
    } catch (err) {
      const error = err.response.data.error;
      // console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeFriendRequest = createAsyncThunk(
  "post/removeFriend",
  async (friendId, thunkAPI) => {
    try {
      const res = await api.post(`/removeFriend/${friendId}`);
      const data = res.data;
      return data;
    } catch (err) {
      const error = err.response.data.error;
      // console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
