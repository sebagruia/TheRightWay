import { listActions } from '../redux/list/actionEnums';

export interface ListAction {
  type: listActions;
  payload?: any;
}
export interface List {
  id: string;
  listName: string;
  owner: string;
  sharedWith: string[];
}
export interface Lists {
  [key: string]: List;
}
