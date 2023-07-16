import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const api = axios.create({
  // const baserURL = "https://blog-app-api-production-7b00.up.railway.app/api/user"

  baseURL: "http://localhost:5000/api/user", 
  withCredentials: true, // Enable sending cookies with requests
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


