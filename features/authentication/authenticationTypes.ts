export type AuthenticationCredentials = {
  username: string;
  password: string;
};

export type AuthenticationState = {
  token: string;
  expiration: Date;
  authUserId: string;
  error: string;
  hasError: boolean;
};

export type SignInReply = {
  token: string;
  expiration: Date;
  authUserId: string;
};

export type SignUpReply = {
  status: string;
  message: string;
};
