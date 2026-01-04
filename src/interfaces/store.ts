import { List, Lists } from './list';
import { Item, Items, ItemsOfflineMode } from './item';
import { ModalMessage } from '../interfaces/modal';
import { LoggedUser } from '../interfaces/user';

export interface InitialStateList {
  lists: Lists;
  listItemsOnline: Items;
  listItemsForOfflineMode: ItemsOfflineMode;
  selectedList: List;
  selectedItemObject: Item;
  sortType: string | null;
}

export interface InitialStateUser {
  user: LoggedUser | null;
  error: ModalMessage;
  googleCalendarAccessToken: boolean;
}

export interface InitialStateGlobal {
  isGlobalLoading: boolean;
}
