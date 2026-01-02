import { InitialStateUser } from '../../interfaces/store';
import { stateMapping } from '../stateMapping';

export const userError = (state: InitialStateUser) => {
  const sm = stateMapping(state);
  return sm.userError;
};
