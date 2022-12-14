import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { RootStateType } from "../../app/store";
import { Chore, ChoreCreateDto, ChoreState, ChoreUpdateDto } from "./choreTypes";

const baseUrl = "https://household-backend.azurewebsites.net/api/V01/chore/";

//const Token = () => useAppSelector(selectToken);

export const hydrateChoresSliceFromBackendThunk = createAsyncThunk<
  Chore[],
  string,
  { rejectValue: string }
>("chore/getAllChores", async (householdId: string, thunkApi) => {
  try {
    const response = await fetch(baseUrl + "Getchoresbyhouseholdid/" + householdId);

    if (response.ok) {
      return (await response.json()) as Chore[];
    }

    return thunkApi.rejectWithValue(JSON.stringify(response.body));
  } catch (err) {
    if (err instanceof Error) {
      return thunkApi.rejectWithValue(err.message);
    } else {
      return thunkApi.rejectWithValue("");
    }
  }
});

export const createChore = createAsyncThunk<
  Chore,
  ChoreCreateDto,
  { rejectValue: string; state: RootStateType }
>("chore/CreateChore", async (choreCreateDto: ChoreCreateDto, thunkApi) => {
  const token = thunkApi.getState().authenticateReducer.token;

  try {
    const response = await fetch(baseUrl + "AddChore", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify(choreCreateDto),
    });

    if (response.ok) {
      return (await response.json()) as Chore;
    }
    return thunkApi.rejectWithValue(JSON.stringify(response.body));
  } catch (err) {
    if (err instanceof Error) {
      return thunkApi.rejectWithValue(err.message);
    } else {
      return thunkApi.rejectWithValue("");
    }
  }
});

export const updateChore = createAsyncThunk<
  Chore,
  { choreUpdateDto: ChoreUpdateDto; choreId: string },
  { rejectValue: string; state: RootStateType }
>("chore/UpdateChore", async ({ choreUpdateDto, choreId }, thunkApi) => {
  const token = thunkApi.getState().authenticateReducer.token;
  try {
    const response = await fetch(baseUrl + "UpdateChore/" + choreId, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify(choreUpdateDto),
    });
    if (response.ok) {
      return (await response.json()) as Chore;
    }

    return thunkApi.rejectWithValue(JSON.stringify(response.body));
  } catch (err) {
    if (err instanceof Error) {
      return thunkApi.rejectWithValue(err.message);
    } else {
      return thunkApi.rejectWithValue("");
    }
  }
});

export const deleteChore = createAsyncThunk<
  string,
  string,
  { rejectValue: string; state: RootStateType }
>("chore/deleteChore", async (choreId: string, thunkApi) => {
  const token = thunkApi.getState().authenticateReducer.token;
  try {
    const response = await fetch(baseUrl + "DeleteChore/" + choreId, {
      method: "DELETE",
      headers: {
        authorization: "Bearer " + token,
      },
    });

    if (response.status == 204) {
      return choreId;
    }
    return thunkApi.rejectWithValue(JSON.stringify(response.body));
  } catch (err) {
    if (err instanceof Error) {
      return thunkApi.rejectWithValue(err.message);
    } else {
      return thunkApi.rejectWithValue("");
    }
  }
});

const initialState: ChoreState = {
  chores: [] as Chore[],
  isLoading: false,
  error: "",
};

const choreSlice = createSlice({
  name: "chore",
  initialState,
  reducers: {
    deHydrateChoresSlice: () => {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      hydrateChoresSliceFromBackendThunk.fulfilled,
      (state, action: PayloadAction<Chore[]>) => {
        state.chores = action.payload;
      },
    );
    builder.addCase(createChore.fulfilled, (state, action: PayloadAction<Chore>) => {
      state.isLoading = false;
      state.chores.push(action.payload);
    });
    builder.addCase(updateChore.fulfilled, (state, action: PayloadAction<Chore>) => {
      state.isLoading = false;
      state.chores = state.chores.map((chore) =>
        chore.id == action.payload.id ? action.payload : chore,
      );
    });
    builder.addCase(deleteChore.fulfilled, (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.chores = state.chores.filter((chore) => chore.id != action.payload);
    });
    builder.addMatcher(
      isAnyOf(
        createChore.pending,
        updateChore.pending,
        deleteChore.pending,
        hydrateChoresSliceFromBackendThunk.pending,
      ),
      (state) => {
        state.isLoading = true;
        state.error = "";
      },
    );
    builder.addMatcher(
      isAnyOf(
        createChore.rejected,
        updateChore.rejected,
        deleteChore.rejected,
        hydrateChoresSliceFromBackendThunk.rejected,
      ),
      (state, action) => {
        if (action.payload) {
          state.error = action.payload;
          console.log(action.payload);
        }
        state.isLoading = false;
      },
    );
  },
});

export default choreSlice.reducer;

export const { deHydrateChoresSlice } = choreSlice.actions;
