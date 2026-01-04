import { createAction } from '@reduxjs/toolkit';
import { globalActionsEnums } from './globalActionsEnums';

export const setGlobalLoadingAction = createAction<boolean>(globalActionsEnums.setGlobalLoading);
