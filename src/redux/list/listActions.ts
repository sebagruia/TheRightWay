import { firestore } from '../../firebase/firebase.utils';

import { createAction } from '@reduxjs/toolkit';

import { Item } from '../../interfaces/item';
import { List, Lists } from '../../interfaces/list';
import { listActions } from './actionEnums';


export const fetchUserLists = (userId: string) => async (dispatch: any) => {
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
      dispatch(fetchUserList(listsObject));
    });
  } catch (error) {
    console.log(`Error on Fetching Data From Firestore ${error}`);
  }
};

export const fetchUserList = createAction<Lists>(listActions.FETCH_USER_LISTS);
export const clearStateAction = createAction(listActions.CLEAR_STATE);
export const addNewListAction = createAction<List>(listActions.ADD_NEW_LIST_NAME);
export const deleteListAction = createAction<string>(listActions.DELETE_LIST);
export const selectListAction = createAction<List>(listActions.SELECT_CURRENT_LIST);
export const addNewItemInList = createAction(listActions.ADD_NEW_ITEM_IN_LIST, (listId: string, item: Item) => ({
  payload: {
    listId,
    item,
  },
}));
export const deleteListItem = createAction(listActions.DELETE_LIST_ITEM, (listId: string, itemId: string) => ({
  payload: {
    listId,
    itemId,
  },
}));
export const selectingCurrentItem = createAction<Item>(listActions.SELECT_CURRENT_ITEM_FOR_EDITING);
export const editItem = createAction(
  listActions.EDIT_ITEM,
  (listId: string, itemId: string, item: Item) => ({
    payload: {
      listId,
      itemId,
      item,
    },
  })
);
export const toggleCheckStatus = createAction(
  listActions.TOGGLE_CHECK_STATUS,
  (listId: string, itemId: string, status: boolean) => ({
    payload: {
      listId,
      itemId,
      status,
    },
  })
);
export const changeItemQuantity = createAction(
  listActions.CHANGE_ITEM_QUANTITY,
  (listId: string, itemId: string, quantity: string) => ({
    payload: {
      listId,
      itemId,
      quantity,
    },
  })
);
