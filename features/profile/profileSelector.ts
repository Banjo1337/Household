import { RootStateType } from "../../app/store";

export const selectActiveProfile = (state: RootStateType) => state.profileReducer.profile;
