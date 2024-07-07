import { configureStore } from "@reduxjs/toolkit";
import codeReducer from "./features/codeSlice";
import inputJsonReducer from "./features/inputJsonDetailsSlice"
import toastSlice from "./features/toastSlice";


export const store = configureStore({
  reducer: {
    codeReducer,
    inputJsonReducer,
    toastSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;