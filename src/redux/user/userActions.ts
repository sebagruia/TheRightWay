import {userActions} from "./userEnum";

export const setUser = (user:any) => {
  return {
    type: userActions.SET_USER,
    payload: user,
  };
};
