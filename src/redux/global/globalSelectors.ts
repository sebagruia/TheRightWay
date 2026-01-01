import { InitialStateGlobal } from '../../interfaces/store';
import { stateMapping } from '../stateMapping';

export const isGlobalLoading = (state: InitialStateGlobal) => {
  const sm = stateMapping(state);
  return sm.isGlobalLoading;
};
