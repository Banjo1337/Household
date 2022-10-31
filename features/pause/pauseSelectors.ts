import { newDateInClientTimezone } from "../../app/dateUtils";
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
  return pauses.filter((pause: Pause) => pause.profileIdQol === profileId);
};

export const selectCurrentlyPausedByProfileId = (state: RootStateType, profileId: string) => {
  const pauses = selectPauses(state);
  const pausesByProfileId = pauses.filter((pause: Pause) => pause.profileIdQol === profileId);
  const currentPauses:Pause[] = [];
  pausesByProfileId.map((pause)=>{
    if(pause.startDate<newDateInClientTimezone().toISOString()&&pause.endDate>newDateInClientTimezone().toISOString()){
    currentPauses.push(pause);
    }
  });
  return currentPauses;
};

export const selectHasUserPauseAtThisTime = (
  state: RootStateType,
  profileId: string,
  date: string,
): boolean => {
  const allPauses: Pause[] = selectPauses(state);
  const thisUsersPauses: Pause[] = allPauses.filter(
    (pause: Pause) => pause.profileIdQol === profileId,
  );
  // Check if there is a pause that is active at this time
  const thisUsersPausesAtThisTime: Pause[] = thisUsersPauses.filter((pause: Pause) => {
    const pauseStart: number = new Date(pause.startDate).getTime();
    const pauseEnd: number = new Date(pause.endDate).getTime();
    const dateToCheck: number = new Date(date).getTime();
    return pauseStart <= dateToCheck && pauseEnd >= dateToCheck;
  });
  return thisUsersPausesAtThisTime.length > 0;
};

//EdgeCase1: There is no pause in timePeriod
//EdgeCase2: Everything is paus in this timePeriod
//EdgeCase3: A pause start outside this period and ends inside this period
//EdgeCase4: A pause start inside this period and ends outside this period

export const selectPausePercentageAsDecimalInTimePeriodByProfileId = (
  state: RootStateType,
  profileId: string,
  timePeriodStart: string,
  timePeriodEnd: string,
): number => {
  const inTimePeriodStartAsUnix: number = new Date(timePeriodStart).getTime();
  const inTimePeriodEndAsUnix: number = new Date(timePeriodEnd).getTime();
  const totalTime: number = inTimePeriodEndAsUnix - inTimePeriodStartAsUnix;
  let accumulatedPauseTime: number = 0;
  const allPauses: Pause[] = selectPauses(state);
  const thisUsersPauses: Pause[] = allPauses.filter(
    (pause: Pause) => pause.profileIdQol === profileId,
  );

  const everythingIsAPause: boolean = thisUsersPauses.some((pause: Pause) => {
    return (
      new Date(pause.startDate).getTime() <= inTimePeriodStartAsUnix &&
      new Date(pause.endDate).getTime() >= inTimePeriodEndAsUnix
    );
  });
  if (everythingIsAPause) {
    return 1;
  }

  const nothingIsAPause: boolean = thisUsersPauses.every((pause: Pause) => {
    return (
      (new Date(pause.startDate).getTime() < inTimePeriodStartAsUnix &&
        new Date(pause.endDate).getTime() < inTimePeriodStartAsUnix) ||
      (new Date(pause.startDate).getTime() > inTimePeriodEndAsUnix &&
        new Date(pause.endDate).getTime() > inTimePeriodEndAsUnix)
    );
  });
  if (nothingIsAPause) {
    return 0;
  }

  const pausesCompletelyInsideTimePeriod: Pause[] = thisUsersPauses.filter((pause: Pause) => {
    return (
      new Date(pause.startDate).getTime() >= inTimePeriodStartAsUnix &&
      new Date(pause.startDate).getTime() <= inTimePeriodEndAsUnix &&
      new Date(pause.endDate).getTime() >= inTimePeriodStartAsUnix &&
      new Date(pause.endDate).getTime() <= inTimePeriodEndAsUnix
    );
  });
  const pausesCompletelyInsideTimePeriodAccumulatedTime: number =
    pausesCompletelyInsideTimePeriod.reduce((acc: number, pause: Pause) => {
      const pauseStart: number = new Date(pause.startDate).getTime();
      const pauseEnd: number = new Date(pause.endDate).getTime();
      return acc + (pauseEnd - pauseStart);
    }, 0);

  const pausesStartOutsideTimePeriodButEndInsideTimePeriod: Pause[] = thisUsersPauses.filter(
    (pause: Pause) => {
      return (
        new Date(pause.startDate).getTime() <= inTimePeriodStartAsUnix &&
        new Date(pause.endDate).getTime() >= inTimePeriodStartAsUnix &&
        new Date(pause.endDate).getTime() <= inTimePeriodEndAsUnix
      );
    },
  );
  let pausesStartOutsideTimePeriodButEndInsideTimePeriodTime: number = 0;
  if (pausesStartOutsideTimePeriodButEndInsideTimePeriod.length > 0) {
    pausesStartOutsideTimePeriodButEndInsideTimePeriodTime =
      new Date(pausesStartOutsideTimePeriodButEndInsideTimePeriod[0].endDate).getTime() -
      inTimePeriodStartAsUnix;
  }

  const pausesStartInsideTimePeriodButEndOutsideTimePeriod: Pause[] = thisUsersPauses.filter(
    (pause: Pause) => {
      return (
        new Date(pause.startDate).getTime() >= inTimePeriodStartAsUnix &&
        new Date(pause.startDate).getTime() <= inTimePeriodEndAsUnix &&
        new Date(pause.endDate).getTime() >= inTimePeriodEndAsUnix
      );
    },
  );
  let pausesStartInsideTimePeriodButEndOutsideTimePeriodTime: number = 0;
  if (pausesStartInsideTimePeriodButEndOutsideTimePeriod.length > 0) {
    pausesStartInsideTimePeriodButEndOutsideTimePeriodTime =
      inTimePeriodEndAsUnix -
      new Date(pausesStartInsideTimePeriodButEndOutsideTimePeriod[0].startDate).getTime();
  }

  accumulatedPauseTime =
    pausesCompletelyInsideTimePeriodAccumulatedTime +
    pausesStartOutsideTimePeriodButEndInsideTimePeriodTime +
    pausesStartInsideTimePeriodButEndOutsideTimePeriodTime;

  return accumulatedPauseTime / totalTime;
};
