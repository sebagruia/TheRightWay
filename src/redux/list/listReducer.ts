import { createReducer } from '@reduxjs/toolkit';
import { Item } from '../../interfaces/item';
import { List, Lists } from '../../interfaces/list';
import {
  addNewItemInList,
  addNewListAction,
  changeItemQuantity,
  clearStateAction,
  deleteListAction,
  deleteListItem,
  editItem,
  fetchUserList,
  selectingCurrentItem,
  selectListAction,
  toggleCheckStatus,
} from './listActions';
interface InitialState {
  lists: Lists;
  selectedList: List;
  selectedItemObject: Item;
}

const initialState: InitialState = {
  lists: {},
  selectedList: {
    id: '',
    listName: '',
    items: {},
  },
  selectedItemObject: {
    id: '',
    itemName: '',
    check: false,
    quantity: '',
    unit: '',
    category: '',
  },
};

export const listReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchUserList, (state, action) => {
      state.lists = action.payload;
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
      state.lists[listId].items[item.id] = item;
    })
    .addCase(selectListAction, (state, action) => {
      state.selectedList = action.payload;
    })
    .addCase(deleteListItem, (state, action) => {
      const listIdValue = action.payload.listId;
      const itemIdValue = action.payload.itemId;
      delete state.lists[listIdValue].items[itemIdValue];
    })
    .addCase(editItem, (state, action) => {
      const idList = action.payload.listId;
      const idItem = action.payload.itemId;
      const newValue = action.payload.item;
      state.lists[idList].items[idItem] = newValue;
    })
    .addCase(toggleCheckStatus, (state, action) => {
      const idList = action.payload.listId;
      const idItem = action.payload.itemId;
      const status = action.payload.status;
      state.lists[idList].items[idItem].check = status;
    })
    .addCase(changeItemQuantity, (state, action) => {
      const idList = action.payload.listId;
      const idItem = action.payload.itemId;
      state.lists[idList].items[idItem].quantity = action.payload.quantity;
    })
    .addCase(selectingCurrentItem, (state, action) => {
      state.selectedItemObject = action.payload;
    })
    .addDefaultCase((state, action) => state);
});
