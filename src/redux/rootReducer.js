import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import { userReducer } from './user/userReducer';
import { listReducer } from './list/listReducer';

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['listReducer'],
};

const rootReducer = combineReducers({ userReducer, listReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
