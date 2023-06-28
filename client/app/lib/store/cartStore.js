import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create()(
    persist(
        (set) => ({
            cart: [],
            addToCart: (itemObj) =>
                set((state) => addCartItem(state.cart, itemObj)),
            removeFromCart: (id) =>
                set((state) => removeCartItem(state.cart, id)),
            updateQuantity: (id, action) =>
                set((state) => updateItemQuantity(state.cart, id, action)),
        }),
        {
            name: "cart-storage",
        }
    )
);

/* ===== Cart Store Util Functions ===== */
function addCartItem(state, itemObj) {
    const cartArray = state.filter((item) => item.id !== itemObj.id);
    const newItem = { ...itemObj, timestamp: Date.now() };
    return { cart: [...cartArray, newItem] };
}

function removeCartItem(state, id) {
    const removedCart = state.filter((item) => item.id !== id);
    return { cart: [...removedCart] };
}

function updateItemQuantity(state, id, action) {
    const objIndex = state.findIndex((obj) => obj.id == id);

    if (action === "increase") {
        state[objIndex].quantity = state[objIndex].quantity + 1;
    } else if (action === "decrease") {
        state[objIndex].quantity =
            state[objIndex].quantity - (state[objIndex].quantity > 1 ? 1 : 0);
    }

    return { cart: [...state] };
}
