import { createReducer } from '@reduxjs/toolkit';
import { Item, Items} from '../../interfaces/item';
import { List, Lists } from '../../interfaces/list';
import {
  addNewItemInList,
  addNewListAction,
  clearStateAction,
  deleteListAction,
  deleteListItem,
  editItem,
  fetchUserListAction,
  fetchListItemsAction,
  selectListAction,
  selectingCurrentItem,
  toggleSort,
} from './listActions';
interface InitialState {
  lists: Lists;
  listItems:Items;
  selectedList: List;
  selectedItemObject: Item;
  sortType: string | null;
}

const initialState: InitialState = {
  lists: {},
  listItems:{},
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
      state.listItems = action.payload;
    })
    .addCase(clearStateAction, (state, action) => {
      state = { ...initialState };
    })
    .addCase(addNewListAction, (state, action) => {
      state.lists[action.payload.id] = action.payload;
    })
    .addCase(deleteListAction, (state, action) => {
      delete state.lists[action.payload];
    })
    .addCase(addNewItemInList, (state, action) => {
      const listId = action.payload.listId;
      const item = action.payload.item;
      state.listItems = item;
    })
    .addCase(selectListAction, (state, action) => {
      state.selectedList = action.payload;
    })
    .addCase(deleteListItem, (state, action) => {
      const listIdValue = action.payload.listId;
      const itemIdValue = action.payload.itemId;
      // delete state.lists[listIdValue].items[itemIdValue];
      console.log(state.listItems[itemIdValue]);
      delete state.listItems[itemIdValue];
    })
    .addCase(editItem, (state, action) => {
      const idList = action.payload.listId;
      const idItem = action.payload.itemId;
      const newValue = action.payload.item;
      state.listItems[idItem] = newValue;
    })
    .addCase(selectingCurrentItem, (state, action) => {
      state.selectedItemObject = action.payload;
    })
    .addCase(toggleSort, (state, action) => {
      state.sortType = action.payload;
    })
    .addDefaultCase((state, action) => state);
});
