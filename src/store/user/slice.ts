import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserState } from './types';

const initialState: UserState = {
  isHeroContainerOpen: true,
  state: 'MI',
  address: '',
  home: '',
  locations: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleHero(state) {
      state.isHeroContainerOpen = !state.isHeroContainerOpen;
    },
    closeError(state) {
      // state.isDisplayError = false;
    },
    updateState(state, action: PayloadAction<string>) {
      state.state = action.payload;
      state.home = '';
      state.locations = [];
    },
    updateAddress(state, action: PayloadAction<string>) {
      state.address = action.payload;
    },
    updateHome(state) {
      state.home = `${state.address}, ${state.state}`;
      state.locations = [];
    },
    addLocation(state, action: PayloadAction<string>) {
      state.locations.push(action.payload);
    }
  },
});

export const { 
  toggleHero,
  closeError,
  updateState,
  updateAddress,
  updateHome,
  addLocation,
} = userSlice.actions;

export default userSlice.reducer;