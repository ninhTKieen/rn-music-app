import { configureStore } from '@reduxjs/toolkit';

import createSagaMiddleware from 'redux-saga';

import rootSaga from 'src/features/rootSaga';
import authReducer from 'src/features/auth/auth.slice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
