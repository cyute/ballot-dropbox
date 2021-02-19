import { createSlice, createAsyncThunk, PayloadAction, isPending, isFulfilled, isRejected } from '@reduxjs/toolkit'
import { LocationClient } from '../../data/LocationClient';
import { UserState } from './types';

const initialState: UserState = {
  isHeroContainerOpen: true,
  isSearching: false,
  isDisplayError: false,
  state: 'MI',
  address: '',
};

const locationClient = new LocationClient();

export const geocodeHome = createAsyncThunk(
  'user/geocodeHome',
  async (address: string) => {
    const response = await locationClient.get(address);
    return response;
  }
);

export const geocodeDropbox = createAsyncThunk(
  'user/geocodeDropbox',
  async (address: string) => {
    const response = await locationClient.get(address);
    return response;
  }
)

const isPendingAction = isPending(geocodeHome, geocodeDropbox);
const isFulfilledAction = isFulfilled(geocodeHome, geocodeDropbox);
const isRejectedAction = isRejected(geocodeHome, geocodeDropbox);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleHero(state) {
      state.isHeroContainerOpen = !state.isHeroContainerOpen;
    },
    closeError(state) {
      state.isDisplayError = false;
    },
    updateState(state, action: PayloadAction<string>) {
      state.state = action.payload;
    },
    updateAddress(state, action: PayloadAction<string>) {
      state.address = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(geocodeHome.fulfilled, (state, action) => {
      state.address = '';
    });
    builder.addMatcher(isPendingAction, (state) => {
      state.isSearching = true;
      state.isDisplayError = false;
    });
    builder.addMatcher(isFulfilledAction, (state) => {
      state.isSearching = false;
      state.isDisplayError = false;
    });
    builder.addMatcher(isRejectedAction, (state) => {
      state.isSearching = false;
      state.isDisplayError = true;
    });
  },
});

export const { 
  toggleHero,
  closeError,
  updateState,
  updateAddress,
} = userSlice.actions;

export default userSlice.reducer;