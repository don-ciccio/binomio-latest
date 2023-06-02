import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API_URL;

export const useWeekdaysStore = create((set) => ({
    loading: false,
    hasErrors: false,
    fetch: async (id) => {
        set(() => ({ loading: true }));
        try {
            const response = await axios.get(
                `${API_URL}/api/admin/calendar?id=${id}`
            );
            set((state) => ({
                data: (state.data = response.data),
                loading: false,
            }));
        } catch (err) {
            set(() => ({ hasErrors: true, loading: false }));
        }
    },
    toggleAvailableState: (weekday) => {
        set((state) => ({
            data: state.data.map((day) =>
                day.weekday === weekday
                    ? { ...day, available: !day.available }
                    : day
            ),
        }));
    },
    setStartTime: (time, weekday) => {
        set((state) => ({
            data: state.data.map((day) =>
                day.weekday === weekday ? { ...day, startHour: time } : day
            ),
        }));
    },
    setEndTime: (time, weekday) => {
        set((state) => ({
            data: state.data.map((day) =>
                day.weekday === weekday ? { ...day, endHour: time } : day
            ),
        }));
    },
}));
