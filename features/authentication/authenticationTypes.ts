export type AuthenticationCredentials = {
  username: string;
  password: string;
};

export type SignInReply = {
  token: string;
  expiration: Date; //not used right now. Token is set to be valid for 21 days in backend
  authUserId: string; //connection to AuthUserId (FK i Profile)
  error: unknown;
  hasError: boolean;
};

export type SignUpReply = {
  status: string;
  message: string;
};
