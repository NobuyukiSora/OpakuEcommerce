import { configureStore } from '@reduxjs/toolkit';
import { productsAPI } from './api';

export const store = configureStore({
  reducer: {
    [productsAPI.reducerPath]: productsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;