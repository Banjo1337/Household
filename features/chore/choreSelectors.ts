import { RootStateType } from "../../app/store";
import { Chore } from "./choreTypes";

export const selectChoreErrorText = (state: RootStateType): string => state.choreReducer.error;
export const selectChoreIsLoading = (state: RootStateType): Boolean => state.choreReducer.isLoading;
export const selectChores = (state: RootStateType): Chore[] => state.choreReducer.chores;
export const selectChoreById = (state: RootStateType, choreId: string): Chore => state.choreReducer.chores.find((chore) => chore.id == choreId) ?? ({} as Chore);
export const selectChoresByHouseholdId = (state: RootStateType, householdId: string): Chore[] => state.choreReducer.chores.filter((chore) => chore.householdId == householdId);
export const selectChoreFrequencyById = (state: RootStateType, choreId: string): number | undefined => state.choreReducer.chores.find((chore) => chore.id == choreId)?.frequency;

/*
DESSA SKALL LYFTAS TILL EN COMMON SELECTOR ENLIGT DAVIDS TIPS/LÄNK, då de behöver info från både chore och choreCompleted kollar påt senare :)

export const selectIsChoreOverdue = (state: RootStateType, choreId: string): Boolean => {
  const choreFrequence: number | undefined = selectChoreFrequencyById(state, choreId);
  
  även selectDaysPassedSinceLastCompletionForThisChoreId behöver lyftas
*/
