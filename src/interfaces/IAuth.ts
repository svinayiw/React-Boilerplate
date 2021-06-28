export interface ILogin {
  _id: string;
  token: string;
  refreshToken: string;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface ILoggedInUser {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IToken {
  token: string;
}

export interface IAuthUser {
  _id: string | null;
  role: string | null;
}

export interface IAuth {
  token: string | null;
  user: IAuthUser;
  isLoggedIn: boolean;
}
