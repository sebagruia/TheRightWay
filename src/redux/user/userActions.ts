import {userActions} from "./userEnum";

import { createAction } from "@reduxjs/toolkit";

export const setUser = createAction<any>(userActions.SET_USER);
export const setUserLogginError = createAction<string>(userActions.SET_USER_LOGGIN_ERROR);


