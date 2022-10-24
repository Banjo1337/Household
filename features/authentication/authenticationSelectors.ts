import { RootStateType } from "../../app/store";

export const selectHasError = (state: RootStateType) => state.authenticateReducer.hasError;
export const selectError = (state: RootStateType) => state.authenticateReducer.error;
export const selectToken = (state: RootStateType) => state.authenticateReducer.token;
export const selectAuthUserId = (state: RootStateType) => state.authenticateReducer.authUserId;
