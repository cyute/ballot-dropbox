import { USER_ACTION_TYPE } from './actionTypes';

export interface UserAction {
  type: USER_ACTION_TYPE;
  payload?: any;
}