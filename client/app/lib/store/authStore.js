import { create } from "zustand";

// create our store
export const useAuthStore = create((set) => ({
    authenticated: false,
    authUser: null,
    setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
    setAuthentication: (val) => set((state) => ({ authenticated: val })),
}));
