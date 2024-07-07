import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InputJsonDetails = {
  paths: (string | number | object)[][];
  keys: string[];
};

const initialState: InputJsonDetails = {
  paths: [],
  keys: [],
};

export const inputJsonDetailsSlice = createSlice({
  name: "inputJsonDetailsSlice",
  initialState,
  reducers: {
    setPaths: (state, action: PayloadAction<(string | number | object)[][]>) => {
      state.paths.push(...action.payload);
    },
    resetPaths: (state) => {
      state.paths = initialState.paths; // Reset path to initial state
    },
    setKeys: (state, action: PayloadAction<string[]>) => {
      state.keys.push(...action.payload);
    },
    resetKeys: (state) => {
      state.keys = initialState.keys;
    },
  },
});

export const {
  setKeys,
  resetKeys,
  setPaths,
  resetPaths,
} = inputJsonDetailsSlice.actions;

export default inputJsonDetailsSlice.reducer;
