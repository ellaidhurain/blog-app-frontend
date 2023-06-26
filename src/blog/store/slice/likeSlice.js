import { createSlice } from "@reduxjs/toolkit";
import { addLikeRequest, removeLikeRequest } from "../../services/api/blogApi";

const likeSlice = createSlice({
  name: "likes",
  initialState: {
    isLoading: false,
    likeList: [] || null,
    err: null,
  },
  reducers: {
    addLike(state, action) {
      state.push(action.payload); // => [{}]
      // return [...state, ...action.payload];
      // here we push new data in array, action.payload means input from user
    },

    removeLike(state, action) {
      //here we remove that particular data from array using filter method.
      //it does not remove user. it filter input id and based on function it shows other users and omits selected id
      state = state.filter((user) => user.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    // The builder object is being used to call the addCase method.
    // The addCase method allows you to specify how the state should be updated when a specific action is dispatched.
    builder
      .addCase(addLikeRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addLikeRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.likeList = action.payload.likes;
      })
      .addCase(addLikeRequest.rejected, (state, action) => {
        state.err = action.error.message;
      })
      .addCase(removeLikeRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeLikeRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.likeList = action.payload.likes;
      })
      .addCase(addLikeRequest.rejected, (state, action) => {
        state.err = action.error.message;
      });
  },
});

export const { addLike, removeLike } = likeSlice.actions; 
export default likeSlice.reducer; //
