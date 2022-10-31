import { RootStateType } from "../../app/store";
import { Profile } from "../profile/profileTypes";

export const selectHousehold = (state: RootStateType) =>
  state.householdReducer.household;
  
const selectHouseholdProfiles = (state: RootStateType) => state.householdReducer.profiles;

export const selectProfileByHousehold = (state: RootStateType) =>
  selectHouseholdProfiles(state).filter(p => !p.pendingRequest);

export const selectPendingRequestProfiles = (state: RootStateType) =>
  selectHouseholdProfiles(state).filter(p => p.pendingRequest);

export const selectHouseholdProfile = (state: RootStateType, profileId: string): Profile | undefined => selectProfileByHousehold(state).find(p => p.id === profileId);