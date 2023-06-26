import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/counterslice";
import userReducer from "./slice/userSlice";
import commentReducer from "./slice/commentSlice";
import likeReducer from "./slice/likeSlice";
import loginReducer from "./slice/loginSlice";
import signupReducer from "./slice/signupSlice";
import blogReducer from "./slice/blogSlice";

import { persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from "redux-persist"
import  storage  from "redux-persist/lib/storage";

// boiler plate
const persistConfig = { key: "root", storage, version:1}
const persistedLoginReducer = persistReducer(persistConfig,loginReducer);
const persistedBlogReducer = persistReducer(persistConfig,blogReducer);


// store is a single js obj. which holds all the reducers
const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: userReducer,
    comments: commentReducer,
    likes: likeReducer,
    login: persistedLoginReducer,
    signup: signupReducer,
    blog:persistedBlogReducer
  },
  middleware:(getDefaultMiddleware)=>
  getDefaultMiddleware({
      serializableCheck:{
        ignoreActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER],
      },
  }),
});

export default store;

// redux centralizes apps state
// makes data flow transparent and predictable


/*
Persistent State: Redux by itself does not persist the state, which means that when the application is refreshed or closed and reopened, the state is lost. "redux-persist" allows you to persist the Redux store state across sessions or page reloads, ensuring that the state is retained even when the application restarts.

Easy Integration: "redux-persist" provides a simple integration mechanism with Redux. By wrapping your Redux store with the persistStore function and using the PersistGate component, you can easily set up persistence without writing a lot of boilerplate code.

Flexible Storage Options: "redux-persist" offers flexibility in choosing the storage engine for persistence. It supports various storage engines such as browser's local storage, AsyncStorage (for React Native), and more. You can also create custom storage engines to fit your specific needs.

Reduced Network Requests: With persisted state, you can avoid unnecessary network requests when the application reloads or restarts. By restoring the state from the persisted storage, you can resume the application with the previously loaded data, reducing the need to fetch data again.

Improved User Experience: Persisting the state allows for a smoother user experience. Users can navigate the application without losing their current state, providing a seamless transition between different sessions or application instances.

Data Integrity: "redux-persist" provides mechanisms to handle data migrations when the structure of the persisted state changes. It allows for seamless upgrades to the persisted data format, ensuring data integrity and preventing compatibility issues when updating the application.
*/