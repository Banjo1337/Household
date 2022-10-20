import { configureStore } from "@reduxjs/toolkit";
import { authenticateUserReducer } from "../features/authentication/authenticationSlice";
import { profileApiSlice } from "../features/profile/profileApiSlice";
import  profileReducer  from "../features/profile/profileSlice";

export const store = configureStore({
  reducer: {
    authenticateUserReducer: authenticateUserReducer,
    profileReducer: profileReducer,
    [profileApiSlice.reducerPath]: profileApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(profileApiSlice.middleware),
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
