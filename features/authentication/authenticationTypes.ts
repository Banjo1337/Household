export type AuthenticationCredentials = {
  username: string;
  password: string;
};

export type Token = {
  authUserId: string;
  token: string;
  expiration: Date;
  //Format from backend is 2022-09-14T00:35:18Z
};

export type SignUpReply = {
  status: string;
  message: string;
};
