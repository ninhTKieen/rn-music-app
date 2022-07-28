import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAuthState } from 'src/interfaces/Auth';

const initialState: IAuthState = {
  currentUser: null,
  isLoggedIn: false,

  isPendingLoggedIn: false,
  isPendingGetUser: false,
  isPendingRegister: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, _action: PayloadAction<{ email: string; password: string }>) {
      state.isPendingLoggedIn = true;
    },

    loginSuccess(state, _action: PayloadAction<any>) {
      state.isLoggedIn = true;
      state.isPendingLoggedIn = false;
    },

    loginFailure(state) {
      state.isLoggedIn = false;
      state.isPendingLoggedIn = false;
    },

    logout(state) {
      state.isLoggedIn = false;
    },

    getCurrentUser(state, _action: PayloadAction<any>) {
      state.isPendingGetUser = true;
    },

    getCurrentUserSuccess(state, action: PayloadAction<any>) {
      state.isPendingGetUser = false;
      state.currentUser = action.payload;
    },

    getCurrentUserFailure(state, _action) {
      state.isPendingGetUser = false;
      state.currentUser = null;
    },

    updateUser(state, _action: PayloadAction<any>) {
      state.isPendingGetUser = true;
    },

    updateUserSuccess(state, action: PayloadAction<any>) {
      state.isPendingGetUser = false;
      state.currentUser = action.payload;
    },

    updateUserFailure(state, _action) {
      state.isPendingGetUser = false;
      state.currentUser = null;
    },

    register(state, _action) {
      state.isPendingRegister = true;
    },

    registerSuccess(state, action: PayloadAction<any>) {
      state.isPendingRegister = false;
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },

    registerFailure(state, _action) {
      state.isPendingRegister = false;
      state.currentUser = null;
    },
  },
});

export const authActions = authSlice.actions;

export const selectedIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectedIsPendingLoggedIn = (state: any) =>
  state.auth.isPendingLoggedIn;
export const selectedCurrentUser = (state: any) => state.auth.currentUser;
export const selectedInPendingRegister = (state: any) =>
  state.auth.isPendingRegister;

export default authSlice.reducer;
