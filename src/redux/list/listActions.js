import { firestore } from '../../firebase/firebase.utils';

export const FETCH_USER_LISTS = 'FETCH_USER_LISTS';
export const CLEAR_STATE = 'CLEAR_STATE';
export const ADD_NEW_LIST_NAME = 'ADD_NEW_LIST_NAME';
export const ADD_NEW_ITEM_IN_LIST = 'ADD_NEW_ITEM_IN_LIST';
export const SELECT_CURRENT_LIST = 'SELECT_CURRENT_LIST';
export const SET_LIST_IN_USE_ID = 'SET_LIST_IN_USE';
export const DELETE_LIST = 'DELETE_LIST';
export const DELETE_LIST_ITEM = 'DELETE_LIST_ITEM';
export const SELECT_CURRENT_ITEM_FOR_EDITING = 'SELECT_CURENT_ITEM_FOR_EDITING';
export const EDIT_ITEM_NAME = 'EDIT_ITEM_NAME';
export const TOGGLE_CHECK_STATUS = 'TOGGLE_CHECK_STATUS';
export const CHANGE_ITEM_QUANTITY = 'CHANGE_ITEM_QUANTITY';

export const fetchUserLists = (userId) => async (dispatch) => {
  const userListsRef = firestore.collection(`/users/${userId}/lists/`);

  try {
    userListsRef.onSnapshot((snapShot) => {
      let listsObject = {};
      const lists = snapShot.docs.map((item) => item.data());
      lists.forEach((list) => {
        if (list.items) {
          let listItems = {};
          // const itemsKeys = Object.keys(list.items).sort();
          const itemsKeys = Object.keys(list.items);
          for (let key of itemsKeys) {
            listItems = { ...listItems, [key]: list.items[key] };
          }
          listsObject = { ...listsObject, [list.id]: { ...list, items: { ...listItems } } };
        } else {
          listsObject = { ...listsObject, [list.id]: list };
        }
      });
      dispatch({ type: FETCH_USER_LISTS, payload: listsObject });
    });
  } catch (error) {
    console.log(`Error on Fetching Data From Firestore ${error}`);
  }
};

export const addNewListAction = (list) => {
  return {
    type: ADD_NEW_LIST_NAME,
    payload: list,
  };
};
export const clearStateAction = () => {
  return {
    type: CLEAR_STATE,
  };
};

export const deleteListAction = (id) => {
  return {
    type: DELETE_LIST,
    payload: id,
  };
};

export const selectListAction = (list) => {
  return {
    type: SELECT_CURRENT_LIST,
    payload: list,
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

export const editItemName = (listId, itemId, inputValue) => {
  return {
    type: EDIT_ITEM_NAME,
    payload: {
      listId,
      itemId,
      inputValue,
    },
  };
};

export const toggleCheckStatus = (listId, itemId, status) => {
  return {
    type: TOGGLE_CHECK_STATUS,
    payload: {
      listId,
      itemId,
      status,
    },
  };
};

export const changeItemQuantity = (listId, itemId, quantity) => {
  return {
    type: CHANGE_ITEM_QUANTITY,
    payload: {
      listId,
      itemId,
      quantity,
    },
  };
};
