import { createAction } from "@reduxjs/toolkit";

import {userActions} from "./userEnum";
import {LoggedUser} from "../../interfaces/user";
import {ModalMessage} from "../../interfaces/modal";


export const setUser = createAction<LoggedUser | null>(userActions.SET_USER);
export const setUserModalMessage = createAction<ModalMessage>(userActions.SET_USER_MODAL_MESSAGE);


