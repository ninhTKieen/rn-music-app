export interface IAuthState {
  currentUser: any;
  isLoggedIn: boolean;

  isPendingLoggedIn: boolean;
  isPendingGetUser: boolean;
  isPendingRegister: boolean;
}

export interface IAuthResponse {
  accessToken: string;
  accessTokenExpirationDate: any;
}

export interface IAuthLoginPayload {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  dateOfBirth: string;
  email: string;
  fullName: string;
  gender: string;
  avatar: any;
  username: string;
}

export interface IUserRegister {
  dateOfBirth: string;
  email: string;
  fullName: string;
  gender: string;
  avatar: string;
  username: string;
}
