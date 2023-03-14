import {userActions} from "./userEnum";

const initialState = {
  user: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActions.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
