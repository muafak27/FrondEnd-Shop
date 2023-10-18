import { createSlice } from '@reduxjs/toolkit';

const persistedCartSlice = createSlice({
    name: 'main', 
    initialState: {
        cart: {}, 
    },
    reducers: {
        setCart: (state, action) => {
            const product = action.payload;
            const productId = product._id;

            if (state.cart[productId]) {
                state.cart[productId].quantity += 1;
            } else {
                state.cart[productId] = { ...product, quantity: 1 };
            }
        },
        tambahSatu: (state, action) => {
            const productId = action.payload;
            if (state.cart[productId]) {
                state.cart[productId].quantity += 1;
            }
        },
        kurangSatu: (state, action) => {
            const productId = action.payload;
            if (state.cart[productId]) {
                if (state.cart[productId].quantity === 1) {
                    delete state.cart[productId];
                } else {
                    state.cart[productId].quantity -= 1;
                }
            }
        },
        clear: (state) => {
            state.cart = {};
        },
    },
});

export const { setCart, clear, tambahSatu, kurangSatu } = persistedCartSlice.actions;

export default persistedCartSlice.reducer;