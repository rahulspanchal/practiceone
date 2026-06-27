import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  language: string;
  hapticsEnabled: boolean;
  analyticsEnabled: boolean;
}

const initialState: SettingsState = {
  language: 'en',
  hapticsEnabled: true,
  analyticsEnabled: true,
};

/** App preferences. This slice is persisted (see store config). */
const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    setHapticsEnabled(state, action: PayloadAction<boolean>) {
      state.hapticsEnabled = action.payload;
    },
    setAnalyticsEnabled(state, action: PayloadAction<boolean>) {
      state.analyticsEnabled = action.payload;
    },
  },
});

export const { setLanguage, setHapticsEnabled, setAnalyticsEnabled } =
  settingsSlice.actions;
export default settingsSlice.reducer;
