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
    }
  }
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;



