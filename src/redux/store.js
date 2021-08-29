import { configureStore } from '@reduxjs/toolkit';
import { contactApi } from 'redux/contactApiService';
import { authApi } from './authServise';
import { filter, token, isOpenModal, isLoggetIn } from 'redux/reducers';
import { combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
  key: 'authData',
  storage,
  whitelist: ['token', 'isLoggetIn'],
};

const rootReducer = combineReducers({
  isLoggetIn,
  isOpenModal,
  filter,
  token,
  [contactApi.reducerPath]: contactApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

const persistedReducer = persistReducer(authPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(contactApi.middleware)
      .concat(authApi.middleware),
});

const persistor = persistStore(store);
export { store, persistor };
