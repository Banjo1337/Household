import { configureStore } from "@reduxjs/toolkit";
import { authenticateUserReducer } from "../features/authentication/authenticationSlice";
import { householdReducer } from "../features/household/householdSlice";

export const store = configureStore({
  reducer: {
    authenticateUserReducer: authenticateUserReducer,
    householdReducer: householdReducer,
    //pauseReducer: pauseReducer,
    //profileRecuder: profileReducer,
    //choreReducer: choreReducer,
    //choreCompleted: choreCompleted,
  },
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
