"use client";

import React, { useState, useEffect } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";

import CustomDatePicker from "@/app/components/ui/CustomDatePicker";
import { format } from "date-fns";
import { Icon } from "@iconify/react";

import {
    useReservationStore,
    useReservationDaysStore,
} from "@/app/lib/store/reservationStore";

import "react-spring-bottom-sheet/dist/style.css";
import { useToggleBooking } from "@/app/lib/store";

const StickyBottom = () => {
    const open = useToggleBooking((state) => state.open);
    const setOpen = useToggleBooking((state) => state.setOpen);

    const id = "64787b91837e138ddfed4ed0";
    const [startDate, setStartDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [people, setPeople] = useState(null);

    const fetchDays = useReservationStore((state) => state.fetch);
    const fetchWeekDays = useReservationDaysStore((state) => state.fetch);

    const blackoutDays = useReservationStore((state) => state.data);
    const weekDays = useReservationDaysStore((state) => state.data);

    const blackDays = blackoutDays?.map(
        (day) =>
            new Date(
                new Date(day).getTime() -
                    new Date(day).getTimezoneOffset() * -6000
            )
    );
    const offDay = weekDays
        ?.filter((weekday) => {
            return weekday.reservationAvailable !== false;
        })
        .map((weekday) => weekday.weekday);

    const isWeekday = (date) => {
        const day = new Date(
            new Date(date).getTime() -
                new Date(date).getTimezoneOffset() * -6000
        ).getDay();

        return offDay.includes(day);
    };

    useEffect(() => {
        fetchDays(id);
        fetchWeekDays(id);
    }, []);

    const renderOP = (b, a) => {
        let td = [];
        for (let i = b; i <= a; i += 1800000) {
            td.push(
                <option key={i} value={i}>
                    {format(i, "HH:mm")}
                </option>
            );
        }
        return td;
    };
    function onDismiss() {
        setOpen(false);
    }

    return (
        <>
            <BottomSheet onDismiss={onDismiss} open={open}>
                <div className='pb-8 px-8 pt-4  flex flex-row flex-wrap gap-4  items-center justify-center'>
                    <CustomDatePicker
                        filterDate={isWeekday}
                        excludeDates={blackDays}
                        selected={startDate}
                        onChange={(date) => {
                            setStartDate(date);
                            setTime("");
                        }}
                    />
                    <div className='relative z-20 bg-transparent dark:bg-form-input'>
                        <div className='relative z-20 bg-transparent dark:bg-form-input'>
                            <select
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className='text-center w-32 cursor-pointer appearance-none outline-none  bg-gray-50 border pl-5 p-3 rounded-3xl border-gray-300 text-gray-900 sm:text-sm  focus:ring-slate-500 focus:border-slate-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500'
                            >
                                <option value=''>Orario</option>
                                {weekDays?.map(
                                    (day, idx) =>
                                        day.weekday ===
                                            startDate.getDay() - 1 &&
                                        renderOP(
                                            day.startBookingHour,
                                            day.endBookingHour
                                        )
                                )}
                            </select>
                            <span className='absolute top-1/2 left-4 z-30 -translate-y-1/2'>
                                <Icon
                                    className='w-5 h-5 text-slate-800'
                                    icon='mingcute:time-fill'
                                />
                            </span>
                        </div>
                    </div>
                    <div className='relative z-20 bg-transparent dark:bg-form-input'>
                        <div className='relative z-20 bg-transparent dark:bg-form-input'>
                            <select
                                value={people}
                                onChange={(e) => setPeople(e.target.value)}
                                className='text-center w-24 cursor-pointer appearance-none outline-none  bg-gray-50 border pl-5 p-3 rounded-3xl border-gray-300 text-gray-900 sm:text-sm  focus:ring-slate-500 focus:border-slate-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500'
                            >
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                                <option value='6'>6</option>
                            </select>
                            <span className='absolute top-1/2 left-4 z-30 -translate-y-1/2'>
                                <Icon
                                    className='w-5 h-5 text-slate-800'
                                    icon='ion:people'
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </BottomSheet>
        </>
    );
};

export default StickyBottom;
