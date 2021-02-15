export const ADD_NEW_LIST_NAME = "ADD_NEW_LIST_NAME";
export const DELETE_LIST = "DELETE_LIST";

export const addNewListAction = (item)=>{
    return{
        type:ADD_NEW_LIST_NAME,
        payload:item
    }
}
export const deleteListAction = (id)=>{
    return{
        type:DELETE_LIST,
        payload:id
    }
}