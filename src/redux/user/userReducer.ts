import { createReducer } from '@reduxjs/toolkit';
import { InitialStateUser } from '../../interfaces/store';
import { setUser, setModalMessage, setGoogleCalendarAccessToken } from './userActions';
import { ModalHeaderBackground } from '../../interfaces/modal';

const initialState: InitialStateUser = {
  user: null,
  error: {
    title: '',
    content: '',
    headerBackground: ModalHeaderBackground.error,
    closeText: 'Close',
  },
  googleCalendarAccessToken: false,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setModalMessage, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setGoogleCalendarAccessToken, (state, action) => {
      state.googleCalendarAccessToken = action.payload;
    })
    .addDefaultCase((state) => state);
});
