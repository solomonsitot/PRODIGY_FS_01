import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/counter/counterSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
