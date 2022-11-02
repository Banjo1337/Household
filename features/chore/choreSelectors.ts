import { newDateInClientTimezone } from "../../app/dateUtils";
import { RootStateType } from "../../app/store";
import { ChoreCompleted } from "../choreCompleted/choreCompletedTypes";
import { Profile } from "../profile/profileTypes";
import { Chore } from "./choreTypes";

export const selectChores = (state: RootStateType): Chore[] => state.choreReducer.chores;
export const selectChoreById = (state: RootStateType, choreId: string): Chore =>
  state.choreReducer.chores.find((chore) => chore.id == choreId) ?? ({} as Chore);

//OVERVIEW:
//selectChoresToShowInChoreScreen() : Chore[] //chore cards att generera i ChoreScreen, denna består av del a+b nedan.
//a) Allt från chores som inte är arkiverat.
//b) Plus de från choreCompleted som är arkiverat men bara 1 dag gammla.
//selectProfileWhoDidThisChore(choreId) : Profile //För att få access till Avatar för den som gjort denna chore
//selectDaysPassedSienceLastDoneAndFrequenceyAsText(choreId) : string //För att få texten som skall ligga till höger i de chore kort som har en frekvens
//selectIsChoreOverdue(choreId) : boolean //För att rendera röd cirkel bakom texten för de chore som är overdue

export const selectChoresToShowInChoreScreen = (state: RootStateType): Chore[] => {
  //KISS
  const choresCompleted: ChoreCompleted[] = state.choreCompletedReducer.completedChores;

  const chores: Chore[] = selectChores(state);
  const choresNotArchived: Chore[] = chores.filter((chore) => !chore.isArchived);
  const choresArchivedButOnly1DayOld: Chore[] = [];

  for (const chore of choresCompleted) {
    const choreCompletedDate = new Date(chore.completedAt);
    const today = newDateInClientTimezone();
    const diffTime = Math.abs(today.getTime() - choreCompletedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 1) {
      const choreToAdd = selectChoreById(state, chore.choreId);
      choresArchivedButOnly1DayOld.push(choreToAdd);
    }
  }

  const returnChores: Chore[] = [];
  returnChores.push(...choresNotArchived);
  returnChores.push(...choresArchivedButOnly1DayOld);
  const returnChoresWithoutDuplicates = returnChores.filter(
    (thing, i, arr) => arr.findIndex((t) => t.id === thing.id) === i,
  );
  return returnChoresWithoutDuplicates;
};

//KISS igen. Har snabbskummat denna https://redux.js.org/usage/deriving-data-selectors men inte fått något bra svar. skulle fråga David om nedan.
//Men å andra sidan. Selektorer som anropar andra selektorer blir lika mycket spagetti det, så kanske är nedan en bra/KISS lösning.

export const selectProfileWhoDidThisChoreByChoreId = (
  state: RootStateType,
  choreId: string,
): Profile => {
  const thisChoreCompletedLastDone = getLatestChoreCompletedByChoreId(state, choreId);

  const profiles: Profile[] = state.householdReducer.profiles;
  const returnProfile =
    profiles.find((profile) => profile.id == thisChoreCompletedLastDone.profileIdQol) ??
    ({} as Profile);
  return returnProfile;
};

export const selectDaysPassedSienceLastDoneAndFrequenceyAsTextByChoreId = (
  state: RootStateType,
  choreId: string,
): string => {
  const thisChoreCompletedLastDone = getLatestChoreCompletedByChoreId(state, choreId);
  const chore = selectChoreById(state, choreId);

  const choreCompletedDate = new Date(thisChoreCompletedLastDone.completedAt);
  const today = newDateInClientTimezone();
  const diffTime = Math.abs(today.getTime() - choreCompletedDate.getTime());

  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  let diffDaysText = "";
  if (isNaN(diffDays)) {
    diffDaysText = "0";
  } else {
    diffDaysText = diffDays.toString();
  }
  if (chore.frequency === 0) {
    return "";
  }
  const returnText = `${diffDaysText}/${chore.frequency}`;

  return returnText;
};

export const selectIsChoreOverdueByChoreId = (state: RootStateType, choreId: string): boolean => {
  const thisChoreCompletedLastDone = getLatestChoreCompletedByChoreId(state, choreId);

  const chore = selectChoreById(state, choreId);

  const choreCompletedDate = new Date(thisChoreCompletedLastDone.completedAt);
  const today = newDateInClientTimezone();
  const diffTime = Math.abs(today.getTime() - choreCompletedDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > chore.frequency;
};

function getLatestChoreCompletedByChoreId(state: RootStateType, choreId: string): ChoreCompleted {
  const allChoresCompleted: ChoreCompleted[] = state.choreCompletedReducer.completedChores;
  const thisChoreCompleted: ChoreCompleted[] = allChoresCompleted.filter(
    (cc) => cc.choreId == choreId,
  );
  const thisChoreCompletedSortedByDate: ChoreCompleted[] = thisChoreCompleted.sort((a, b) => {
    return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime();
  });
  const thisChoreCompletedLastDone = thisChoreCompletedSortedByDate[0] ?? ({} as ChoreCompleted);
  return thisChoreCompletedLastDone;
}
