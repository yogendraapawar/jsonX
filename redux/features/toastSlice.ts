// slices/toastSlice.js

import { createSlice } from '@reduxjs/toolkit';



const initialState = {
message:"Hello!",
  isVisible:false
};

const toastSlice = createSlice({
  name: 'toasts',
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.isVisible=true
      state.message=action.payload
    },
    hideToast: (state, action) => {
        state.isVisible=false
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;