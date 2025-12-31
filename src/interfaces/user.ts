import { userActions } from '../redux/user/userEnum';
import { User, UserCredential } from 'firebase/auth';

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

export interface UserInfo {
  userAuth: User;
  userCredential: UserCredential;
}
