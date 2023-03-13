import { firestore } from '../../firebase/firebase.utils';
import {listActions} from "./actionEnums"

export const fetchUserLists = (userId) => async (dispatch) => {
  const userListsRef = firestore.collection(`/users/${userId}/lists/`);

  try {
    userListsRef.onSnapshot((snapShot) => {
      let listsObject = {};
      const lists = snapShot.docs.map((item) => item.data());
      lists.forEach((list) => {
        if (list.items) {
          let listItems = {};
          const itemsKeys = Object.keys(list.items).sort();
          for (let key of itemsKeys) {
            listItems = { ...listItems, [key]: list.items[key] };
          }
          listsObject = { ...listsObject, [list.id]: { ...list, items: { ...listItems } } };
        } else {
          listsObject = { ...listsObject, [list.id]: list };
        }
      });
      dispatch({ type: listActions.FETCH_USER_LISTS, payload: listsObject });
    });
  } catch (error) {
    console.log(`Error on Fetching Data From Firestore ${error}`);
  }
};

export const addNewListAction = (list) => {
  return {
    type: listActions.ADD_NEW_LIST_NAME,
    payload: list,
  };
};
export const clearStateAction = () => {
  return {
    type: listActions.CLEAR_STATE,
  };
};

export const deleteListAction = (id) => {
  return {
    type: listActions.DELETE_LIST,
    payload: id,
  };
};

export const selectListAction = (list) => {
  return {
    type: listActions.SELECT_CURRENT_LIST,
    payload: list,
  };
};

export const addNewItemInList = (listId, item) => {
  return {
    type: listActions.ADD_NEW_ITEM_IN_LIST,
    payload: {
      listId,
      item,
    },
  };
};

export const deleteListItem = (listId, itemId) => {
  return {
    type: listActions.DELETE_LIST_ITEM,
    payload: {
      listId,
      itemId,
    },
  };
};

export const selectingCurrentItem = (item) => {
  return {
    type: listActions.SELECT_CURRENT_ITEM_FOR_EDITING,
    payload: item,
  };
};

export const editItemName = (listId, itemId, inputValue) => {
  return {
    type: listActions.EDIT_ITEM_NAME,
    payload: {
      listId,
      itemId,
      inputValue,
    },
  };
};

export const toggleCheckStatus = (listId, itemId, status) => {
  return {
    type: listActions.TOGGLE_CHECK_STATUS,
    payload: {
      listId,
      itemId,
      status,
    },
  }; 
};

export const changeItemQuantity = (listId, itemId, quantity) => {
  return {
    type: listActions.CHANGE_ITEM_QUANTITY,
    payload: {
      listId,
      itemId,
      quantity,
    },
  };
};
