// slices/toastSlice.js

import { createSlice } from '@reduxjs/toolkit';

type INITIALSTATE={
  keySearchValue:string,
  loadingPageMessage:string,
  darkMode:boolean
}

const initialState:INITIALSTATE = {
  keySearchValue:'',
  loadingPageMessage:'Loading...',
  darkMode:true
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
  setDarkMode:(state, action)=>{
    console.log("setting state", action.payload)
    state.darkMode=action.payload
},
  },
});

export const {setKeySearchValue, clearSetKeySearchValue, setLoadingPageMessage, resetLoadingPageMessage, setDarkMode} = otherVariablesSlice.actions;
export default otherVariablesSlice.reducer;