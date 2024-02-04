import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
  success: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload.user;
      state.loading = false;
      state.error = null;
      state.success = action.payload.message; 
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = null;
    },

    updateUserStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload.user;
      state.loading = false;
      state.error = null;
      state.success = action.payload.message; 
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = null;
    },

    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
   
    },
   deleteUserSuccess: (state, action) => {
      state.currentUser = action.payload.user && null;
      state.loading = false;
      state.error = null;
      state.success = action.payload.message; 
   
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = null;
     
    },
    
    signoutStart:(state)=>{

      state.loading = true
      state.error = null;
     
 },

 signoutSuccess : (state , action)=>{

      state.currentUser = null;
      state.loading = false;
      state.error  = null ;


 },
 signoutFailure : (state , action)=>{
   state.error= action.payload;
   state.loading = false;

    
 }
  }
});

export const { signInStart, 
  signInSuccess, 
  signInFailure , 
  signoutStart , 
  signoutSuccess ,
  signoutFailure , 
  updateUserStart ,
updateUserSuccess ,
 updateUserFailure,
 deleteUserStart,
 deleteUserSuccess,
 deleteUserFailure


} = userSlice.actions;
export default userSlice.reducer;



