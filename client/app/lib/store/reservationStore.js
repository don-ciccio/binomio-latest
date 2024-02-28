import { create } from "zustand";
import api from "../utils/axiosInterceptor";

export const useReservationStore = create((set) => ({
    loading: false,
    hasErrors: false,
    fetch: async (id) => {
        set(() => ({ loading: true }));
        try {
            const response = await api.get(
                `/api/admin/booking/${id}/blackoutdays`
            );
            set((state) => ({
                data: (state.data = response.data.reservationBlackOutDays),
                loading: false,
            }));
        } catch (error) {
            set(() => ({ hasErrors: true, loading: false }));
        }
    },
}));

export const useReservationDaysStore = create((set) => ({
    loading: false,
    hasErrors: false,
    fetch: async (id) => {
        set(() => ({ loading: true }));
        try {
            const response = await api.get(`api/admin/calendar/${id}`);
            set((state) => ({
                weekdays: (state.data = response.data),
                loading: false,
            }));
        } catch (err) {
            set(() => ({ hasErrors: true, loading: false }));
        }
    },
}));

export const useAreaStore = create((set) => ({
    loading: false,
    hasErrors: false,
    fetch: async (id) => {
        set(() => ({ loading: true }));
        try {
            const response = await api.get(`api/admin/booking/${id}/area`);
            set((state) => ({
                data: (state.data = response.data.area),
                loading: false,
            }));
        } catch (error) {
            set(() => ({ hasErrors: true, loading: false }));
        }
    },
}));
