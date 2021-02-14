import {ADD_NEW_LIST_NAME} from "./listActions";

const initialState = {
    list:[]
}

export const listReducer = (state=initialState, action)=>{
    switch(action.type){
        case ADD_NEW_LIST_NAME:
            return{
                ...state, list:[...state.list, action.payload]
            }
        default:
            return state;
    }
}