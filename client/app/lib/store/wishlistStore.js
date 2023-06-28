import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishlistStore = create()(
    persist(
        (set) => ({
            wishlist: [],
            toggleWishlist: (id) =>
                set((state) => toggleWishlistItem(state.wishlist, id)),
        }),
        {
            name: "wishlist-storage",
        }
    )
);

function toggleWishlistItem(wishlist, id) {
    const status = wishlist.some((wItem) => wItem.id === id);
    const filteredWishlist = wishlist.filter((wItem) => wItem.id !== id);

    if (status) return { wishlist: [...filteredWishlist] };

    const newWishlist = { id, timestamp: Date.now() };
    return { wishlist: [...filteredWishlist, newWishlist] };
}
