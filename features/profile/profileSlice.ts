import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../../hooks/reduxHooks";
import { selectToken } from "../authentication/authenticationSelectors";
import { Profile, ProfileCreateDto, ProfileEditDto, ProfileState } from "./profileTypes";
const baseUrl = "https://household-backend.azurewebsites.net/api/V01/profile/";

const Token = () => useAppSelector(selectToken);

export const createProfile = createAsyncThunk<Profile, ProfileCreateDto, { rejectValue: string }>(
  "profile/CreateProfile",
  async (profileCreateDto: ProfileCreateDto, thunkApi) => {
    try {
      const response = await fetch(baseUrl + "createProfile", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(profileCreateDto),
      });

      if (response.ok) {
        return (await response.json()) as Profile;
      }

      return thunkApi.rejectWithValue(JSON.stringify(response.body));
    } catch (err) {
      if (err instanceof Error) {
        return thunkApi.rejectWithValue(err.message);
      } else {
        return thunkApi.rejectWithValue("");
      }
    }
  },
);

export const editProfile = createAsyncThunk<
  Profile,
  { profileEditDto: ProfileEditDto; profileId: string },
  { rejectValue: string }
>("profile/EditProfile", async ({ profileEditDto, profileId }, thunkApi) => {
  try {
    const response = await fetch(baseUrl + "editProfile/" + profileId, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(profileEditDto),
    });

    if (response.ok) {
      return (await response.json()) as Profile;
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

export const deleteProfile = createAsyncThunk<string, string, { rejectValue: string }>(
  "profile/deleteProfile",
  async (profileId: string, thunkApi) => {
    // if (!Token()) {
    //   return thunkApi.rejectWithValue("User not logged in");
    // }
    try {
      const response = await fetch(baseUrl + "DeleteProfile/" + profileId, {
        method: "DELETE",
        headers: {
          // authorization: "Bearer " + Token(),
        },
      });

      if (response.status == 204) {
        return profileId;
      }

      return thunkApi.rejectWithValue(JSON.stringify(response.body));
    } catch (err) {
      if (err instanceof Error) {
        return thunkApi.rejectWithValue(err.message);
      } else {
        return thunkApi.rejectWithValue("");
      }
    }
  },
);

const initialState: ProfileState = {
  profile: {} as Profile,
  isLoading: false,
  error: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setActiveProfile(state, action: PayloadAction<Profile>) {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteProfile.fulfilled, (state) => {
      state.profile = {} as Profile;
      state.isLoading = false;
    }),
      builder.addCase(createProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.profile = action.payload;
      }),
      builder.addMatcher(
        isAnyOf(createProfile.pending, editProfile.pending, deleteProfile.pending),
        (state) => {
          state.isLoading = true;
        },
      ),
      builder.addMatcher(
        isAnyOf(createProfile.fulfilled, editProfile.fulfilled),
        (state, action) => {
          state.profile = action.payload;
          state.isLoading = false;
        },
      ),
      builder.addMatcher(
        isAnyOf(createProfile.rejected, editProfile.rejected, deleteProfile.rejected),
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

export default profileSlice.reducer;

export const { setActiveProfile } = profileSlice.actions;
