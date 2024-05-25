import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import { apiSlice } from "./api";

const store = configureStore({
  reducer: {
    user: userReducer,
    api: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
