export interface IAuthState {
  currentUser: any;
  isLoggedIn: boolean;

  isPendingLoggedIn: boolean;
  isPendingGetUser: boolean;
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
  age: number;
  dateOfBirth: string;
  email: string;
  fullName: string;
  gender: string;
  avatar: any;
  name: string;
}
