import Breadcrumb from "@/components/common/BreadCrumb";
import { useNavigate, useParams } from "react-router-dom";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import DeliveryAvailability from "@/components/delivery/DeliveryAvailability";

import { useWeekdaysStore } from "@/store/zustand/store";
import DeliverySlots from "@/components/delivery/DeliverySlots";
import { useSlotStore } from "@/store/zustand/store";
import { useBlackoutDaysStore } from "@/store/zustand/store";

import axios from "axios";
import BlackoutDates from "@/components/delivery/BlackoutDates";

axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API_URL;

const DeliverySettings = () => {
    const { id } = useParams();
    const history = useNavigate();
    const weekdays = useWeekdaysStore((state) => state.data);
    const fetchWeekdays = useWeekdaysStore((state) => state.fetch);

    const fetchSlotTime = useSlotStore((state) => state.fetch);
    const slotTime = useSlotStore((state) => state.data);

    const fetchBlackoutDays = useBlackoutDaysStore((state) => state.fetch);
    const blackoutDays = useBlackoutDaysStore((state) => state.data);

    const [startDate, setStartDate] = useState(new Date());
    const [blackoutDates, setBlackoutDates] = useState([]);
    const [date, setDate] = useState([]);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        if (!weekdays || !slotTime || !blackoutDays) {
            fetchWeekdays(id);
            fetchSlotTime(id);
            fetchBlackoutDays(id);
        }
    }, [id]);

    const isFirstRender = useRef(true);

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const mutation = useMutation(
        ({ data, id }) => {
            return axios.put(
                `${API_URL}/api/admin/calendar/${id}/settings`,
                { ...data, id },
                config
            );
        },
        {
            onSuccess: () => {
                fetchSlotTime(id);
                fetchBlackoutDays(id);
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

            mutation.mutate({ data: data, id: id });
        } catch (error) {
            console.log(error.message);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [weekdays]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false; // toggle flag after first render/mounting
            return;
        }
        handleChange();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

            mutation.mutate({ data: data, id: id });
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <Breadcrumb pageName='Delivery' />
            <div className='flex flex-col gap-5'>
                <form onSubmit={updateSettings}>
                    <div className='flex flex-col gap-5.5'>
                        <>
                            <DeliveryAvailability />
                            <DeliverySlots />
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
                        </>
                    </div>
                </form>
            </div>
        </>
    );
};

export default DeliverySettings;
