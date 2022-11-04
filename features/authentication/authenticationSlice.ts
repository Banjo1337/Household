import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  isAnyOf,
  PayloadAction,
  Reducer,
} from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import { AuthenticationCredentials, AuthenticationState, SignInReply } from "./authenticationTypes";

const BASE_URL = "https://household-backend.azurewebsites.net/api/V01/Authenticate/";

export const postSignInThunk = createAsyncThunk<
  AuthenticationState,
  AuthenticationCredentials,
  { rejectValue: string }
>("authentication/postLogin", async (credentials: AuthenticationCredentials, thunkApi) => {
  try {
    const response = await fetch(BASE_URL + `login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (response.ok) {
      const signInReply: SignInReply = await response.json();
      await SecureStore.setItemAsync("token", signInReply.token);
      await SecureStore.setItemAsync("authUserId", signInReply.authUserId);
      return signInReply as AuthenticationState;
    }
    return thunkApi.rejectWithValue(await response.json());
  } catch (err) {
    if (err instanceof Error) {
      return thunkApi.rejectWithValue(err.message);
    } else {
      return thunkApi.rejectWithValue("");
    }
  }
});

export const hydrateAuthenticationSliceFromSecureStorageThunk = createAsyncThunk<
  AuthenticationState,
  void,
  { rejectValue: string }
>("authentication/hydrateFromSecureStorage", async (_, thunkApi) => {
  try {
    const token = await SecureStore.getItemAsync("token");
    const authUserId = await SecureStore.getItemAsync("authUserId");
    if (token && authUserId) {
      return {
        token,
        authUserId,
        error: "",
        hasError: false,
      } as AuthenticationState;
    }
    return thunkApi.rejectWithValue("No token or authUserId in secure storage");
  } catch (err) {
    if (err instanceof Error) {
      return thunkApi.rejectWithValue(err.message);
    } else {
      return thunkApi.rejectWithValue("");
    }
  }
});

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {} as AuthenticationState,
  reducers: {
    logout: () => {
      return {} as AuthenticationState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      postSignInThunk.fulfilled,
      (state, action: PayloadAction<AuthenticationState>) => {
        console.log("postSignInThunk.fulfilled");
        return {
          ...state,
          ...action.payload,
          hasError: false,
          error: "",
        };
      },
    );
    builder.addCase(hydrateAuthenticationSliceFromSecureStorageThunk.fulfilled, (state, action) => {
      console.log("hydrateAuthenticationSliceFromSecureStorageThunk.fulfilled");
      return {
        ...state,
        ...action.payload,
        hasError: false,
        error: "",
      };
    });

    builder.addMatcher(
      isAnyOf(postSignInThunk.rejected, hydrateAuthenticationSliceFromSecureStorageThunk.rejected),
      (state, action) => {
        console.log(action.payload);
        return {
          ...state,
          hasError: true,
          error: action.payload as string,
        };
      },
    );
  },
});

export const { logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;

export const authenticateReducer: Reducer<AuthenticationState, AnyAction> =
  authenticationSlice.reducer;
