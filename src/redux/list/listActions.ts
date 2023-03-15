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
      dispatch(fetchUser(listsObject));
    });
  } catch (error) {
    console.log(`Error on Fetching Data From Firestore ${error}`);
  }
};

// export const fetchUser = (lists: Lists) => {
//   return {
//     type: listActions.FETCH_USER_LISTS,
//     payload: lists,
//   };
// };

// export const addNewListAction = (list: List) => {
//   return {
//     type: listActions.ADD_NEW_LIST_NAME,
//     payload: list,
//   };
// };

// export const clearStateAction = () => {
//   return {
//     type: listActions.CLEAR_STATE,
//   };
// };

// export const deleteListAction = (id: string) => {
//   return {
//     type: listActions.DELETE_LIST,
//     payload: id,
//   };
// };

// export const selectListAction = (list: List) => {
//   return {
//     type: listActions.SELECT_CURRENT_LIST,
//     payload: list,
//   };
// };

// export const addNewItemInList = (listId: string, item: Item) => {
//   return {
//     type: listActions.ADD_NEW_ITEM_IN_LIST,
//     payload: {
//       listId,
//       item,
//     },
//   };
// };

// export const deleteListItem = (listId: string, itemId: string) => {
//   return {
//     type: listActions.DELETE_LIST_ITEM,
//     payload: {
//       listId,
//       itemId,
//     },
//   };
// };

// export const selectingCurrentItem = (item: Item) => {
//   return {
//     type: listActions.SELECT_CURRENT_ITEM_FOR_EDITING,
//     payload: item,
//   };
// };

// export const editItemName = (listId: string, itemId: string, inputValue: string) => {
//   return {
//     type: listActions.EDIT_ITEM_NAME,
//     payload: {
//       listId,
//       itemId,
//       inputValue,
//     },
//   };
// };

// export const toggleCheckStatus = (listId: string, itemId: string, status: boolean) => {
//   console.log(listId, itemId, status);
//   return {
//     type: listActions.TOGGLE_CHECK_STATUS,
//     payload: {
//       listId,
//       itemId,
//       status,
//     },
//   };
// };

// export const changeItemQuantity = (listId: string, itemId: string, quantity: string) => {
//   return {
//     type: listActions.CHANGE_ITEM_QUANTITY,
//     payload: {
//       listId,
//       itemId,
//       quantity,
//     },
//   };
// };

export const fetchUser = createAction<Lists>(listActions.FETCH_USER_LISTS);
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
export const editItemName = createAction(
  listActions.EDIT_ITEM_NAME,
  (listId: string, itemId: string, inputValue: string) => ({
    payload: {
      listId,
      itemId,
      inputValue,
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
