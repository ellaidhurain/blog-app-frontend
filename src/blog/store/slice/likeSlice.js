import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addRemoveLikeRequest, getallLikesForBlogRequest } from '../../services/api/blogApi';

const likeSlice = createSlice({
  name: 'likes',
  initialState: {
    isLoading: false,
    blogLikes: {},
    err: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addRemoveLikeRequest.pending, (state) => {
        state.isLoading = true;
        state.err = null;
      })
      .addCase(addRemoveLikeRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.err = null;

        const { _id, like, message } = action.payload;
        if (message === 'liked') {
          if (!state.blogLikes[_id]) {
            state.blogLikes[_id] = []; // { 792hf84993 : [] }
          }
          state.blogLikes[_id].push(like); //{ 792hf84993: [jncsidf98434]}
        } else if (message === 'unliked') {
          state.blogLikes[_id] = state.blogLikes[_id].filter((item) => item._id !== like._id);
        }
      })
      .addCase(addRemoveLikeRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.err = action.error.message;
      })
      .addCase(getallLikesForBlogRequest.pending, (state) => {
        state.isLoading = true;
        state.err = null;
      })
      .addCase(getallLikesForBlogRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.err = null;

        const likes = action.payload.map((like) => like._id);
        // console.log(likes); => [[],[{like1,blog1},{like2,blog1}]] =>
        // action.payload => [[{like1,blog1},{like2,blog1}]],[{like1,blog2},{like2,blog2}]]]
        action.payload.forEach((like) => {
          // [key]:value 
          state.blogLikes[like.blog] = likes; //=> { 792hf84993: [jncsidf98434]}
        });
      })
      .addCase(getallLikesForBlogRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.err = action.error.message;
      });
  },
});

export default likeSlice.reducer;
