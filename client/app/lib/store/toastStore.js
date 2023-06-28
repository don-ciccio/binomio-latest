import { create } from "zustand";

export const useToastStore = create()((set) => ({
    toast: false,
    toastObj: { status: "info", message: "" },
    setToast: (obj) => set((state) => setToast(state, obj)),
}));

function setToast(state, toastObj) {
    if (!toastObj) return { toast: !state.toastObj };

    return {
        toast: !state.toast,
        toastObj,
    };
}
