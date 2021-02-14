export const ADD_NEW_LIST_NAME = "ADD_NEW_LIST_NAME";

export const addNewListName = (item)=>{
    return{
        type:ADD_NEW_LIST_NAME,
        payload:item
    }
}