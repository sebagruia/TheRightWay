export const ADD_NEW_LIST_NAME = "ADD_NEW_LIST_NAME";
export const ADD_NEW_ITEM_IN_LIST = "ADD_NEW_ITEM";
export const SET_LIST_IN_USE_ID = "SET_LIST_IN_USE";
export const DELETE_LIST = "DELETE_LIST";
export const DELETE_LIST_ITEM = "DELETE_LIST_ITEM";

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
