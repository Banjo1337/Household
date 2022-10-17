import { AnyAction, createAsyncThunk, createSlice, PayloadAction, Reducer } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import { RootStateType } from "../../app/store";
import useSecureStorage from "../../hooks/useSecureStorage";
import { AuthenticationCredentials, SignInReply } from "./authenticationTypes";

const BASE_URL = "https://household-backend.azurewebsites.net/api/V01/Authenticate/";

/*const SetTokenInSecureStorage = (tokenIn: string) => {
  const [token, setToken] = useSecureStorage("token", "");
  setToken(tokenIn);
  console.log("token in secure storage: " + token);
};*/

export const postSignInThunk = createAsyncThunk("authentication/postLogin", async (credentials: AuthenticationCredentials, thunkApi) => {
  //const [token, setToken] = useSecureStorage("token", "");
  const response = await fetch(BASE_URL + `login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    console.log("response ok");
    const token: SignInReply = await response.json();
    console.log("token: " + token.token);
    //SetTokenInSecureStorage(token.token); //skall inte göras här, utan skall göras i extra reducer
    //setToken(token.token);
    //return thunkApi.fulfillWithValue(token);
    return token as SignInReply;
  }
  console.log("response not ok. SHOULD NOT SHOW");
  return thunkApi.rejectWithValue(await response.json());
});

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {} as SignInReply,
  reducers: {
    logout: () => {
      //clear the token in state
      return {
        token: "",
      } as SignInReply;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postSignInThunk.fulfilled, (state, action) => {
      console.log("postSignInThunk.fulfilled");
      state.authUserId = action.payload.authUserId;
      state.token = action.payload.token;
      //SetTokenInSecureStorage(action.payload.token);
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
export const selectToken = (state: RootStateType) => state.authenticateUserReducer.token;
export const authenticateUserReducer: Reducer<SignInReply, AnyAction> = authenticationSlice.reducer;

/*export interface AuthenticationState {
  token: string;
  authUserId: string;
}

const initialState: AuthenticationState = {
  token: "", //är alltid tom sträng. Rad endast med för korrekt typning (o intellisence?). Token sparas alltid i secure storage.
  authUserId: "",
  error: "",
  hasError: false,
};*/
