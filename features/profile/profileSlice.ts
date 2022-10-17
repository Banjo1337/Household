import { createAsyncThunk, createSlice, isRejectedWithValue, PayloadAction } from "@reduxjs/toolkit";
import { Profile, ProfileCreateDto, ProfileEditDto } from "./profileTypes";
const baseUrl = "https://household-backend.azurewebsites.net/api/V01/profile/"
import useSecureStorage from "../../hooks/useSecureStorage";

const [token] = useSecureStorage("token", "");

// export const getProfilesByUserId = createAsyncThunk(
//     "profile/getProfilesByUserId",

//     async (userId: string) => {
//         const response = await fetch(baseUrl + "getByUserId/" + userId)

//         if(response.ok) {
//             return (await response.json()) as Profile
//         } else {
//             return isRejectedWithValue(response.body)
//         }
//     }
// )

export const createProfileThunk = createAsyncThunk<Profile, ProfileCreateDto, { rejectValue: string }>(
    "profile/CreateProfile",
    async (profileCreateDto: ProfileCreateDto, thunkApi) => {
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

export const editProfileThunk = createAsyncThunk<Profile, ProfileEditDto, { extra: { profileId: string }, rejectValue: string }>(
    "profile/EditProfile",
    async (profileEditDto: ProfileEditDto, thunkApi) => {
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

export const deleteProfileThunk = createAsyncThunk<Profile, string, { rejectValue: string}>(
    "profile/deleteProfile",
    async (profileId: string, thunkApi) => {
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

export default profileSlice.reducer;

export const { setActiveProfile } = profileSlice.actions;