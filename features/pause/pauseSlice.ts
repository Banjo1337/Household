import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { RootStateType } from "../../app/store";
import { Pause, PauseCreateDto, PauseState, PauseUpdateDto } from "./pauseTypes";

const baseUrl = "https://household-backend.azurewebsites.net/api/V01/Pause/";

// const Token = () => useAppSelector(selectToken);

export const hydratePauseSliceFromBackendThunk = createAsyncThunk<
  Pause[],
  string,
  { rejectValue: string }
>("pause/GetPauseByHouseholdId", async (householdId: string, thunkApi) => {
  try {
    const response = await fetch(baseUrl + "GetPauseByHouseholdId/" + householdId);
    if (response.ok) {
      return (await response.json()) as Pause[];
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

export const createPause = createAsyncThunk<
  Pause,
  PauseCreateDto,
  { rejectValue: string; state: RootStateType }
>("pause/CreatePause", async (pauseCreateDto: PauseCreateDto, thunkApi) => {
  const token = thunkApi.getState().authenticateReducer.token;
  /* if (Token()) {
      return thunkApi.rejectWithValue("User not logged in");
    } */

  const startTime = pauseCreateDto.startDate;
  const endTime = pauseCreateDto.endDate;
  const profileIdQol = pauseCreateDto.profileIdQol;
  const pauses = thunkApi.getState().pauseReducer.pauses;

  for (let i = 0; i < pauses.length; i++) {
    const pause = pauses[i];
    if (pause.profileIdQol === profileIdQol) {
      if (
        (startTime >= pause.startDate && startTime <= pause.endDate) ||
        (endTime >= pause.startDate && endTime <= pause.endDate)
      ) {
        return thunkApi.rejectWithValue("Pause overlaps with existing pauses");
      }
    }
  }

  try {
    const response = await fetch(baseUrl + "AddPause", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify(pauseCreateDto),
    });

    if (response.ok) {
      return (await response.json()) as Pause;
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

export const updatePause = createAsyncThunk<
  Pause,
  { pauseUpdateDto: PauseUpdateDto; pauseId: string },
  { rejectValue: string }
>("pause/UpdatePause", async ({ pauseUpdateDto, pauseId }, thunkApi) => {
  /*   if (Token()) {
    return thunkApi.rejectWithValue("User not logged in");
  } */
  try {
    const response = await fetch(baseUrl + "UpdatePause/" + pauseId, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        //authorization: "Bearer " + Token(),
      },
      body: JSON.stringify(pauseUpdateDto),
    });

    if (response.ok) {
      return (await response.json()) as Pause;
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

const initialState: PauseState = {
  pauses: [] as Pause[],
  isLoading: false,
  error: "",
};

const pauseSlice = createSlice({
  name: "pause",
  initialState,
  reducers: {
    deHydratePauseSlice: () => {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      hydratePauseSliceFromBackendThunk.fulfilled,
      (state, action: PayloadAction<Pause[]>) => {
        state.pauses = action.payload;
      },
    );
    builder.addCase(createPause.fulfilled, (state, action: PayloadAction<Pause>) => {
      state.isLoading = false;
      state.pauses.push(action.payload);
    });
    builder.addCase(updatePause.fulfilled, (state, action: PayloadAction<Pause>) => {
      state.isLoading = false;
      state.pauses = state.pauses.map((pause) =>
        pause.id == action.payload.id ? action.payload : pause,
      );
    });

    builder.addMatcher(
      isAnyOf(createPause.pending, updatePause.pending, hydratePauseSliceFromBackendThunk.pending),
      (state) => {
        state.isLoading = true;
        state.error = "";
      },
    );
    builder.addMatcher(
      isAnyOf(
        createPause.rejected,
        updatePause.rejected,
        hydratePauseSliceFromBackendThunk.rejected,
      ),
      (state, action) => {
        if (action.payload) {
          state.error = action.payload;
        }
        state.isLoading = false;
      },
    );
  },
});

export default pauseSlice.reducer;

export const { deHydratePauseSlice } = pauseSlice.actions;
