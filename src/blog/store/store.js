import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import commentReducer from "./slice/commentSlice";
import likeReducer from "./slice/likeSlice";
import loginReducer from "./slice/loginSlice";
import signupReducer from "./slice/signupSlice";
import blogReducer from "./slice/blogSlice";

// Combine all your reducers
const rootReducer = {
  user: userReducer,
  commentSlice: commentReducer,
  likeSlice: likeReducer,
  login: loginReducer,
  signup: signupReducer,
  blog: blogReducer,
};

// store is a single js obj. which holds all the reducers
const store = configureStore({
  reducer: rootReducer,
});

export default store;

// redux centralizes apps state
// makes data flow transparent and predictable
