import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

export const api = axios.create({
  baseURL : "https://snaplinkbackend.onrender.com/api/user",
  // baseURL: "http://localhost:5000/api/user",
  withCredentials: true, // Enable sending cookies with requests
  credentials: "include",
});

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
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
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
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateUserRequest = createAsyncThunk(
  "update/updateUser",
  async ({ userId, post, thunkAPI }) => {
    try {
      const res = await api.put(`/updateUser/${userId}`, {
        Name: post.Name,
        Email: post.Email,
        location: post.location,
        about: post.about,
      });

      const data = res.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateProfileImageRequest = createAsyncThunk(
  "update/updateProfileImage",
  async ({ userId, formData, thunkAPI }) => {
    try {
      const res = await api.put(`/updateProfileImage/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
        },
      });

      const data = res.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getUserFriendsRequest = createAsyncThunk(
  "get/getUserFriends",
  async () => {
    try {
      const res = await api.get(`/getUserFriends`);
      // console.log(res.data);
      return res.data;
    } catch (err) {
      console.log("Error:", err);
      throw err;
    }
  }
);

export const getFriendRequests = createAsyncThunk(
  "get/getFriendRequests",
  async () => {
    try {
      const res = await api.get(`/getFriendRequests`);
      // console.log(res.data);
      return res.data;
    } catch (err) {
      console.log("Error:", err);
      throw err;
    }
  }
);

export const sendFriendRequest = createAsyncThunk(
  "post/sendFriendRequest",
  async (friendId, thunkAPI) => {
    try {
      const res = await api.post(`/sendFriendRequest/${friendId}`);
      const data = res.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
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
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
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
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
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
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);