import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/AuthSlice";
export const store = configureStore({
  reducer: {
    authData: authReducer,
  },
});
