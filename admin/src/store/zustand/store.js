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
                `${API_URL}/api/admin/calendar/${id}`
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
    toggleReservationAvailableState: (weekday) => {
        set((state) => ({
            data: state.data.map((day) =>
                day.weekday === weekday
                    ? {
                          ...day,
                          reservationAvailable: !day.reservationAvailable,
                      }
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

export const useSlotStore = create((set) => ({
    loading: false,
    hasErrors: false,
    fetch: async (id) => {
        set(() => ({
            data: [],
            loading: true,
        }));
        try {
            const week_ids = [0, 1, 2, 3, 4, 5, 6];
            let config = {
                params: {
                    weekday: [],
                },
                paramsSerializer: function handleQuery(query) {
                    // this will process params
                    // This should query the params properly for you.
                    return Object.entries(query)
                        .map(([key, value]) =>
                            Array.isArray(value)
                                ? `${key}=${value.join("&" + key + "=")}`
                                : `${key}=${value}`
                        )
                        .join("&");
                },
            };
            config.params.weekday = week_ids;
            const response = await axios.get(
                `${API_URL}/api/admin/calendar/${id}/slots`,
                config
            );

            set((state) => ({
                data: (state.data = response.data),
                loading: false,
            }));
        } catch (err) {
            set(() => ({ hasErrors: true, loading: false }));
        }
    },
    toggleTimeSlot: (time, weekday) => {
        set((state) => ({
            data: state.data.map((day) => ({
                ...day,
                slotTime:
                    day.weekday === weekday
                        ? day.slotTime.map((item) =>
                              item.time === time
                                  ? { ...item, active: !item.active }
                                  : item
                          )
                        : day.slotTime,
            })),
        }));
    },
}));

export const useBlackoutDaysStore = create((set) => ({
    loading: false,
    hasErrors: false,
    fetch: async (id) => {
        set(() => ({ loading: true }));
        try {
            const response = await axios.get(
                `${API_URL}/api/admin/calendar/${id}/blackoutdays`
            );
            set((state) => ({
                data: (state.data = response.data.blackOutDays),
                loading: false,
            }));
        } catch (error) {
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
            const response = await axios.get(
                `${API_URL}/api/admin/booking/${id}/area`
            );
            set((state) => ({
                data: (state.data = response.data.area),
                loading: false,
            }));
        } catch (error) {
            set(() => ({ hasErrors: true, loading: false }));
        }
    },
}));
