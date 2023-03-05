import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import persistedReducer from './rootReducer';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from '@redux-devtools/extension';

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}
export let store;
if (process.env.NODE_ENV === 'development') {
  store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk, ...middlewares)));;
} else {
  store = createStore(persistedReducer, applyMiddleware(thunk, ...middlewares));
}
export const persistor = persistStore(store);
