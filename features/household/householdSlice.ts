import {
  AnyAction,
  createSlice,
  PayloadAction,
  Reducer,
} from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

export interface HouseholdState {
  id: string;
  name: string;
  code: string;
}

const initialState: HouseholdState = {
  id: "",
  name: "",
  code: "",
};

const householdSlice = createSlice({
  name: "household",
  initialState,
  reducers: {
    changeHouseholdName: (state, action) => {
      state.name = action.payload;
    },
    createHousehold: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    deleteHousehold: (state, action) => {
      const Householdid = action.payload;
      //not completed yet
    },
  },
});

export const { changeHouseholdName, createHousehold, deleteHousehold } =
  householdSlice.actions;
export const householdReducer: Reducer<HouseholdState, AnyAction> =
  householdSlice.reducer;
