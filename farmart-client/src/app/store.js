import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import filesReducer from "./slices/files";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  files: filesReducer,
}

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});
