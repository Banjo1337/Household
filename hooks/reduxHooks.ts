import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootStateType, AppDispatchType } from "../app/store";

export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
