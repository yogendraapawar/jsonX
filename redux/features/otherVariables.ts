// slices/toastSlice.js

import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  keySearchValue:'',
  loadingPageMessage:'Loading...'
};

const otherVariablesSlice = createSlice({
  name: 'visibilityStatusSlice',
  initialState,
  reducers: {
    setKeySearchValue:(state, action)=>{
        state.keySearchValue=action.payload
    },
    clearSetKeySearchValue:(state, action)=>{
        state.keySearchValue=initialState.keySearchValue
    },
    setLoadingPageMessage:(state, action)=>{
      state.loadingPageMessage=action.payload
  },
  resetLoadingPageMessage:(state, action)=>{
    state.loadingPageMessage=state.loadingPageMessage
},
  },
});

export const {setKeySearchValue, clearSetKeySearchValue, setLoadingPageMessage, resetLoadingPageMessage} = otherVariablesSlice.actions;
export default otherVariablesSlice.reducer;