import { LocationResponse } from '../../data/types';
import { USER_ACTION_TYPE } from '../user/actions/actionTypes';
import { UserAction } from '../user/actions/types';
import { Destination, MapState } from './types';

const initialState: MapState = {
  center: { lat: 44.6254027, lng: -84.9069361 },
  zoom: 6,
  destinations: [],
};

export default function(state: MapState = initialState, action: UserAction): MapState {
  switch (action.type) {
    case USER_ACTION_TYPE.UPDATE_STATE:
      if (action.payload === 'MI') {
        return {
          center: { lat: 44.6254027, lng: -84.9069361 },
          zoom: 6,
          destinations: [],
        }
      }
      if (action.payload === 'OH') {
        return {
          center: { lat: 41.2459212, lng: -82.9121421 },
          zoom: 6,
          destinations: [],
        }
      }
      if (action.payload === 'PA') {
        return {
          center: { lat: 41.6459212, lng: -77.4121421 },
          zoom: 6,
          destinations: [],
        }
      }
      return state;
    case USER_ACTION_TYPE.FIND_HOME_SUCCESS: {
      const home = action.payload as LocationResponse;
      return {
        center: home.location ? { lat: home.location.location.lat, lng: home.location.location.lng } : state.center,
        zoom: home.location ? 11 : state.zoom,
        home: home.location,
        destinations: [],
      }
    }
    case USER_ACTION_TYPE.FIND_DROPBOX_SUCCESS: {
      const dropbox = action.payload as LocationResponse;
      if (dropbox.location) {
        const destination: Destination = {
          address: dropbox.location.address,
          location: dropbox.location.location,
          placeId: dropbox.location.placeId,
        }
        return { ...state, destinations: [ ...state.destinations, destination ]}
      }
      return state;
    }
    default:
      return state;
  }
};
