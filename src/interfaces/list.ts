import { listActions } from '../redux/list/actionEnums';
import { Items } from './item';

export interface ListAction {
  type: listActions;
  payload?: any;
}
export interface List {
  id: string;
  listName: string;
  items: Items;
}
export interface Lists {
  [key: string]: List;
}
