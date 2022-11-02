import { useAppDispatch } from "../hooks/reduxHooks";
import { deHydrateHouseholdSlice } from "../features/household/householdSlice";
import { resetActiveProfile } from "../features/profile/profileSlice";
import { deHydrateChoresSlice } from "../features/chore/choreSlice";
import { deHydratePauseSlice } from "../features/pause/pauseSlice";
import { deHydrateChoresCompletedSlice } from "../features/choreCompleted/choreCompletedSlice";

export function useResetAndDeHydrateProfile() {
  const dispatch = useAppDispatch();

  return function () {
    dispatch(resetActiveProfile());
    dispatch(deHydrateHouseholdSlice());
    dispatch(deHydratePauseSlice());
    dispatch(deHydrateChoresSlice());
    dispatch(deHydrateChoresCompletedSlice());
  };
}
