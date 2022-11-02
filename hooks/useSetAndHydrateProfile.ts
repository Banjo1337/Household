import { useAppDispatch } from "../hooks/reduxHooks";
import { hydrateHouseholdSliceFromBackendThunk } from "../features/household/householdSlice";
import { Profile } from "../features/profile/profileTypes";
import { setActiveProfile } from "../features/profile/profileSlice";
import { hydrateChoresSliceFromBackendThunk } from "../features/chore/choreSlice";
import { hydratePauseSliceFromBackendThunk } from "../features/pause/pauseSlice";
import { hydrateChoresCompletedSliceFromBackendThunk } from "../features/choreCompleted/choreCompletedSlice";

export function useSetAndHydrateProfile() {
  const dispatch = useAppDispatch();

  return async function (profile: Profile) {
    dispatch(setActiveProfile(profile));
    await dispatch(hydrateHouseholdSliceFromBackendThunk(profile.householdId));
    await dispatch(hydratePauseSliceFromBackendThunk(profile.householdId));
    await dispatch(hydrateChoresSliceFromBackendThunk(profile.householdId));
    await dispatch(hydrateChoresCompletedSliceFromBackendThunk(profile.householdId));
  };
}
