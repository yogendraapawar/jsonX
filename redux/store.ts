import { configureStore } from "@reduxjs/toolkit";
import codeReducer from "./features/codeSlice";
import keyPathSlice from "./features/keyPathSlice";

export const store = configureStore({
  reducer: {
    codeReducer,
    keyPathSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;