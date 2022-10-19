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
    SecureStore.setItemAsync("authUserId", signInReply.authUserId);
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
      SecureStore.setItemAsync("authUserId", "");
      return {
        authUserId: "",
      } as SignInReply;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postSignInThunk.fulfilled, (state) => {
      console.log("postSignInThunk.fulfilled");
      if (state.dataWrittenToSecureStoreCounter === undefined) {
        state.dataWrittenToSecureStoreCounter = 0;
      } else {
        state.dataWrittenToSecureStoreCounter++;
      }
      state.hasError = false;
    });
    builder.addCase(postSignInThunk.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
      }
      state.hasError = true;
    });
  },
});

export const { logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
export const selectHasError = (state: RootStateType) => state.authenticateUserReducer.hasError;
export const selectErrorText = (state: RootStateType) => state.authenticateUserReducer.error;
export const selectDataWrittenToSecureStoreCounter = (state: RootStateType) => state.authenticateUserReducer.dataWrittenToSecureStoreCounter;
export const authenticateUserReducer: Reducer<SignInReply, AnyAction> = authenticationSlice.reducer;
