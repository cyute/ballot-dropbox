import { createSlice } from '@reduxjs/toolkit'
import { LocationResponse } from '../../data/types';
import { geocodeDropbox, geocodeHome, updateState } from '../user/slice';
import { Destination, MapState } from './types';

const initialState: MapState = {
  center: { lat: 44.6254027, lng: -84.9069361 },
  zoom: 6,
  destinations: [],
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(updateState, (state, action) => {
      if (action.payload === 'MI') {
        state.center = { lat: 44.6254027, lng: -84.9069361 };
        state.zoom = 6;
        state.destinations = [];
      }
      if (action.payload === 'OH') {
        state.center = { lat: 41.2459212, lng: -82.9121421 };
        state.zoom = 6;
        state.destinations = [];
      }
      if (action.payload === 'PA') {
        state.center = { lat: 41.6459212, lng: -77.4121421 };
        state.zoom = 6;
        state.destinations = [];
      }
    });
    builder.addCase(geocodeHome.fulfilled, (state, action) => {
      const home = action.payload as LocationResponse;
      if (home.location) {
        state.center = { lat: home.location.location.lat, lng: home.location.location.lng };
        state.zoom = 11;
        state.home = home.location;
      }
      state.destinations = [];
    });
    builder.addCase(geocodeDropbox.fulfilled, (state, action) => {
      const dropbox = action.payload as LocationResponse;
      if (dropbox.location) {
        const destination: Destination = {
          address: dropbox.location.address,
          location: dropbox.location.location,
          placeId: dropbox.location.placeId,
        }
        state.destinations.push(destination);
      }
    });
  },
});
 
export default mapSlice.reducer;