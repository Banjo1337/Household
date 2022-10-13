import { configureStore } from "@reduxjs/toolkit";
import { authenticateUserReducer } from "../features/authentication/authenticationSlice";

export const store = configureStore({
  reducer: {
    authenticateUserReducer: authenticateUserReducer,
  },
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
