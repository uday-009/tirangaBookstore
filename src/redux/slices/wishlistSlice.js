import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            console.log('state', state, action)
            const existingItem = state.find(item => item._id === action.payload._id);
            if (!existingItem) {
                // Add new item if it doesn't exist
                state.push(action.payload);
            }
        },
        removeFromWishlist: (state, action) => {
            state = state.filter(item => item._id !== action.payload._id);
        },
        clearWishlist: (state) => {
            state = [];
        },
        setWishlist: (state, action) => {
            state = action.payload;
        }
    }
});

// Export the actions
export const { addToWishlist, removeFromWishlist, clearWishlist, setWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
