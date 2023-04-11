import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slice/counterslice";
import userReducer from "../slice/userSlice";
import commentReducer from "../slice/commentSlice";
import authReducer from "../slice/loginSlice";

const store = configureStore({ 
    reducer: {
        counter:counterReducer,
        users: userReducer,
        comments: commentReducer,
        auth:authReducer,
    } 
    });
export default store;
