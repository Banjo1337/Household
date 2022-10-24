import { useAppDispatch} from "./hooks/reduxHooks";
import {
  hydrateHouseholdThunk,
} from "./features/household/householdSlice";

export default function Hydrate(householdId: string): void {
  const dispatch = useAppDispatch();
  dispatch(hydrateHouseholdThunk(householdId));
}
