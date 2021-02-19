import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
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
    builder.addCase(geocodeHome.pending, (state, action) => {
      state.isSearching = true;
      state.isDisplayError = false;
    });
    builder.addCase(geocodeHome.fulfilled, (state, action) => {
      state.isSearching = false;
      state.isDisplayError = false;
      state.address = '';
    });
    builder.addCase(geocodeHome.rejected, (state, action) => {
      state.isSearching = false;
      state.isDisplayError = true;
    });
    builder.addCase(geocodeDropbox.pending, (state, action) => {
      state.isSearching = true;
      state.isDisplayError = false;
    });
    builder.addCase(geocodeDropbox.fulfilled, (state, action) => {
      state.isSearching = false;
      state.isDisplayError = false;
    });
    builder.addCase(geocodeDropbox.rejected, (state, action) => {
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