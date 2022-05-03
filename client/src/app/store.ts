import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authSlice";
import bookReducer from "../reducers/bookSlice";

export const store = configureStore({
   reducer: {
      auth: authReducer,
      books: bookReducer,
   },
});
