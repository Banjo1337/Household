import { RootStateType } from "../../app/store";
import { Pause } from "./pauseTypes";

export const selectPauseErrorText = (state: RootStateType) => state.pauseReducer.error;
export const selectPauseIsLoading = (state: RootStateType) => state.pauseReducer.isLoading;
export const selectPauses = (state: RootStateType) => state.pauseReducer.pauses;
export const selectPauseByHouseholdId = (state: RootStateType, householdId: string) => {
  const pauses = selectPauses(state);
  return pauses.find((pause: Pause) => pause.householdId === householdId);
};
export const selectPauseByProfileId = (state: RootStateType, profileId: string) => {
  const pauses = selectPauses(state);
  return pauses.find((pause: Pause) => pause.profileIdQol === profileId);
};
