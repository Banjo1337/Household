import {
  AnyAction
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
  PayloadAction,
} from "@reduxjs/toolkit";

import { Household, HouseholdCreateDto, HouseholdEditDto } from "./householdTypes";

const baseUrl = "https://household-backend.azurewebsites.net/api/V01/household/";
import useSecureStorage from "../../hooks/useSecureStorage";

const [token] = useSecureStorage("token", "");

 export const getHouseholdThunk = createAsyncThunk(
    "household/getHousehold",
   async (householdId: string ) => {
        const response = await fetch(baseUrl + "getHousehold/" + householdId)
         if(response.ok) {
            return (await response.json()) as Household
        } else {
            return isRejectedWithValue(response.body)
        }
    }
)

export const createHouseholdThunk = createAsyncThunk<
  Household,
  HouseholdCreateDto,
  { rejectValue: string }
>(
  "household/CreateHousehold",
  async (householdCreateDto: HouseholdCreateDto, thunkApi) => {
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
  }
);

export const editHouseholdThunk = createAsyncThunk<
  Household,
  HouseholdEditDto,
  { extra: { householdId: string }; rejectValue: string }
>("household/EditHousehold", async (householdEditDto: HouseholdEditDto, thunkApi) => {
  const response = await fetch(
    baseUrl + "editHousehold/" + thunkApi.extra.householdId,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify(householdEditDto),
    }
  );

  if (response.ok) {
    return (await response.json()) as Household;
  }

  return thunkApi.rejectWithValue(JSON.stringify(response.body));
});

export const deleteHouseholdThunk = createAsyncThunk<
  Household,
  string,
  { rejectValue: string }
>("household/deleteHousehold", async (householdId: string, thunkApi) => {
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
});




interface HouseholdState {
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





const profileSlice = createSlice({
    name: "profile",
    initialState: {} as Profile,
    reducers: {
        setActiveProfile(state, action: PayloadAction<Profile>) {
            state = action.payload;
        },
        createNewProfile(_, action: PayloadAction<ProfileCreateDto>) {
            createProfileThunk(action.payload);
        },
        editProfile(_, action: PayloadAction<ProfileEditDto>) { 
            editProfileThunk(action.payload);
        }
    },
    extraReducers: builder => {
        builder.addCase(createProfileThunk.fulfilled, (state, action) => {
            state = action.payload;
            state.hasError = false
        }),
        builder.addCase(createProfileThunk.rejected, (state, action) => {
            if(action.payload)
                state.error = action.payload;
            state.hasError = true
        }),
        builder.addCase(editProfileThunk.fulfilled, (state, action) => {
            state = action.payload
            state.hasError = false
        }),
        builder.addCase(editProfileThunk.rejected, (state, action) => {
            if(action.payload)
                state.error = action.payload
            state.hasError = true;
        })
        builder.addCase(deleteProfileThunk.fulfilled, (state, action) => {
            state = action.payload
            state.hasError = false
        }),
        builder.addCase(deleteProfileThunk.rejected, (state, action) => {
            if(action.payload)
                state.error = action.payload
            state.hasError = true;
        })
    },

    
})
