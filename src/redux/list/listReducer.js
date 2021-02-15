import {ADD_NEW_LIST_NAME, DELETE_LIST} from "./listActions";

const initialState = {
    list:[]
}

export const listReducer = (state=initialState, action)=>{
    switch(action.type){
        case ADD_NEW_LIST_NAME:
            return{
                ...state, list:[...state.list, action.payload]
            }
        case DELETE_LIST:
            return{
                ...state, list:state.list.filter(item=>item.id !== action.payload)
            }
        default:
            return state;
    }
}