import { configureStore } from "@reduxjs/toolkit";
import dietReducer from "./dietSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: {
    diet: dietReducer,
    ui: uiReducer,
  },
});
