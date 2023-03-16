import { createReducer } from '@reduxjs/toolkit';
import { setUser, setUserLogginError} from './userActions';

interface InitialState {
  user: any,
  error:string
}
const initialState:InitialState = {
  user: null,
  error:""
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setUserLogginError, (state, action) => {
      state.error = action.payload;
    })
    .addDefaultCase((state, action) => state);
});
