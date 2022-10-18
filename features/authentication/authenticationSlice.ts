import { AnyAction, createAsyncThunk, createSlice, Reducer } from "@reduxjs/toolkit";
import { RootStateType } from "../../app/store";
import { AuthenticationCredentials, SignInReply } from "./authenticationTypes";
import * as SecureStore from "expo-secure-store";

const BASE_URL = "https://household-backend.azurewebsites.net/api/V01/Authenticate/";

export const postSignInThunk = createAsyncThunk<SignInReply, AuthenticationCredentials, { rejectValue: string }>("authentication/postLogin", async (credentials: AuthenticationCredentials, thunkApi) => {
  const response = await fetch(BASE_URL + `login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    const signInReply: SignInReply = await response.json();
    SecureStore.setItemAsync("token", signInReply.token);
    return signInReply;
  }
  return thunkApi.rejectWithValue(await response.json());
});

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {} as SignInReply,
  reducers: {
    logout: () => {
      SecureStore.setItemAsync("token", "");
      return {
        authUserId: "",
      } as SignInReply;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postSignInThunk.fulfilled, (state, action) => {
      console.log("postSignInThunk.fulfilled");
      state.authUserId = action.payload.authUserId;
      state.hasError = false;
    });
    builder.addCase(postSignInThunk.rejected, (state, action) => {
      console.log("postSignInThunk.rejected");
      console.log("action.error: " + action.error.message);
      console.log("error: " + action.payload);
      if (action.payload) {
        state.error = action.payload;
      }
      state.hasError = true;
    });
  },
});

export const { logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
export const selectAuthUserId = (state: RootStateType) => state.authenticateUserReducer.authUserId;
export const selectHasError = (state: RootStateType) => state.authenticateUserReducer.hasError;
export const selectErrorText = (state: RootStateType) => state.authenticateUserReducer.error;
export const authenticateUserReducer: Reducer<SignInReply, AnyAction> = authenticationSlice.reducer;
