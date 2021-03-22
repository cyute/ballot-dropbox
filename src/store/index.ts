import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import user from './user/slice';

export const rootReducer = combineReducers({ user });

export default configureStore({
  reducer: { user },
  devTools: true,
});
