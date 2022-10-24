import { RootStateType } from "../../app/store";

export const selectHousehold = (state: RootStateType) =>
  state.householdReducer.household;
export const selectProfileByHousholdId = (state: RootStateType) =>
  state.householdReducer.profiles;