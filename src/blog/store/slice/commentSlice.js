import { createSlice } from "@reduxjs/toolkit";
import { addCommentRequest, getallCommentsForBlogRequest } from "../../services/api/blogApi";

const comments = [
  {
    id: 1,
    name: "martin",
    message:
      "This is the nice post of the year please keep post.you are doing great work!",
    profilepic: "/static/use.png",
    userId: 1,
    time: "1 hour ago",
  },
  {
    id: 2,
    name: "sundar",
    message:
      "This is the nice post of the year please keep post.This is the nice post of the year please keep post.This is the nice post of the year please keep post.you are doing great work!",
    userId: 2,
    profilepic: "/static/use2.png",
    time: "2 hours ago",
  },
];

const commentSlice = createSlice({
  name: "commentSlice",
  initialState: {
    isLoading: false,
    commentsList: [],
    err: null,
  },
  reducers: {
    addComment(state, action) {
      state.push(action.payload); // => [{}]
      // return [...state, ...action.payload];
      // here we push new data in array, action.payload means input from user
    },

    deleteComment(state, action) {
      //here we remove that particular data from array using filter method.
      //it does not remove user. it filter input id and based on function it shows other users and omits selected id
      state = state.filter((user) => user.id !== action.payload.id);
    },

    updateComment(state, action) {
      state.map((user) => {
        const { id, comment } = action.payload;
        //match object id with payload id
        if (user.id === id) {
          user.comment = comment; // add new value in array
        }
      });
    },

    copyComment(state, action) {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    // The builder object is being used to call the addCase method.
    // The addCase method allows you to specify how the state should be updated when a specific action is dispatched.
    builder
      .addCase(getallCommentsForBlogRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getallCommentsForBlogRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.commentsList = action.payload
        // console.log(action.payload);
      })
      .addCase(getallCommentsForBlogRequest.rejected, (state, action) => {
        state.err = action.error.message;
      })
      .addCase(addCommentRequest.pending,(state,action)=>{
        state.isLoading = true;
        state.err = false;
      })
      .addCase(addCommentRequest.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.err = false;
      })
      .addCase(addCommentRequest.rejected,(state,action)=>{
        state.isLoading = false;
        state.err = action.error?.message;
      })
  },
});

export const { addComment, deleteComment, updateComment } = commentSlice.actions; //grab all actions then export as addUser
export default commentSlice.reducer; //grab all reducer and export
