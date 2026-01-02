import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import { userReducer } from './user/userReducer';
import { listReducer } from './list/listReducer';
import { globalReducer } from './global/globalReducer';

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['listReducer'],
};

const rootReducer = combineReducers({ userReducer, listReducer, globalReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
