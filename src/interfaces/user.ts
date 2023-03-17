import { userActions } from '../redux/user/userEnum';

export interface LoggedUser {
  id: string;
  displayName: string;
  email: string;
  createdAt: number;
}
export interface UserAction {
  type: userActions;
  payload?: any;
}

