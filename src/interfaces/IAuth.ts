export interface ILoginResponse {
  message: string;
  data: {
    _id: string;
    token: string;
    refreshToken: string;
    role: string;
  };
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
  createdAt: string;
  updatedAt: string;
}

export interface IToken {
  token: string;
}

export interface IAuthState {
  loading: boolean;
  error: any;
  isLoggedIn: boolean;
  loggedInUser: ILoggedInUser | null;
  pingMeLoading: boolean;
  infoUpdateLoading: boolean;
}

interface password {
  password: string;
  confirm_passwor: string;
}

export interface IPasswordReset {
  token: string;
  data: password;
}
