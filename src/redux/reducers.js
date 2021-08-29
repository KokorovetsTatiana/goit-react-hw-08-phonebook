import { changeFilter, setToken, isOpen, isLogin } from 'redux/actions';
import { createReducer } from '@reduxjs/toolkit';

export const filter = createReducer('', {
  [changeFilter]: (_, action) => action.payload,
});

export const token = createReducer('', {
  [setToken]: (_, action) => action.payload,
});

export const isOpenModal = createReducer(false, {
  [isOpen]: (state, _) => !state,
});

export const isLoggetIn = createReducer(false, {
  [isLogin]: (_, action) => action.payload,
});
