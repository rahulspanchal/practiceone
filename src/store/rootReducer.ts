import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import notificationReducer from './slices/notificationSlice';
import settingsReducer from './slices/settingsSlice';
import userReducer from './slices/userSlice';

/**
 * The combined root reducer. Each domain owns its own slice, keeping concerns
 * separated and the state tree predictable.
 */
export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  settings: settingsReducer,
  notification: notificationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
