import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';

import { reduxPersistStorage } from '@/storage';

import { rootReducer, type RootState } from './rootReducer';

/**
 * Only non-sensitive UI/preference state is persisted. Auth tokens are stored in
 * the encrypted secure storage instead, so they never enter this cache.
 */
const persistConfig = {
  key: 'root',
  version: 1,
  storage: reduxPersistStorage,
  whitelist: ['settings', 'user'] satisfies Array<keyof RootState>,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // redux-persist dispatches non-serializable lifecycle actions.
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type { RootState };
