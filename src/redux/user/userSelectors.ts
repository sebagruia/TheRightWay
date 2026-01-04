import { RootState } from '../store';

export const selectUserAuth = (state: RootState) => state.userReducer.user;

export const userError = (state: RootState) => state.userReducer.error;

export const selectGoogleCalendarAccessToken = (state: RootState) => state.userReducer.googleCalendarAccessToken;
