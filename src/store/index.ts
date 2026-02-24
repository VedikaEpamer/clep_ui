import { configureStore } from '@reduxjs/toolkit';
import createEventReducer from './slices/createEventSlice';

export const store = configureStore({
  reducer: {
    createEvent: createEventReducer,
  },
});

// ── TypeScript helpers ────────────────────────────────────────────────────────
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
