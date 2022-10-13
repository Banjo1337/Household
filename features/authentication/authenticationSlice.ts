import { AnyAction, createSlice, PayloadAction, Reducer } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

export interface AuthenticationState {
  token: string;
}

const initialState: AuthenticationState = {
  token: "",
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    authenticate: (state: WritableDraft<AuthenticationState>, action: PayloadAction<AuthenticationState>) => {
      sessionStorage.setItem("token", action.payload.token); //Probably convert to mobile something....AsyncStorage?
      return {
        ...state,
        token: action.payload.token,
      };
    },
    logout: () => {
      sessionStorage.removeItem("token"); //Probably convert to mobile something....AsyncStorage?
      return initialState;
    },
  },
});

export const { authenticate, logout } = authenticationSlice.actions;
//Slår knut på migsjälv nedan, fixa senare. Framöver om samma filter används på många olika ställen, kan filter med fördel exporteras här istället. DRY
//export const authenticationSelectorFilterGetAuthenticationState = (state: { authenticateUserReducer: AuthenticationState }) => state.authenticateUserReducer;
export const authenticateUserReducer: Reducer<AuthenticationState, AnyAction> = authenticationSlice.reducer;
