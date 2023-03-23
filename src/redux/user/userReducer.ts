import { createReducer } from '@reduxjs/toolkit';
import { ModalMessage } from '../../interfaces/modal';
import { LoggedUser } from '../../interfaces/user';
import { setUser, setUserModalMessage } from './userActions';

interface InitialState {
  user: LoggedUser | null;
  error: ModalMessage;
}
const initialState: InitialState = {
  user: null,
  error: {
    title: '',
    content: '',
  },
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setUserModalMessage, (state, action) => {
      state.error = action.payload;
    })
    .addDefaultCase((state, action) => state);
});
