import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { RootStateType } from "../../app/store";

import {
  ChoreCompleted,
  ChoreCompletedCreateDto,
  ChoreCompletedState,
} from "./choreCompletedTypes";

const baseUrl = "https://household-backend.azurewebsites.net/api/V01/chorecompleted/";

const initialState: ChoreCompletedState = {
  completedChores: [] as ChoreCompleted[],
  isLoading: false,
  error: "",
};

export const addChoreCompleted = createAsyncThunk<
  ChoreCompleted,
  ChoreCompletedCreateDto,
  { rejectValue: string; state: RootStateType }
>("choreCompleted/addChoreCompleted", async (choreCompleted: ChoreCompletedCreateDto, thunkApi) => {
  const token = thunkApi.getState().authenticateReducer.token;
  try {
    const response = await fetch(baseUrl + "addChoreCompleted", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify(choreCompleted),
    });

    if (response.ok) {
      return (await response.json()) as ChoreCompleted;
    }

    return thunkApi.rejectWithValue(response.statusText);
  } catch (err) {
    if (err instanceof Error) {
      thunkApi.rejectWithValue(err.message);
    }
  }
  return thunkApi.rejectWithValue("Something went wrong when posting choreCompleted");
});

export const hydrateChoresCompletedSliceFromBackendThunk = createAsyncThunk<
  ChoreCompleted[],
  string,
  { rejectValue: string }
>("choreCompleted/getAllChores", async (householdId: string, thunkApi) => {
  try {
    const response = await fetch(baseUrl + "GetAllChoreCompletedByHouseholdId/" + householdId);

    if (response.ok) {
      return await response.json();
    } else {
      return thunkApi.rejectWithValue(response.statusText);
    }
  } catch (err) {
    if (err instanceof Error) {
      thunkApi.rejectWithValue(err.message);
    }
  }
});

const choreCompletedSlice = createSlice({
  name: "choreCompleted",
  initialState,
  reducers: {
    deHydrateChoresCompletedSlice: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addChoreCompleted.fulfilled, (state, action: PayloadAction<ChoreCompleted>) => {
      state.completedChores.push(action.payload);
      state.isLoading = false;
    }),
      builder.addCase(hydrateChoresCompletedSliceFromBackendThunk.fulfilled, (state, action) => {
        state.completedChores = action.payload;
        state.isLoading = false;
      }),
      builder.addMatcher(
        isAnyOf(addChoreCompleted.pending, hydrateChoresCompletedSliceFromBackendThunk.pending),
        (state) => {
          state.isLoading = true;
        },
      ),
      builder.addMatcher(
        isAnyOf(addChoreCompleted.rejected, hydrateChoresCompletedSliceFromBackendThunk.rejected),
        (state, action) => {
          if (action.payload) {
            state.error = action.payload;
          }
          state.isLoading = false;
        },
      );
  },
});

export default choreCompletedSlice.reducer;
export const { deHydrateChoresCompletedSlice } = choreCompletedSlice.actions;
