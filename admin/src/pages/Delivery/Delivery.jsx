import Breadcrumb from "@/components/common/BreadCrumb";
import { useGetStores } from "@/store/react-query/hooks/useQueries";
import Loader from "@/components/common/Loader";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import DeliveryAvailability from "@/components/delivery/DeliveryAvailability";
import BlackoutDates from "@/components/delivery/BlackoutDates";

import { useWeekdaysStore } from "@/store/zustand/store";
import DeliverySlots from "@/components/delivery/DeliverySlots";
import { useSlotStore } from "@/store/zustand/store";
import { useBlackoutDaysStore } from "../../store/zustand/store";

import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API_URL;

const Delivery = () => {
    const { data: stores, isLoading } = useGetStores();
    const [store, setStore] = useState("");

    const weekdays = useWeekdaysStore((state) => state.data);
    const fetchWeekdays = useWeekdaysStore((state) => state.fetch);

    const fetchSlotTime = useSlotStore((state) => state.fetch);
    const slotTime = useSlotStore((state) => state.data);

    const fetchBlackoutDays = useBlackoutDaysStore((state) => state.fetch);

    const [startDate, setStartDate] = useState(new Date());
    const [blackoutDates, setBlackoutDates] = useState([]);
    const [date, setDate] = useState([]);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        if (store !== undefined) {
            fetchWeekdays(store);
            fetchSlotTime(store);
            fetchBlackoutDays(store);
        }
    }, [fetchWeekdays, fetchSlotTime, store, fetchBlackoutDays]);

    const isFirstRender = useRef(true);

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const mutation = useMutation(
        ({ data, id }) => {
            return axios.put(
                `${API_URL}/api/admin/calendar/settings?id=${store}`,
                { ...data, id },
                config
            );
        },
        {
            onSuccess: () => {
                fetchSlotTime(store);
                fetchBlackoutDays(store);
                setDate([]);
                setBlackoutDates([]);
                setSelected([]);
            },
        }
    );

    const handleChange = useCallback(() => {
        try {
            const data = {
                settings: weekdays,
                slots: slotTime,
                dates: blackoutDates,
                selected: selected,
            };

            mutation.mutate({ data: data, id: store });
        } catch (error) {
            console.log(error.message);
        }
    }, [weekdays]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false; // toggle flag after first render/mounting
            return;
        }
        handleChange();
    }, [weekdays]);

    const updateSettings = (event) => {
        event.preventDefault();

        try {
            const data = {
                settings: weekdays,
                slots: slotTime,
                dates: blackoutDates,
                selected: selected,
            };

            mutation.mutate({ data: data, id: store });
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <Breadcrumb pageName='Delivery' />
            <div className='flex flex-col gap-5'>
                <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                    <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                        <h3 className='font-medium text-black dark:text-white'>
                            Sede
                        </h3>
                    </div>
                    {isLoading ? (
                        <div className='flex items-center justify-center h-screen'>
                            <Loader />
                        </div>
                    ) : (
                        <div className='flex flex-col gap-5.5 p-6.5'>
                            <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                <select
                                    value={store}
                                    onChange={(e) => setStore(e.target.value)}
                                    className='relative z-20 w-full appearance-none rounded border border-stroke bg-gray py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                >
                                    <option value={""}>Nessuna</option>
                                    {stores?.map((store, i) => (
                                        <option key={i} value={store._id}>
                                            {store.name}
                                        </option>
                                    ))}
                                </select>
                                <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2'>
                                    <svg
                                        className='fill-current'
                                        width='24'
                                        height='24'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <g opacity='0.8'>
                                            <path
                                                fillRule='evenodd'
                                                clipRule='evenodd'
                                                d='M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z'
                                                fill=''
                                            ></path>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <form onSubmit={updateSettings}>
                    <div className='flex flex-col gap-5.5'>
                        {store && store.length > 0 ? (
                            <DeliveryAvailability />
                        ) : null}
                        {store && store.length > 0 ? <DeliverySlots /> : null}
                        {store && store.length > 0 ? (
                            <BlackoutDates
                                date={date}
                                setDate={setDate}
                                startDate={startDate}
                                setStartDate={setStartDate}
                                selected={selected}
                                setSelected={setSelected}
                                blackoutDates={blackoutDates}
                                setBlackoutDates={setBlackoutDates}
                            />
                        ) : null}
                        <div className='flex justify-start gap-4.5 mt-6'>
                            <button
                                type='button'
                                onClick={() => history(-1)}
                                className='flex justify-center rounded border bg-white border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white'
                            >
                                Annulla
                            </button>

                            <button
                                className='flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95'
                                type='submit'
                            >
                                Salva
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Delivery;
