import { call, put, takeLatest, all } from 'redux-saga/effects';

import { authActions } from './auth.slice';
import authApi from './auth.api';
import { PayloadAction } from '@reduxjs/toolkit';
import { IUser, IUserRegister } from 'src/interfaces/Auth';
import { showToastSuccess, showToastError } from 'src/utils/toast';

function* handleLogin(
  action: PayloadAction<{ email: string; password: string }>,
) {
  try {
    yield call(authApi.login, action.payload.email, action.payload.password);
    yield put({ type: authActions.loginSuccess.type });
    showToastSuccess('Login success', 'Welcome to my app 👋');
  } catch (error) {
    yield put({ type: authActions.loginFailure.type });
    showToastError('Login failure', 'Wrong account or password!');
  }
}

function* handleGetUserInfo(action: PayloadAction<{ id: string }>) {
  try {
    const response: IUser = yield call(
      authApi.getCurrentUser,
      action.payload.id,
    );
    // console.log(response);
    yield put({
      type: authActions.getCurrentUserSuccess.type,
      payload: response,
    });
  } catch (error) {
    console.log('Get user error', error);
  }
}

function* handleUpdateUserInfo(
  action: PayloadAction<{ id: string; data: any }>,
) {
  try {
    const response: IUser = yield call(
      authApi.updateUserInformation,
      action.payload.id,
      action.payload.data,
    );
    yield put({ type: authActions.updateUserSuccess.type, payload: response });
    showToastSuccess('Success', 'Update user info success');
  } catch (error) {
    yield put({ type: authActions.updateUserFailure.type });
    showToastError('Error', 'Update user info failure');
  }
}

function* handleRegister(
  action: PayloadAction<{ data: IUserRegister; password: string }>,
) {
  try {
    const response: { id: string | undefined } = yield call(
      authApi.register,
      action.payload.data.email,
      action.payload.password,
    );
    console.log(response);
    yield call(
      authApi.addNewUsersToDatabase,
      response.id as string,
      action.payload.data,
    );
    yield put({
      type: authActions.registerSuccess.type,
      payload: action.payload.data,
    });
    showToastSuccess('Register success', 'Welcome to my app 👋');
  } catch (error) {
    yield put({ type: authActions.registerFailure.type });
    showToastError('Register failure', 'Account has been used by other user!');
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(authActions.login.type, handleLogin),
    takeLatest(authActions.getCurrentUser.type, handleGetUserInfo),
    takeLatest(authActions.updateUser.type, handleUpdateUserInfo),
    takeLatest(authActions.register.type, handleRegister),
  ]);
}
