import { configureStore } from "@reduxjs/toolkit";
import codeReducer from "./features/codeSlice";
import inputJsonReducer from "./features/inputJsonDetailsSlice"
import toastSlice from "./features/toastSlice";
import visibilityStatusSlice from "./features/visibilityStatusSlice";
import otherVariables from "./features/otherVariables";


export const store = configureStore({
  reducer: {
    codeReducer,
    inputJsonReducer,
    toastSlice,
    visibilityStatusSlice,
    otherVariables
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;