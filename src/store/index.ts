import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import user from './user/slice';
import map from './map/slice';
import dropbox from './dropbox/slice';

export const rootReducer = combineReducers({ user, map, dropbox });

export default configureStore({
  reducer: { user, map, dropbox },
  middleware: [thunk],
  devTools: true,
});
