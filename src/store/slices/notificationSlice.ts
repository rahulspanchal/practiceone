import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { AppNotification } from '@/models';

interface NotificationState {
  items: AppNotification[];
}

const initialState: NotificationState = {
  items: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<AppNotification>) {
      state.items.unshift(action.payload);
    },
    markAllRead(state) {
      state.items.forEach(item => {
        item.read = true;
      });
    },
    removeNotification(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearAll(state) {
      state.items = [];
    },
  },
});

export const { addNotification, markAllRead, removeNotification, clearAll } =
  notificationSlice.actions;
export default notificationSlice.reducer;
