import { USER_ACTION_TYPE } from './actions/actionTypes';
import { UserAction } from './actions/types';
import { UserState } from './types';

const initialState: UserState = {
  isHeroContainerOpen: true,
  isSearching: false,
  isDisplayError: false,
  state: 'MI',
  address: '',
};

export default function(state: UserState = initialState, action: UserAction): UserState {
  switch (action.type) {
    case USER_ACTION_TYPE.TOGGLE_HERO_CONTAINER:
      return { ...state, isHeroContainerOpen: !state.isHeroContainerOpen }
    case USER_ACTION_TYPE.CLOSE_ERROR_ALERT:
      return { ...state, isDisplayError: false }
    case USER_ACTION_TYPE.UPDATE_STATE:
      return { ...state, state: action.payload }
    case USER_ACTION_TYPE.UPDATE_ADDRESS:
      return { ...state, address: action.payload }
    case USER_ACTION_TYPE.FIND_HOME:
      return { ...state, isSearching: true, isDisplayError: false }
    case USER_ACTION_TYPE.FIND_HOME_SUCCESS:
      return { ...state, isSearching: false, isDisplayError: false, address: '' }
    case USER_ACTION_TYPE.FIND_HOME_ERROR:
      return { ...state, isSearching: false, isDisplayError: true }
    case USER_ACTION_TYPE.FIND_DROPBOX:
      return { ...state, isSearching: true, isDisplayError: false }
    case USER_ACTION_TYPE.FIND_DROPBOX_SUCCESS:
      return { ...state, isSearching: false, isDisplayError: false }
    case USER_ACTION_TYPE.FIND_DROPBOX_ERROR:
      return { ...state, isSearching: false, isDisplayError: true }
    default:
      return state;
  }
};
