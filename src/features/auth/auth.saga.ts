import { call, put, takeLatest, all } from 'redux-saga/effects';

import { authActions } from './auth.slice';
import authApi from './auth.api';
import { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'src/interfaces/Auth';
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
    console.log(response);
    yield put({
      type: authActions.getCurrentUserSuccess.type,
      payload: response,
    });
  } catch (error) {
    console.log('Get user error', error);
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(authActions.login.type, handleLogin),
    takeLatest(authActions.getCurrentUser.type, handleGetUserInfo),
  ]);
}
