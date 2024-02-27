import { create } from "zustand";

export const useToggle = create()((set) => ({
    open: false,
    setOpen: () => set((state) => ({ open: !state.open })),
}));

export const useToggleBooking = create()((set) => ({
    open: false,
    setOpen: () => set((state) => ({ open: !state.open })),
}));
