import { create } from "zustand";
import api from "../utils/axiosInterceptor";

export const useWeekdaysStore = create((set) => ({
    loading: false,
    hasErrors: false,
    fetch: async (checkRadius) => {
        set(() => ({ loading: true }));
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await api.post(
                "/api/checkRadius",
                checkRadius,
                config
            );
            set((state) => ({
                days: (state.data = response.data.days),
                loading: false,
            }));
            set((state) => ({
                blackOutDays: (state.data = response.data.blackOutDays),
                loading: false,
            }));
        } catch (err) {
            set(() => ({ hasErrors: true, loading: false }));
        }
    },
}));
