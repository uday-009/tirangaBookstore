import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import modalSlice from './slices/modalSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    customModal: modalSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})