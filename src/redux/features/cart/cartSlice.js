import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    cartItems: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // const existingItem = state.cartItems.find(item => item._id === action.payload._id)
            const existingItem = state.cartItems.find(item =>{
                console.log(item, action.payload)
                return  item._id === action.payload._id})
            if(!existingItem){
                state.cartItems.push(action.payload);
                alert("Item added successfully")
            } else {
                alert("item already exists")
            }
        }
    }
})


// export the actions
export const {addToCart} = cartSlice.actions;
export default cartSlice.reducer