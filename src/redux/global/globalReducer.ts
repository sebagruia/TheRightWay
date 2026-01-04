import { createReducer } from '@reduxjs/toolkit';

import { InitialStateGlobal } from '../../interfaces/store';
import { setGlobalLoadingAction } from './globalActions';

export const initialState: InitialStateGlobal = {
  isGlobalLoading: false,
};

export const globalReducer = createReducer(initialState, (builder) => {
  builder.addCase(setGlobalLoadingAction, (state, action) => {
    state.isGlobalLoading = action.payload;
  });
});
