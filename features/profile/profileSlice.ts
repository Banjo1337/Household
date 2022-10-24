import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { Profile, ProfileCreateDto, ProfileEditDto, ProfileState } from "./profileTypes";
import * as SecureStore from "expo-secure-store";
const baseUrl = "https://household-backend.azurewebsites.net/api/V01/profile/";
import { hydrateHouseholdThunk } from "../household/householdSlice";

async function getToken(): Promise<string> {
	const token = await SecureStore.getItemAsync("token");
	if (token) {
		return JSON.parse(token).token;
	} else {
		return "";
	}
}

export const createProfile = createAsyncThunk<Profile, ProfileCreateDto, { rejectValue: string }>(
	"profile/CreateProfile",
	async (profileCreateDto: ProfileCreateDto, thunkApi) => {
		const token = await getToken();
		if (!token) {
			return thunkApi.rejectWithValue("User not logged in");
		}
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
	}
);

export const editProfile = createAsyncThunk<
	Profile,
	ProfileEditDto,
	{ extra: { profileId: string }; rejectValue: string }
>("profile/EditProfile", async (profileEditDto: ProfileEditDto, thunkApi) => {
	const token = await getToken();
	if (!token) {
		return thunkApi.rejectWithValue("User not logged in");
	}
	try {
		const response = await fetch(baseUrl + "editProfile/" + thunkApi.extra.profileId, {
			method: "PATCH",
			headers: {
				"content-type": "application/json",
				authorization: "Bearer " + token,
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

export const deleteProfile = createAsyncThunk<Profile, string, { rejectValue: string }>(
	"profile/deleteProfile",
	async (profileId: string, thunkApi) => {
		const token = await getToken();
		if (!token) {
			return thunkApi.rejectWithValue("User not logged in");
		}
		try {
			const response = await fetch(baseUrl + "deleteProfile/" + profileId, {
				method: "DELETE",
				headers: {
					"content-type": "application/json",
					authorization: "Bearer " + token,
				},
			});

			if (response.status == 204) {
				return {} as Profile;
			}

			return thunkApi.rejectWithValue(JSON.stringify(response.body));
		} catch (err) {
			if (err instanceof Error) {
				return thunkApi.rejectWithValue(err.message);
			} else {
				return thunkApi.rejectWithValue("");
			}
		}
	}
);

// export const setActiveProfile = createAsyncThunk<Profile, Profile, { rejectValue: string}>(
// 	"profile/setActiveProfile",
// 	async(profile: Profile, thunkApi) => {
// 		try {
// 			thunkApi.dispatch(hydrateHouseholdThunk(profile.householdId));
// 		} catch(err) {
// 			if (err instanceof Error) {
// 				return thunkApi.rejectWithValue(err.message);
// 			} else {
// 				return thunkApi.rejectWithValue("");
// 			}
// 		}
// 		return profile;
// 	}
// )

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
		builder.addMatcher(
			isAnyOf(createProfile.pending, editProfile.pending, deleteProfile.pending),
			(state) => {
				state.isLoading = true;
			}
		),
			builder.addMatcher(
				isAnyOf(createProfile.fulfilled, editProfile.fulfilled, deleteProfile.fulfilled),
				(state, action) => {
					state.profile = action.payload;
					state.isLoading = false;
				}
			),
			builder.addMatcher(
				isAnyOf(createProfile.rejected, editProfile.rejected, deleteProfile.rejected),
				(state, action) => {
					if (action.payload) {
						state.error = action.payload;
						console.log(action.payload);
					}
					state.isLoading = false;
				}
			);
	},
});

export default profileSlice.reducer;

export const { setActiveProfile } = profileSlice.actions;
