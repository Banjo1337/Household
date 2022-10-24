import { useAppDispatch } from "./hooks/reduxHooks";
import { hydrateAuthenticationSliceFromSecureStorageThunk } from "./features/authentication/authenticationSlice";

//Call once on Profile selected
//EN JÄKLA HOOK VIOLATION RULE GÖR ATT DENNA KOD JUST NU LIGGER I SelectProfileScreen.tsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HydrateApp(householdId: string): void {
  console.log("HydrateApp");
  //ToDo: Hydrate househhold här?
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
