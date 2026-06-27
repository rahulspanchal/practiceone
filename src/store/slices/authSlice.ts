import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type AuthStatus = 'idle' | 'authenticating' | 'authenticated' | 'error';

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  status: AuthStatus;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userId: null,
  status: 'idle',
  error: null,
};

/**
 * Auth UI/session state. Tokens themselves are NOT kept here — they live in the
 * encrypted secure storage (see auth `tokenStorage`) so secrets never land in
 * the (unencrypted) redux-persist cache. This slice only tracks session status.
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticating(state) {
      state.status = 'authenticating';
      state.error = null;
    },
    authenticated(state, action: PayloadAction<{ userId: string }>) {
      state.isAuthenticated = true;
      state.userId = action.payload.userId;
      state.status = 'authenticated';
      state.error = null;
    },
    authFailed(state, action: PayloadAction<string>) {
      state.status = 'error';
      state.error = action.payload;
    },
    loggedOut(state) {
      state.isAuthenticated = false;
      state.userId = null;
      state.status = 'idle';
      state.error = null;
    },
  },
});

export const { authenticating, authenticated, authFailed, loggedOut } =
  authSlice.actions;
export default authSlice.reducer;
