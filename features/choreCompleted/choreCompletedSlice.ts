import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";

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
	void,
	ChoreCompletedCreateDto,
	{ rejectValue: string }
>("choreCompleted/addChoreCompleted", async (choreCompleted: ChoreCompletedCreateDto, thunkApi) => {
	try {
		await fetch(baseUrl, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(choreCompleted),
		});
	} catch (err) {
		if (err instanceof Error) {
			thunkApi.rejectWithValue(err.message);
		}
	}
});

export const getAllChoreCompleted = createAsyncThunk<
	ChoreCompleted[],
	string,
	{ rejectValue: string }
>("choreCompleted/getAllChores", async (householdId: string, thunkApi) => {
	try {
		const response = await fetch(baseUrl + "GetAllChoreCompleted/" + householdId);

		if (response.ok) {
			return await response.json();
		} else {
			return thunkApi.rejectWithValue("something went wrong when fetching choreCompleted");
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
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(addChoreCompleted.fulfilled, (state, _) => {
			state.isLoading = false;
		}),
			builder.addCase(getAllChoreCompleted.fulfilled, (state, action) => {
				state.completedChores = action.payload;
				state.isLoading = false;
			}),
			builder.addMatcher(
				isAnyOf(addChoreCompleted.pending, getAllChoreCompleted.pending),
				(state) => {
					state.isLoading = true;
				}
			),
			builder.addMatcher(
				isAnyOf(addChoreCompleted.rejected, getAllChoreCompleted.rejected),
				(state, action) => {
					if (action.payload) {
						state.error = action.payload;
					}
					state.isLoading = false;
				}
			);
	},
});

export default choreCompletedSlice.reducer;
