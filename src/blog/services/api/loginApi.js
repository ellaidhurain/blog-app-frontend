import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginRequest = createAsyncThunk(
  "login/loginUser",
  async (inputs, thunkAPI) => {
    try {
      const res = await axios.post("http://localhost:5000/api/user/login", {
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
