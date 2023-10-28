import { List, Lists } from './list';
import { Item, Items, ItemsOfflineMode } from './item';

export interface InitialState {
    lists: Lists;
    listItemsOnline: Items;
    listItemsForOfflineMode:ItemsOfflineMode;
    selectedList: List;
    selectedItemObject: Item;
    sortType: string | null;
  }