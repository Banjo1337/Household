export type AuthenticationCredentials = {
  username: string;
  password: string;
};

export type SignInReply = {
  token: string;
  expiration: Date;
  authUserId: string;
  error: string;
  hasError: boolean;
  dataWrittenToSecureStoreCounter?: number;
};

export type SignUpReply = {
  status: string;
  message: string;
};
