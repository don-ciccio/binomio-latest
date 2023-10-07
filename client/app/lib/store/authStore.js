import { create } from "zustand";

// create our store
export const useAuthStore = create((set) => ({
    authUser: null,
    requestLoading: false,
    setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
    setRequestLoading: (isLoading) =>
        set((state) => ({ ...state, requestLoading: isLoading })),
    reset: () => set({ authUser: null, requestLoading: false }),
}));
