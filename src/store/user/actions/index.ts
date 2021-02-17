import { LocationResponse } from '../../../data/types';
import { USER_ACTION_TYPE } from './actionTypes';
import { UserAction } from './types';

export const toggleHeroContainer = (): UserAction => ({
  type: USER_ACTION_TYPE.TOGGLE_HERO_CONTAINER,
});

export const closeErrorAlert = (): UserAction => ({
  type: USER_ACTION_TYPE.CLOSE_ERROR_ALERT,
});

export const updateState = (payload: string): UserAction => ({
  type: USER_ACTION_TYPE.UPDATE_STATE,
  payload,
});

export const updateAddress = (payload: string): UserAction => ({
  type: USER_ACTION_TYPE.UPDATE_ADDRESS,
  payload,
});

export const findHome = (): UserAction => ({
  type: USER_ACTION_TYPE.FIND_HOME,
});

export const findHomeSuccess = (payload: LocationResponse): UserAction => ({
  type: USER_ACTION_TYPE.FIND_HOME_SUCCESS,
  payload,
});

export const findHomeError = (): UserAction => ({
  type: USER_ACTION_TYPE.FIND_HOME_ERROR,
});

export const findDropbox = (): UserAction => ({
  type: USER_ACTION_TYPE.FIND_DROPBOX,
});

export const findDropboxSuccess = (payload: LocationResponse): UserAction => ({
  type: USER_ACTION_TYPE.FIND_DROPBOX_SUCCESS,
  payload,
});

export const findDropboxError = (): UserAction => ({
  type: USER_ACTION_TYPE.FIND_DROPBOX_ERROR,
});