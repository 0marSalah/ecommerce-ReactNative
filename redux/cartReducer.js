// import { useState } from "react";
import { addCart, increasQuantity } from "./actions";

// const [p, setP] = useState(0)
export const cartReducer = (state = { cart: [] }, action) => {

    switch (action.type) {
        case addCart: {
            const addedProduct = action.value;
            const productId = addedProduct.id;
            const exists = state.cart.some((p) => p.id === productId);
            if (exists) {
                const cart = state.cart.map((p) =>
                    p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
                );
                return { ...state, cart };
            } else {
                return {
                    ...state,
                    cart: [...state.cart, { ...addedProduct }]
                };
            }
        }


        case increasQuantity: {
            return { ...state, cart: [...action.value] }
        }
        default:
            return state;
    }
}
// {
//     const index = state.products.findIndex(p => p.id === action.payload.id);
//     if (index !== -1) {
//         const productId = action.payload.id
//         return { ...state, products: state.products.map(p => p.id === productId ? { ...p, quantity: p.quantity + 1 } : p) }
//     } else {
//         return { products: [...state.products].concat(action.payload) };
//     }
// }