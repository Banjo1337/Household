import { RootStateType } from "../../app/store";

export const selectHousehold = (state: RootStateType) =>
  state.householdReducer.household;
export const selectProfileByHousholdId = (state: RootStateType) =>
  state.householdReducer.profiles;
export const selectHouseholdProfile = (state: RootStateType, profileId: string) => selectProfileByHousholdId(state).find(p => p.id === profileId);