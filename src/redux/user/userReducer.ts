import { createReducer } from '@reduxjs/toolkit';
import { ModalMessage } from '../../interfaces/modal';
import { LoggedUser } from '../../interfaces/user';
import { setUser, setModalMessage, setGoogleCalendarAccessToken } from './userActions';

interface InitialState {
  user: LoggedUser | null;
  error: ModalMessage;
  googleCalendarAccessToken: string;
}
const initialState: InitialState = {
  user: null,
  error: {
    title: '',
    content: '',
  },
  googleCalendarAccessToken: '',
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
