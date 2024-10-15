import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/web/user-slice";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;
