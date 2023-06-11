import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/counterslice";
import userReducer from "./slice/userSlice";
import commentReducer from "./slice/commentSlice";
import loginReducer from "./slice/loginSlice";
import blogReducer from "./slice/blogSlice";

// store is a single js obj. which holds all the reducers
const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: userReducer,
    comments: commentReducer,
    login: loginReducer,
    blog:blogReducer
  },
});
export default store;

// redux centralizes apps state
// makes data flow transparent and predictable
