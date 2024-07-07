import { createSlice } from "@reduxjs/toolkit";
import { showToast } from "./toastSlice";
import { parse } from "path";
import { setGlobal } from "next/dist/trace";



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
    parseCode:(state, action)=>{
      let parsedCode=null
      console.log(typeof state.code)
      try{

        parsedCode=JSON.parse(state.code)  

      }catch(error:any){
        throw new Error(error.message)
      }
      if (parsedCode!=null){
        if (typeof parsedCode!=='object'){
          state.code=String(parsedCode)
        console.log(parsedCode)
        }
        
      }
 
      },
      formatCode:(state,action)=>{
        const formattedJsonString = JSON.stringify(JSON.parse(state.code), null, 2); // 2 spaces for indentation
        state.code=String(formattedJsonString)

      }      
    }
  },
);

export const { setCode, parseCode, formatCode } = codeSlice.actions;
export default codeSlice.reducer;