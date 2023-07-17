import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;


export const api = axios.create({
  // baseURL : "https://snaplinkbackend.onrender.com/api/user",
  baseURL: "http://localhost:5000/api/user", 
  withCredentials: true, // Enable sending cookies with requests
  credentials: 'include'
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
        Name:inputs.Name,
        Email: inputs.Email,
        Password: inputs.Password,
        occupation:inputs.occupation,
        picturePath:inputs.picturePath
    
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
  async ({userId, post, thunkAPI}) => {
    try {
      const res = await api.put(`/updateUser/${userId}`, {
        Name:post.Name,
        Email: post.Email,
        location:post.location,
        about:post.about
      });
      
      const data = res.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


