import { configureStore } from "@reduxjs/toolkit";
import { authenticateReducer } from "../features/authentication/authenticationSlice";
import { householdReducer } from "../features/household/householdSlice";
import { profileApiSlice } from "../features/profile/profileApiSlice";
import profileReducer from "../features/profile/profileSlice";
import choreReducer from "../features/chore/choreSlice";

export const store = configureStore({
  reducer: {
    authenticateReducer: authenticateReducer,
    profileReducer: profileReducer,
    choreReducer: choreReducer,
    [profileApiSlice.reducerPath]: profileApiSlice.reducer,
    householdReducer: householdReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(profileApiSlice.middleware),
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
