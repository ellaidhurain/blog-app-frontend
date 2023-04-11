import {  createSlice } from "@reduxjs/toolkit";

//Slice is combination of actions and reducers 

const authSlice = createSlice({
  name: "auth",
  initialState: { 
    isLoggedIn: localStorage.getItem('userId'),
    isLoading: false,
    isRegistered: false
  },
  reducers: {
    setlogin(state) {
      state.isLoggedIn = true;
    },
    setlogout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const {setlogin ,setlogout}  = authSlice.actions
export default authSlice.reducer; 