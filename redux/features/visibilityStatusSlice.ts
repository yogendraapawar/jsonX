// slices/toastSlice.js

import { createSlice } from '@reduxjs/toolkit';



const initialState = {
  fetchJsonFromUrl:false,
  loadingSearchingPaths:false,
  fileImportLoader:false,
  showLoadingPage:false
};

const visibilitySlice = createSlice({
  name: 'visibilityStatusSlice',
  initialState,
  reducers: {
   setFetchJsonfromUrl:(state, action)=>{
    state.fetchJsonFromUrl=!state.fetchJsonFromUrl
   },
   setLoadingSearchingPaths:(state, action)=>{
    state.loadingSearchingPaths=action.payload
   },
   setFileImportLoader:(state, action)=>{
    state.fileImportLoader=action.payload
   },
   setShowLoadingPage:(state, action)=>{
    state.showLoadingPage=action.payload
   }
  },
});

export const {setFetchJsonfromUrl, setLoadingSearchingPaths, setFileImportLoader, setShowLoadingPage} = visibilitySlice.actions;
export default visibilitySlice.reducer;