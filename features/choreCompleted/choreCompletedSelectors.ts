import { RootStateType } from "../../app/store";
import { selectChoreById, selectChores } from "../chore/choreSelectors";
import { selectHouseholdProfile } from "../household/householdSelectors";
import { Avatars } from "../profile/profileTypes";
import { ChoreCompleted, Statistics, StatisticsAvailability, StatisticsList } from "./choreCompletedTypes";

export const selectChoreCompleted = (state: RootStateType): ChoreCompleted[] =>
  state.choreCompletedReducer.completedChores;

export const selectStatAvailability = (state: RootStateType): StatisticsAvailability => {
  const now = new Date();
  return {
    StatisticsCurrentWeek: selectChoreCompletedRange(state, new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7), now).length > 0,
    StatisticsPreviousWeek: selectChoreCompletedRange(state, new Date(now.getFullYear(), now.getMonth(), now.getDate() - 14), new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)).length > 0,
    StatisticsPreviousMonth: selectChoreCompletedRange(state, new Date(now.getFullYear(), now.getMonth() - 2, now.getDate()), new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())).length > 0,
  };
};

export const selectChoreCompletedRange = (
  state: RootStateType,
  start: Date,
  end: Date,
): ChoreCompleted[] =>
  selectChoreCompleted(state).filter(
    (cc) => cc.completedAt >= start.toISOString() && cc.completedAt <= end.toISOString(),
  );

export const selectChoreCompletedByIdAllTime = (
  state: RootStateType,
  choreId: string,
): ChoreCompleted[] => selectChoreCompleted(state).filter((cc) => cc.choreId === choreId);

export const selectChoreCompletedByIdRange = (
  state: RootStateType,
  start: Date,
  end: Date,
  choreId: string,
): ChoreCompleted[] =>
  selectChoreCompletedByIdAllTime(state, choreId).filter(
    (cc) => cc.completedAt >= start.toISOString() && cc.completedAt <= end.toISOString(),
  );

export const selectChoreCompletedStatisticsForAllChores = (
  state: RootStateType,
  start: Date,
  end: Date,
): Statistics[] => selectStats(state, start, end);

export const selectChoreCompletedStatisticsForOneChore = (
  state: RootStateType,
  start: Date,
  end: Date,
  choreId: string,
): Statistics[] => selectStats(state, start, end, choreId);

export const selectChoreCompletedStatisticsListForAllChores = (
  state: RootStateType,
  start: Date,
  end: Date,
): StatisticsList[] => {
  let statisticsForAllChores: StatisticsList[] = [];
  const chores = selectChores(state);
  if (chores.length) {
    for (const chore of selectChores(state)) {
      const stats = selectChoreCompletedStatisticsForOneChore(state, start, end, chore.id);

      statisticsForAllChores.push({ id: chore.id, name: chore.name, data: stats });
    }
  }
  return statisticsForAllChores;
};

const selectStats = (
  state: RootStateType,
  start: Date,
  end: Date,
  choreId?: string,
): Statistics[] => {
  let groupedByProfileId;
  if (choreId) {
    groupedByProfileId = groupBy(
      selectChoreCompletedByIdRange(state, start, end, choreId),
      (cc) => cc.profileIdQol,
    );
  } else {
    groupedByProfileId = groupBy(
      selectChoreCompletedRange(state, start, end),
      (cc) => cc.profileIdQol,
    );
  }

  let totalPoints = [];

  for (const profileId in groupedByProfileId) {
    const choreHistory = groupedByProfileId[profileId];
    const groupedByChore = groupBy(choreHistory, (ch) => ch.choreId);

    let total = 0;
    for (const choreId in groupedByChore) {
      let chorePoints = selectChoreById(state, choreId)?.points;
      if (chorePoints) {
        total += chorePoints * groupedByChore[choreId].length;
      }
    }
    const profile = selectHouseholdProfile(state, profileId);

    if (profile) {
      const { color, emoji } = Avatars[profile.avatar];
      totalPoints.push({ key: profileId, value: total, svg: { fill: color }, emoji: emoji });
    }
  }

  return totalPoints;
};

// https://stackoverflow.com/questions/42136098/array-groupby-in-typescript
export const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);
