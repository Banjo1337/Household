import {
	AnyAction,
	createAsyncThunk,
	createSlice,
	isAnyOf,
	isRejectedWithValue,
	PayloadAction,
	Reducer,
} from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { Profile } from "../profile/profileTypes";
import { Household, HouseholdCreateDto, HouseholdEditDto } from "./householdTypes";

const baseUrl = "https://household-backend.azurewebsites.net/api/V01/household/";


//Behöver se över hur man hämtar token
//const [token] = useSecureStorage("token", "");
async function getToken(): Promise<string> {
	const token = await SecureStore.getItemAsync("token");
	if (token) {
		return JSON.parse(token).token;
	} else {
		return "";
	}
}
const token = getToken();

//---------------------------

export const getHouseholdThunk = createAsyncThunk<Household, string, { rejectValue: string }>(
	"household/getHousehold",
	async (householdId: string, thunkApi) => {
    const response = await fetch(baseUrl + "getHousehold/" + householdId);
		if (response.ok) {
      const household = await response.json();
      
			const dispatch = useAppDispatch();
			dispatch(getProfilesByHouseholdId(household.id));
      
      console.log(household);
			return household as Household;
		} else {
			return thunkApi.rejectWithValue(JSON.stringify(response.body));
		}
	}
);

export const createHouseholdThunk = createAsyncThunk<
	Household,
	HouseholdCreateDto,
	{ rejectValue: string }
>("household/CreateHousehold", async (householdCreateDto: HouseholdCreateDto, thunkApi) => {
	const response = await fetch(baseUrl + "createHousehold", {
		method: "POST",
		headers: {
			"content-type": "application/json",
			authorization: "Bearer " + token,
		},
		body: JSON.stringify(householdCreateDto),
	});

	if (response.ok) {
		return (await response.json()) as Household;
	}

	return thunkApi.rejectWithValue(JSON.stringify(response.body));
});

export const editHouseholdThunk = createAsyncThunk<
	Household,
	HouseholdEditDto,
	{ extra: { householdId: string }; rejectValue: string }
>("household/EditHousehold", async (householdEditDto: HouseholdEditDto, thunkApi) => {
	const response = await fetch(baseUrl + "editHousehold/" + thunkApi.extra.householdId, {
		method: "PATCH",
		headers: {
			"content-type": "application/json",
			authorization: "Bearer " + token,
		},
		body: JSON.stringify(householdEditDto),
	});

	if (response.ok) {
		return (await response.json()) as Household;
	}

	return thunkApi.rejectWithValue(JSON.stringify(response.body));
});

export const deleteHouseholdThunk = createAsyncThunk<Household, string, { rejectValue: string }>(
	"household/deleteHousehold",
	async (householdId: string, thunkApi) => {
		const response = await fetch(baseUrl + "deleteHousehold/" + householdId, {
			method: "DELETE",
			headers: {
				"content-type": "application/json",
				authorization: "Bearer " + token,
			},
		});

		if (response.status == 204) {
			return {} as Household;
		}

		return thunkApi.rejectWithValue(JSON.stringify(response.body));
	}
);

export const getProfilesByHouseholdId = createAsyncThunk<
	Profile[],
	string,
	{ rejectValue: string }
>("household/getProfilesByHouseholdId", async (householdId: string, thunkApi) => {
	try {
    console.log("inne i getprofilesbyhouseholdid");
		const response = await fetch("https://household-backend.azurewebsites.net/api/V01/profile/GetByHouseholdId/" + householdId);
		if (response.ok) {
			return await response.json();
		} else {
			return isRejectedWithValue(response.status);
		}
	} catch (err) {
		if (err instanceof Error) {
			return thunkApi.rejectWithValue(err.message);
		}
	}

	return thunkApi.rejectWithValue("Unknown error in getProfilesByHouseholdId");
});

interface HouseholdState {
	error: string;
	isLoading: boolean;
	profiles: Profile[];
	household: Household;
}

const initialState: HouseholdState = {
	household: {} as Household,
	error: "",
	isLoading: false,
	profiles: [],
};

const householdSlice = createSlice({
	name: "household",
	initialState,
	reducers: {
		createHousehold(_, action: PayloadAction<HouseholdCreateDto>) {
			createHouseholdThunk(action.payload);
		},
		editHousehold(_, action: PayloadAction<HouseholdEditDto>) {
			editHouseholdThunk(action.payload);
		},
		deleteHousehold(_, action: PayloadAction<Household>) {
			deleteHouseholdThunk(action.payload.id);
		},
	},
	extraReducers: (builder) => {
    builder.addCase(getHouseholdThunk.fulfilled, (state, action) => {
      state.household = action.payload;
      state.isLoading = false;
    }),
    builder.addCase(createHouseholdThunk.fulfilled, (state, action) => {
      state.household.name = action.payload.name;
    }),
    builder.addCase(editHouseholdThunk.fulfilled, (state, action) => {
      state.household.name = action.payload.name;
    }),
    builder.addCase(deleteHouseholdThunk.fulfilled, (state, action) => {
      state.household.id = action.payload.id;
    }),
    builder.addMatcher(
      isAnyOf(
        editHouseholdThunk.pending,
        deleteHouseholdThunk.pending,
        createHouseholdThunk.pending,
        editHouseholdThunk.pending,
        getHouseholdThunk.pending
      ),
      (state, _) => {
        state.isLoading = true;
      }
    ),
      builder.addMatcher(
        isAnyOf(
          editHouseholdThunk.rejected,
          deleteHouseholdThunk.rejected,
          createHouseholdThunk.rejected,
          editHouseholdThunk.rejected,
          getHouseholdThunk.rejected
        ),
        (state, action) => {
          if (action.payload) {
            state.error = action.payload;
          }
          state.isLoading = false;
        }
      );
	}
});

export const { editHousehold, createHousehold, deleteHousehold } = householdSlice.actions;
export const householdReducer: Reducer<HouseholdState, AnyAction> = householdSlice.reducer;
