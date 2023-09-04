import { createReducer } from '@reduxjs/toolkit';

import { PURGE } from 'redux-persist';

import { InitialState } from '../../interfaces/store';
import {
  addNewItemInList,
  addNewListAction,
  clearStateAction,
  deleteListAction,
  deleteListItem,
  editItem,
  fetchListItemsAction,
  fetchUserListAction,
  selectListAction,
  selectingCurrentItem,
  toggleSort,
} from './listActions';

export const initialState: InitialState = {
  lists: {},
  listItemsOnline: {},
  listItemsForOfflineMode:{},
  selectedList: {
    id: '',
    listName: '',
  },
  selectedItemObject: {
    id: '',
    itemName: '',
    check: false,
    quantity: '',
    unit: '',
    category: '',
    note: '',
  },
  sortType: null,
};

export const listReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchUserListAction, (state, action) => {
      state.lists = action.payload;
    })
    .addCase(fetchListItemsAction, (state, action) => {
      state.listItemsOnline = action.payload;
    })
    .addCase(clearStateAction, (state, action) => {
      state = { ...action.payload };
    })
    .addCase(addNewListAction, (state, action) => {
      state.lists[action.payload.id] = action.payload;
    })
    .addCase(deleteListAction, (state, action) => {
      delete state.lists[action.payload];
      delete state.listItemsForOfflineMode[action.payload];
    })
    .addCase(addNewItemInList, (state, action) => {
      const listId = action.payload.listId;
      const item = action.payload.item;
      state.listItemsForOfflineMode[listId] = { ...state.listItemsForOfflineMode[listId], [item.id]: item };
    })
    .addCase(selectListAction, (state, action) => {
      state.selectedList = action.payload;
    })
    .addCase(deleteListItem, (state, action) => {
      const listIdValue = action.payload.listId;
      const itemIdValue = action.payload.itemId;
      delete state.listItemsForOfflineMode[listIdValue][itemIdValue];
    })
    .addCase(editItem, (state, action) => {
      const idList = action.payload.listId;
      const idItem = action.payload.itemId;
      const newValue = action.payload.item;
      state.listItemsForOfflineMode[idList][idItem] =  newValue ;
    })
    .addCase(selectingCurrentItem, (state, action) => {
      state.selectedItemObject = action.payload;
    })
    .addCase(toggleSort, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(PURGE, () => initialState)
    .addDefaultCase((state, action) => state);
});
