import { RootState } from '../store';

export const isGlobalLoading = (state: RootState) => {
  return state.globalReducer.isGlobalLoading;
};
