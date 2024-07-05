import { createSlice } from "@reduxjs/toolkit";
type PathState = {
  path:string[]
};

const initialState: PathState = {
  path:[]
};

export const pathSlice = createSlice({
  name: "pathSlice",
  initialState,
  reducers: {
    setKeyPaths: (state, action) => {
      state.path.push(...action.payload)
    },
    resetKeyPaths: (state) => {
        state.path = initialState.path; // Reset path to initial state
    },
  },
});

export const { setKeyPaths, resetKeyPaths } = pathSlice.actions;
export default pathSlice.reducer;