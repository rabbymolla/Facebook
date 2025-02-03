import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../counter/counterSlice";
import { authApi } from "../api/authApi";
import themeSlice from "../themes/themeSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    counter: counterReducer,
    themeMode: themeSlice,
  },
  devTools: import.meta.env.MODE !== "producation",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
