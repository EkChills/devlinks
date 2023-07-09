import { configureStore } from "@reduxjs/toolkit";
import linksSlice from "./features/linksSlice";

export const store = configureStore({
  reducer:{
    links:linksSlice
  }
})

export type GlobalState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch