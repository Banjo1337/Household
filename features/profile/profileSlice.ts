import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { RootStateType } from "../../app/store";
import { Profile, ProfileCreateDto, ProfileEditDto, ProfileState } from "./profileTypes";
const baseUrl = "https://household-backend.azurewebsites.net/api/V01/profile/";

export const createProfile = createAsyncThunk<
  Profile,
  ProfileCreateDto,
  { rejectValue: string; state: RootStateType }
>("profile/CreateProfile", async (profileCreateDto: ProfileCreateDto, thunkApi) => {
  const token = thunkApi.getState().authenticateReducer.token;
  try {
    const response = await fetch(baseUrl + "createProfile", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + token,
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
});

export const editProfile = createAsyncThunk<
  { profile: Profile; isActiveProfile: boolean },
  { profileEditDto: ProfileEditDto; profileId: string; isActiveProfile?: boolean },
  { rejectValue: string; state: RootStateType }
>(
  "profile/EditProfile",
  async ({ profileEditDto, profileId, isActiveProfile = true }, thunkApi) => {
    const token = thunkApi.getState().authenticateReducer.token;
    try {
      const response = await fetch(baseUrl + "editProfile/" + profileId, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + token,
        },
        body: JSON.stringify(profileEditDto),
      });

      if (response.ok) {
        return {
          profile: (await response.json()) as Profile,
          isActiveProfile: isActiveProfile,
        };
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

export const deleteProfile = createAsyncThunk<
  { profileId: string; isActiveProfile: boolean },
  { profileId: string; isActiveProfile?: boolean },
  { rejectValue: string; state: RootStateType }
>("profile/deleteProfile", async ({ profileId, isActiveProfile = true }, thunkApi) => {
  const token = thunkApi.getState().authenticateReducer.token;
  try {
    const response = await fetch(baseUrl + "DeleteProfile/" + profileId, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + token,
      },
    });

    if (response.status == 204) {
      return { profileId: profileId, isActiveProfile: isActiveProfile };
    }

    return thunkApi.rejectWithValue(response.statusText);
  } catch (err) {
    if (err instanceof Error) {
      return thunkApi.rejectWithValue(err.message);
    } else {
      return thunkApi.rejectWithValue("");
    }
  }
});

const initialState: ProfileState = {
  profile: {} as Profile,
  isLoading: false,
  error: "",
};

export type EditProfilePayloadAction = {
  profile: Profile;
  isActiveProfile: boolean;
};

export type DeleteProfilePayloadAction = {
  profileId: string;
  isActiveProfile: boolean;
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setActiveProfile(state, action: PayloadAction<Profile>) {
      state.profile = action.payload;
    },
    resetActiveProfile(state) {
      state.profile = {} as Profile;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
    }),
      builder.addCase(
        editProfile.fulfilled,
        (state, action: PayloadAction<EditProfilePayloadAction>) => {
          if (action.payload.isActiveProfile) {
            state.profile = action.payload.profile;
          }
        },
      ),
      builder.addCase(
        deleteProfile.fulfilled,
        (state, action: PayloadAction<DeleteProfilePayloadAction>) => {
          if (action.payload.isActiveProfile) {
            state.profile = {} as Profile;
          }
        },
      ),
      builder.addMatcher(
        isAnyOf(createProfile.pending, editProfile.pending, deleteProfile.pending),
        (state) => {
          state.isLoading = true;
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
      ),
      builder.addMatcher(
        isAnyOf(createProfile.fulfilled, editProfile.fulfilled, deleteProfile.fulfilled),
        (state) => {
          state.isLoading = false;
        },
      );
  },
});

export default profileSlice.reducer;

export const { setActiveProfile, resetActiveProfile } = profileSlice.actions;
