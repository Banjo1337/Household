import { createAsyncThunk, createSlice, isAnyOf, isRejectedWithValue, PayloadAction } from "@reduxjs/toolkit";
import { Profile, ProfileCreateDto, ProfileEditDto, ProfileState } from "./profileTypes";
const baseUrl = "https://household-backend.azurewebsites.net/api/V01/profile/"
import useSecureStorage from "../../hooks/useSecureStorage";



export const createProfile = createAsyncThunk<Profile, ProfileCreateDto, { rejectValue: string }>(
    "profile/CreateProfile",
    async (profileCreateDto: ProfileCreateDto, thunkApi) => {
        const [token] = useSecureStorage("token", "");
        const response = await fetch(baseUrl + "createProfile", {
            method: "POST",
            headers: {
            "content-type": "application/json",
            authorization: "Bearer " + token,
          },
          body: JSON.stringify(profileCreateDto),
        })

        if(response.ok) {
            return (await response.json()) as Profile
        }        
        
        return thunkApi.rejectWithValue(JSON.stringify(response.body));
        
    }
)

export const editProfile = createAsyncThunk<Profile, ProfileEditDto, { extra: { profileId: string }, rejectValue: string }>(
    "profile/EditProfile",
    async (profileEditDto: ProfileEditDto, thunkApi) => {
        const [token] = useSecureStorage("token", "");
        const response = await fetch(baseUrl + "editProfile/" + thunkApi.extra.profileId, {
            method: "PATCH",
            headers: {
                "content-type" : "application/json",
                authorization: "Bearer " + token                
            },
            body: JSON.stringify(profileEditDto),
        })

        if(response.ok) {
            return (await response.json()) as Profile
        }        
        
        return thunkApi.rejectWithValue(JSON.stringify(response.body));
        
    }
)

export const deleteProfile = createAsyncThunk<Profile, string, { rejectValue: string}>(
    "profile/deleteProfile",
    async (profileId: string, thunkApi) => {
            const [token] = useSecureStorage("token", "");
            const response = await fetch(baseUrl + "deleteProfile/" + profileId, {
            method: "DELETE",
            headers: {
                "content-type" : "application/json",
                authorization: "Bearer " + token                
            },
        })

        if(response.status == 204) {
            return {} as Profile
        }

        return thunkApi.rejectWithValue(JSON.stringify(response.body));
    }
)

const initialState: ProfileState = {
    profile: {} as Profile,
    hasError: false,
    error: ""
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setActiveProfile(state, action: PayloadAction<Profile>) {
            state.profile = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addMatcher(isAnyOf ( createProfile.fulfilled, editProfile.fulfilled, deleteProfile.fulfilled ), (state, action) => {
            state.profile = action.payload;
            state.hasError = false;
        }),
        builder.addMatcher(isAnyOf ( createProfile.rejected, editProfile.rejected, deleteProfile.rejected ), (state, action) => {
            if(action.payload)
                state.error = action.payload;
            state.hasError = true;
        })
    }

    
})

export default profileSlice.reducer;

export const { setActiveProfile } = profileSlice.actions;
