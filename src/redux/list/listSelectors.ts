import { RootState } from '../store';

export const selectLists = (state: RootState) => state.listReducer.lists;

export const selectListItemsOnline = (state: RootState) => state.listReducer.listItemsOnline;

export const selectListItemsForOfflineMode = (state: RootState) => state.listReducer.listItemsForOfflineMode;

export const selectSelectedList = (state: RootState) => state.listReducer.selectedList;

export const selectSelectedItemObject = (state: RootState) => state.listReducer.selectedItemObject;

export const selectSortType = (state: RootState) => state.listReducer.sortType;
