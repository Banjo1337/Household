import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { Chore, ChoreState, ChoreCreateDto, ChoreUpdateDto } from "./choreTypes";

const baseUrl = "https://household-backend.azurewebsites.net/api/V01/chore/";
import * as SecureStore from "expo-secure-store";

async function getToken(): Promise<string> {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    return JSON.parse(token).token;
  } else {
    return "";
  }
}

export const createChore = createAsyncThunk<Chore, ChoreCreateDto, { rejectValue: string }>("chore/CreateChore", async (choreCreateDto: ChoreCreateDto, thunkApi) => {
  const token = await getToken();
  if (!token) {
    return thunkApi.rejectWithValue("User not logged in");
  }
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

export const updateChore = createAsyncThunk<Chore, { choreUpdateDto: ChoreUpdateDto; choreId: string }, { rejectValue: string }>("chore/UpdateChore", async ({ choreUpdateDto, choreId }, thunkApi) => {
  const token = await getToken();
  if (!token) {
    return thunkApi.rejectWithValue("User not logged in");
  }
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

export const deleteChore = createAsyncThunk<Chore, string, { rejectValue: string }>("chore/deleteChore", async (choreId: string, thunkApi) => {
  const token = await getToken();
  if (!token) {
    return thunkApi.rejectWithValue("User not logged in");
  }
  try {
    const response = await fetch(baseUrl + "DeleteChore/" + choreId, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + token,
      },
    });

    if (response.status == 204) {
      return {} as Chore;
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
  chores: {} as Chore[],
  isLoading: false,
  error: "",
};

const choreSlice = createSlice({
  name: "chore",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(createChore.pending, updateChore.pending, deleteChore.pending), (state) => {
      state.isLoading = true;
      state.error = "";
    });

    builder.addCase(createChore.fulfilled, (state, action: PayloadAction<Chore>) => {
      state.isLoading = false;
      state.chores.push(action.payload);
    });
    builder.addCase(updateChore.fulfilled, (state, action: PayloadAction<Chore>) => {
      state.isLoading = false;
      state.chores = state.chores.map((chore) => (chore.id == action.payload.id ? action.payload : chore));
    });
    builder.addCase(deleteChore.fulfilled, (state, action: PayloadAction<Chore>) => {
      state.isLoading = false;
      state.chores = state.chores.filter((chore) => chore.id != action.payload.id);
    });

    builder.addMatcher(isAnyOf(createChore.rejected, createChore.rejected, createChore.rejected), (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        console.log(action.payload);
      }
      state.isLoading = false;
    });
  },
});

export default choreSlice.reducer;
