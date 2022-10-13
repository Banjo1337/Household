import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootStateType, AppDispatchType } from "../app/store";

// Förutom frågetecken kring RTK Query och kommande apiSlice, så är dessa hooks enda (?) sättet för övrigt program att kommunicera med redux store.
export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
