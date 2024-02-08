import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   postList : null
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
  
     getAllPosts : (state ,action)=>{

         state.postList= action.payload;

        
     }
  }
});

export const {getAllPosts} = postSlice.actions;
export default postSlice.reducer;

