import {userActions} from "../redux/user/userEnum";

export interface UserAction {
    type: userActions;
    payload?: any;
  }