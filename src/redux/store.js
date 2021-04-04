import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import persistedReducer from './rootReducer';
import { persistStore } from 'redux-persist';

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(persistedReducer, applyMiddleware(thunk, ...middlewares));
export const persistor = persistStore(store);
