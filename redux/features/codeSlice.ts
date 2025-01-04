import { PathManager } from "@/app/helpers/findKeys";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";


type CodeState = {
  code:string,
  selectedPathKeyValue:string,
  selectedPathIndex:number,
  keys: string[];
  paths: (string | number | object)[][];
  searchKeyValue:string;
  stringifiedCode:string


};

const initialState: CodeState = {
  code:`{"tool":"jsonx", "creator":"yogendra"}`,
  selectedPathKeyValue:"No path has been selected",
  selectedPathIndex:0,
  keys: [],
  paths:[],
  searchKeyValue:'',
  stringifiedCode:''

  
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
        try{
        const formattedJsonString = JSON.stringify(JSON.parse(state.code), null, 2); // 2 spaces for indentation
        state.code=String(formattedJsonString)
        }catch(error:any){
          throw new Error(error.message)
        }

      },
      stringifyCode:(state,action)=>{
        try{
        const formattedJsonString = JSON.stringify(state.code); // 2 spaces for indentation
        state.selectedPathKeyValue=formattedJsonString

        }catch(error:any){
          throw new Error(error.message)
        }

      }
      ,
      setSelectedPathKeyValue:(state, action)=>{
        const arr = action.payload["pathArray"];
        console.log("arr",arr)

        let tempVal = JSON.parse(action.payload["code"]);
        
        for (let i = 0; i < arr.length ; i++) {
          console.log(typeof tempVal)
          try{
            tempVal=JSON.parse(tempVal)
          }catch{
            tempVal=tempVal
          }
          if (typeof arr[i] === 'string') {
            tempVal = tempVal[arr[i]];
          } else {
            tempVal = tempVal[arr[i]];
          }
          
          console.log("value", tempVal);
        }
        
        let tempObj=tempVal;
        
        console.log(tempObj);
        state.selectedPathKeyValue=JSON.stringify(tempObj)
      },

      setSelectedPathIndex:(state, action)=>{
        state.selectedPathIndex=action.payload
      },
      setKeys: (state) => {
        const pathManager=new PathManager()
        pathManager.fetchKeys(JSON.parse(state.code));
        state.keys=Array.from(pathManager.getKeys())
      },
      resetKeys: (state) => {
        state.keys = initialState.keys;
      },

      setPaths: (state) => {
        const pathManager=new PathManager()
        let result =  pathManager.penetrateJson(
                JSON.parse(state.code),
                state.searchKeyValue
            );
            console.log('final_result', result);
            state.paths=result
      },
      resetPaths: (state) => {
        state.paths = initialState.paths; // Reset path to initial state
      },

      setSearchKeyValue:(state, action)=>{
        state.searchKeyValue=action.payload
      }
    }, extraReducers:(builder)=>{
        builder.addCase(fetchJsonFromURL.fulfilled, (state, action)=>{
          state.code=String(JSON.stringify(action.payload))
        }
      )
    },
    
    
    
    
  },
);

export const { setCode, parseCode, formatCode, setSelectedPathKeyValue, setSelectedPathIndex, setKeys, resetKeys, setPaths, resetPaths, setSearchKeyValue, stringifyCode } = codeSlice.actions;


export const fetchJsonFromURL = createAsyncThunk(
  'fetchJson',
  async (url: string, thunkAPI) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json)
      return json; // Return the fetched JSON data
    } catch (error) {
      console.error('Fetch JSON error:', error);
      throw error; // Rethrow the error to be handled by Redux Toolkit
    }
  }
);
export default codeSlice.reducer;