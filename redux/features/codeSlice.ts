import { createSlice } from "@reduxjs/toolkit";



type CodeState = {
  code:string
};

const initialState: CodeState = {
  code:`{"tool":"jsonx", "creator":"yogendra"}`
};

export const codeSlice = createSlice({
  name: "codeSlice",
  initialState,
  reducers: {
    setCode: (state, action) => {
      state.code=action.payload
    },
  },
});

export const { setCode } = codeSlice.actions;
export default codeSlice.reducer;