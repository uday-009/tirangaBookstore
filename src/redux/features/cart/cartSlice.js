import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id)

            if (existingItem) {
                // Update quantity of the existing item
                existingItem.quantity = action.payload.quantity;
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));  // Save to localStorage
            } else {
                // Add new item if it doesn't exist
                state.cartItems.push(action.payload);
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // Save to localStorage
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem("cartItems");
        }
    }
})


// export the actions
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer