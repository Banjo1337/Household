import { newDateInClientTimezone } from "../../app/dateUtils";
import { RootStateType } from "../../app/store";
import {
  selectChoreCompletedStatisticsForAllChores,
  selectChoreCompletedStatisticsListForAllChores,
} from "../choreCompleted/choreCompletedSelectors";
import { StatisticsList } from "../choreCompleted/choreCompletedTypes";
import { selectProfileByHousehold } from "../household/householdSelectors";
import { Profile } from "../profile/profileTypes";
import { Pause } from "./pauseTypes";
import { pausePercentageDictionary } from "./pauseTypes";

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
  const currentPauses: Pause[] = [];
  pausesByProfileId.map((pause) => {
    if (
      pause.startDate < newDateInClientTimezone().toISOString() &&
      pause.endDate > newDateInClientTimezone().toISOString()
    ) {
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

  let returnValue = accumulatedPauseTime / totalTime;
  //För att undvika division med 0 hos de som konsumerar denna.
  if (returnValue >= 1) {
    return 0.99;
  }
  return returnValue;
};

function getProfileIdFromEmoji(profiles: Profile[], emoji: string): string {
  const profile = profiles.find((profile) => profile.avatar === emoji);
  if (profile) {
    return profile.id;
  } else {
    return "";
  }
}

export const selectPausePercentageDictionaryFromTimePeriodFromCurrentHousehold = (
  state: RootStateType,
  startDate: string,
  endDate: string,
): pausePercentageDictionary => {
  const profiles = selectProfileByHousehold(state);
  const pausePercentageDictionary: pausePercentageDictionary = {
    "🦊": selectPausePercentageAsDecimalInTimePeriodByProfileId(
      state,
      getProfileIdFromEmoji(profiles, "fox"),
      startDate,
      endDate,
    ),
    "🐷": selectPausePercentageAsDecimalInTimePeriodByProfileId(
      state,
      getProfileIdFromEmoji(profiles, "pig"),
      startDate,
      endDate,
    ),
    "🐸": selectPausePercentageAsDecimalInTimePeriodByProfileId(
      state,
      getProfileIdFromEmoji(profiles, "frog"),
      startDate,
      endDate,
    ),
    "🐥": selectPausePercentageAsDecimalInTimePeriodByProfileId(
      state,
      getProfileIdFromEmoji(profiles, "chicken"),
      startDate,
      endDate,
    ),
    "🐙": selectPausePercentageAsDecimalInTimePeriodByProfileId(
      state,
      getProfileIdFromEmoji(profiles, "octopus"),
      startDate,
      endDate,
    ),
    "🐬": selectPausePercentageAsDecimalInTimePeriodByProfileId(
      state,
      getProfileIdFromEmoji(profiles, "dolphin"),
      startDate,
      endDate,
    ),
    "🦉": selectPausePercentageAsDecimalInTimePeriodByProfileId(
      state,
      getProfileIdFromEmoji(profiles, "owl"),
      startDate,
      endDate,
    ),
    "🦄": selectPausePercentageAsDecimalInTimePeriodByProfileId(
      state,
      getProfileIdFromEmoji(profiles, "unicorn"),
      startDate,
      endDate,
    ),
  };
  return pausePercentageDictionary;
};

export const selectStatsForEachChoreNormalized = (
  state: RootStateType,
  start: Date,
  end: Date,
): StatisticsList[] => {
  const pausePercentageDictionary =
    selectPausePercentageDictionaryFromTimePeriodFromCurrentHousehold(
      state,
      start.toString(),
      end.toString(),
    );
  return selectChoreCompletedStatisticsListForAllChores(state, start, end).map((statList) => ({
    ...statList,
    data: statList.data.map((stat) => {
      const key = stat.emoji as keyof pausePercentageDictionary;
      const pausePercentage = pausePercentageDictionary[key];
      return {
        ...stat,
        value: stat.value / (1 - pausePercentage),
      };
    }),
  }));
};

export const selectStatsAllChoresNormalized = (state: RootStateType, start: Date, end: Date) => {
  const pausePercentageDictionary =
    selectPausePercentageDictionaryFromTimePeriodFromCurrentHousehold(
      state,
      start.toString(),
      end.toString(),
    );
  return selectChoreCompletedStatisticsForAllChores(state, start, end).map((stat) => {
    const key = stat.emoji as keyof pausePercentageDictionary;
    const pausePercentage = pausePercentageDictionary[key];
    return {
      ...stat,
      value: stat.value / (1 - pausePercentage),
    };
  });
};
