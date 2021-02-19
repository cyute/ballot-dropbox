import { locations } from './data';
import { createSlice } from '@reduxjs/toolkit'
import { LocationResponse } from '../../data/types';
import { geocodeHome, updateState } from '../user/slice';
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

const dropboxSlice = createSlice({
  name: 'dropbox',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(updateState, (state) => {
      state.locations = [];
    });
    builder.addCase(geocodeHome.pending, (state) => {
      state.locations = [];
    });
    builder.addCase(geocodeHome.fulfilled, (state, action) => {
      const home = action.payload as LocationResponse;
      if (home.location) {
        state.locations = filterByCityAndState(home.location.city, home.location.state);
      } else {
        state.locations = [];
      }
    });
  },
});

export default dropboxSlice.reducer;