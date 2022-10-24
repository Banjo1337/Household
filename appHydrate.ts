import { useAppDispatch } from "./hooks/reduxHooks";
import { hydrateHouseholdThunk } from "./features/household/householdSlice";
import { hydrateAuthenticationSliceFromSecureStorageThunk } from "./features/authentication/authenticationSlice";

//Call once on Profile selected
export default function HydrateApp(householdId: string): void {
  const dispatch = useAppDispatch();
  dispatch(hydrateHouseholdThunk(householdId));
  //ToDo: Hydrate pauses här?
  //ToDo: Hydrate chores här?
  //Todo: Hydrate choresCompleted här?
}

//Call once on app start
export function HydrateAuth(): void {
  const dispatch = useAppDispatch();
  console.log("dispatching HydrateAuth from appHydrate.tsx");
  dispatch(hydrateAuthenticationSliceFromSecureStorageThunk());
}
