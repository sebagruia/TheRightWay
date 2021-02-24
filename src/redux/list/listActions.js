export const ADD_NEW_LIST_NAME = "ADD_NEW_LIST_NAME";
export const ADD_NEW_ITEM_IN_LIST = "ADD_NEW_ITEM";
export const SET_LIST_IN_USE_ID = "SET_LIST_IN_USE";
export const DELETE_LIST = "DELETE_LIST";
export const DELETE_LIST_ITEM = "DELETE_LIST_ITEM";
export const SELECT_CURRENT_ITEM_FOR_EDITING = "SELECT_CURENT_ITEM_FOR_EDITING";
export const SELECT_CURRENT_LIST = "SELECT_CURRENT_LIST";
export const EDIT_ITEM_NAME = "EDIT_ITEM_NAME";
export const TOGGLE_CHECK_STATUS = "TOGGLE_CHECK_STATUS";

export const addNewListAction = (list) => {
  return {
    type: ADD_NEW_LIST_NAME,
    payload: list,
  };
};

export const deleteListAction = (id) => {
  return {
    type: DELETE_LIST,
    payload: id,
  };
};

export const addNewItemInList = (listId, item) => {
  return {
    type: ADD_NEW_ITEM_IN_LIST,
    payload: {
      listId,
      item,
    },
  };
};

export const deleteListItem = (listId, itemId) => {
  return {
    type: DELETE_LIST_ITEM,
    payload: {
      listId,
      itemId,
    },
  };
};

export const selectingCurrentItem = (itemId) => {
  return {
    type: SELECT_CURRENT_ITEM_FOR_EDITING,
    payload: itemId,
  };
};
export const selectingCurrentList = (list) => {
  return {
    type: SELECT_CURRENT_LIST,
    payload: list,
  };
};

export const editItemName = (listId, itemId, inputValue) => {
  return {
    type: EDIT_ITEM_NAME,
    payload: {
      listId,
      itemId,
      inputValue
    },
  };
};

export const toggleCheckStatus = (listId, itemId, status)=>{
 return{
   type:TOGGLE_CHECK_STATUS,
   payload:{
    listId,
    itemId,
    status
   }
 }
}
