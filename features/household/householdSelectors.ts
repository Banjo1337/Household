import { RootStateType } from "../../app/store";
import { Profile } from "../profile/profileTypes";

export const selectHousehold = (state: RootStateType) =>
  state.householdReducer.household;
export const selectProfileByHousholdId = (state: RootStateType) =>
  state.householdReducer.profiles;
export const selectHouseholdProfile = (state: RootStateType, profileId: string): Profile | undefined => selectProfileByHousholdId(state).find(p => p.id === profileId);