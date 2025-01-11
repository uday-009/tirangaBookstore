import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import modalSlice from './slices/modalSlice';
import wishlistSlice from './slices/wishlistSlice';
import categoriesSlice from './slices/categoriesSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    customModal: modalSlice,
    wishlist: wishlistSlice,
    categories: categoriesSlice

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})