import { createAction } from '@reduxjs/toolkit';

import { Item, Items } from '../../interfaces/item';
import { List, Lists } from '../../interfaces/list';
import { InitialState } from '../../interfaces/store';
import { listActions } from './actionEnums';

export const fetchUserListAction = createAction<Lists>(listActions.FETCH_USER_LISTS);
export const fetchListItemsAction = createAction<Items >(listActions.FETCH_LIST_ITEMS);
export const clearStateAction = createAction<InitialState>(listActions.CLEAR_STATE);
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
export const editItem = createAction(listActions.EDIT_ITEM, (listId: string, item: Item) => ({
  payload: {
    listId,
    itemId: item.id,
    item,
  },
}));
export const toggleSort = createAction<string>(listActions.TOGGLE_SORT);
