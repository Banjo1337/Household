import { configureStore } from "@reduxjs/toolkit";
import { authenticateReducer } from "../features/authentication/authenticationSlice";
import { householdReducer } from "../features/household/householdSlice";
import profileReducer from "../features/profile/profileSlice";
import choreReducer from "../features/chore/choreSlice";
import choreCompletedReducer from "../features/choreCompleted/choreCompletedSlice";
import pauseReducer from "../features/pause/pauseSlice";

export const store = configureStore({
  reducer: {
    authenticateReducer: authenticateReducer,
    profileReducer: profileReducer,
    choreReducer: choreReducer,
    householdReducer: householdReducer,
    choreCompletedReducer: choreCompletedReducer,
    pauseReducer: pauseReducer,
  },
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
