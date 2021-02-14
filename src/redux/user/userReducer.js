import { SET_USER } from "./userActions";

const initialState = {
  user:null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      console.log(action.type);
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
