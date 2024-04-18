import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import persistedReducer from './rootReducer';

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV === 'development') {
      return getDefaultMiddleware().concat(logger);
    } else {
      return getDefaultMiddleware();
    }
  },
});

export const persistor = persistStore(store);
