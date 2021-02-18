import { locations } from './data';
import { LocationResponse } from '../../data/types';
import { USER_ACTION_TYPE } from '../user/actions/actionTypes';
import { UserAction } from '../user/actions/types';
import { DropboxLocation, DropboxState } from './types';

const initialState: DropboxState = {
  locations: [],
};

const filterByCityAndState = (targetCity: string, targetState: string): DropboxLocation[] => {
  return locations.filter(({jurisdiction, city, state}) => {
    if (targetCity === city && targetState === state) {
      return true;
    }
    if (targetCity === jurisdiction && targetState === state) {
      return true;
    }
    return false;
  });
};

export default function(state: DropboxState = initialState, action: UserAction): DropboxState {
  switch (action.type) {
    case USER_ACTION_TYPE.UPDATE_STATE:
      return { locations: [] }
    case USER_ACTION_TYPE.FIND_HOME:
      return { locations: [] }
    case USER_ACTION_TYPE.FIND_HOME_SUCCESS:
      const home = action.payload as LocationResponse;
      if (home.location) {
        return {
          locations: filterByCityAndState(home.location.city, home.location.state),
        }
      }
      return { locations: [] }
    default:
      return state;
  }
};
