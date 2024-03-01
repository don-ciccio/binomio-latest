"use client";

import React, { useState, useEffect } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";

import CustomDatePicker from "@/app/components/ui/CustomDatePicker";
import { format } from "date-fns";
import { Icon } from "@iconify/react";

import {
    useReservationStore,
    useReservationDaysStore,
    useAreaStore,
} from "@/app/lib/store/reservationStore";

import "react-spring-bottom-sheet/dist/style.css";
import { useToggleBooking } from "@/app/lib/store";
import api from "@/app/lib/utils/axiosInterceptor";
import Table from "@/app/components/ui/Table";

const ReservationForm = ({ setPage }) => {
    const open = useToggleBooking((state) => state.open);
    const setOpen = useToggleBooking((state) => state.setOpen);

    const id = "64787b91837e138ddfed4ed0";

    const [totalTables, setTotalTables] = useState([]);

    const [selection, setSelection] = useState({
        table: {
            name: "",
            id: "",
        },
        date: new Date(),
        time: 0,
        location: "Any Location",
        size: 0,
    });

    // User's booking details
    const [booking, setBooking] = useState({
        name: "",
        phone: "",
        email: "",
    });

    const [reservationError, setReservationError] = useState(false);

    const fetchDays = useReservationStore((state) => state.fetch);
    const fetchWeekDays = useReservationDaysStore((state) => state.fetch);

    const blackoutDays = useReservationStore((state) => state.data);
    const weekDays = useReservationDaysStore((state) => state.data);

    const fetchAreas = useAreaStore((state) => state.fetch);
    const areas = useAreaStore((state) => state.data);

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

        return offDay?.includes(day);
    };

    useEffect(() => {
        fetchDays(id);
        fetchWeekDays(id);
        fetchAreas(id);
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

    useEffect(() => {
        // Check availability of tables from DB when a date and time is selected
        if (selection.time && selection.date && selection.size) {
            (async (_) => {
                let datetime = selection.date.setHours(0, 0, 0, 0);
                let res = await api.post(`/api/booking/availability/${id}`, {
                    data: datetime,
                });
                res = res.data;

                // Filter available tables with location and group size criteria
                let tables = res.tables.filter(
                    (table) =>
                        (selection.size > 0
                            ? table.seats >= selection.size
                            : true) &&
                        (selection.location !== "Any Location"
                            ? table.location === selection.location
                            : true)
                );
                setTotalTables(tables);
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selection.time, selection.date, selection.size, selection.location]);

    const getEmptyTables = (_) => {
        let tables = totalTables.filter((table) => table.isAvailable);
        return tables.length;
    };

    // Clicking on a table sets the selection state
    const selectTable = (table_name, table_id) => {
        setSelection({
            ...selection,
            table: {
                name: table_name,
                id: table_id,
            },
        });
    };

    const reserve = async (_) => {
        if (
            (booking.name.length === 0) |
            (booking.phone.length === 0) |
            (booking.email.length === 0) |
            (selection.size === 0)
        ) {
            console.log("Incomplete Details");
            setReservationError(true);
        } else {
            let datetime = selection.date.setHours(0, 0, 0, 0);
            let res = await api.post(`/api/booking/reservation/${id}`, {
                ...booking,
                date: datetime,
                time: selection.time,
                size: selection.size,
                table: selection.table.id,
            });
            res = res.data;
            console.log("Reserved: " + res);
            setSelection({
                table: {
                    name: "",
                    id: "",
                },
                date: new Date(),
                time: 0,
                location: "Any Location",
                size: 0,
            });
            setBooking({
                name: "",
                phone: "",
                email: "",
            });
            setPage(1);
        }
    };

    // Generating tables from available tables state
    const getTables = (_) => {
        if (getEmptyTables() > 0) {
            let tables = [];
            for (var i = 0; i < totalTables.length; i++) {
                if (totalTables[i].isAvailable) {
                    tables.push(
                        <Table
                            key={totalTables[i]._id}
                            id={totalTables[i]._id}
                            seats={totalTables[i].seats}
                            name={totalTables[i].name}
                            empty
                            selectTable={selectTable}
                        />
                    );
                }
            }
            const results = tables.filter(function (table) {
                if (selection.size % 2 === 0) {
                    return table.props.seats === Math.ceil(selection.size);
                } else {
                    if (table.props.seats % 2 === 0) {
                        return (
                            table.props.seats === Math.ceil(selection.size) + 1
                        );
                    } else {
                        return table.props.seats === Math.ceil(selection.size);
                    }
                }
            });

            if (selection.size === 0) return tables;
            return results;
        }
    };
    return (
        <BottomSheet onDismiss={onDismiss} open={open}>
            <div className='min-h-[34px] pb-2  pt-3 px-8 flex flex-col  gap-3  items-center justify-center'>
                {!selection.table.id ? (
                    <span className='font-semibold text-xl uppercase'>
                        Prenota un tavolo
                    </span>
                ) : (
                    <span className='font-semibold text-xl uppercase'>
                        Conferma prenotazione
                    </span>
                )}
                <p className='font-light'>
                    {selection.table.id
                        ? "Stai prenotando il " + selection.table.name
                        : null}
                </p>
            </div>
            {!selection.table.id ? (
                <>
                    <div className='min-h-[78px] py-4 px-8 flex flex-row flex-wrap gap-4  items-center justify-center'>
                        <CustomDatePicker
                            popperPlacement='left-start'
                            filterDate={isWeekday}
                            excludeDates={blackDays}
                            selected={selection.date}
                            onChange={(date) => {
                                if (!isNaN(date)) {
                                    let newSel = {
                                        ...selection,
                                        table: {
                                            ...selection.table,
                                        },
                                        date: date,
                                    };
                                    setSelection(newSel);
                                } else {
                                    console.log("Invalid date");
                                    let newSel = {
                                        ...selection,
                                        table: {
                                            ...selection.table,
                                        },
                                        date: new Date(),
                                    };
                                    setSelection(newSel);
                                }
                            }}
                        />
                        <div className='relative z-20 bg-transparent dark:bg-form-input'>
                            <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                <select
                                    value={selection.time}
                                    onChange={(e) =>
                                        setSelection({
                                            ...selection,
                                            table: {
                                                ...selection.table,
                                            },
                                            time: e.target.value,
                                        })
                                    }
                                    className='text-center w-32 cursor-pointer appearance-none outline-none  bg-gray-50 border pl-5 p-3 rounded-3xl border-gray-300 text-gray-900 sm:text-sm  focus:ring-slate-500 focus:border-slate-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500'
                                >
                                    <option value={0}>Orario</option>
                                    {weekDays?.map(
                                        (day, idx) =>
                                            day.weekday ===
                                                selection.date.getDay() - 1 &&
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
                                    value={selection.size}
                                    onChange={(e) => {
                                        let newSel = {
                                            ...selection,
                                            table: {
                                                ...selection.table,
                                            },
                                            size: e.target.value,
                                        };
                                        setSelection(newSel);
                                    }}
                                    className='text-center w-32 cursor-pointer appearance-none outline-none  bg-gray-50 border pl-5 p-3 rounded-3xl border-gray-300 text-gray-900 sm:text-sm  focus:ring-slate-500 focus:border-slate-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500'
                                >
                                    <option value={0}>Persone</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                </select>
                                <span className='absolute top-1/2 left-4 z-30 -translate-y-1/2'>
                                    <Icon
                                        className='w-5 h-5 text-slate-800'
                                        icon='ion:people'
                                    />
                                </span>
                            </div>
                        </div>
                        <div className='relative z-20 bg-transparent dark:bg-form-input'>
                            <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                <select
                                    value={selection.location}
                                    onChange={(e) =>
                                        setSelection({
                                            ...selection,
                                            table: {
                                                ...selection.table,
                                            },
                                            location: e.target.value,
                                        })
                                    }
                                    className='text-center w-44 cursor-pointer appearance-none outline-none  bg-gray-50 border pl-5 p-3 rounded-3xl border-gray-300 text-gray-900 sm:text-sm  focus:ring-slate-500 focus:border-slate-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500'
                                >
                                    <option value={""}>Scegli location</option>
                                    {areas?.map((location, idx) => (
                                        <option key={idx} value={location}>
                                            {location}
                                        </option>
                                    ))}
                                </select>
                                <span className='absolute top-1/2 left-4 z-30 -translate-y-1/2'>
                                    <Icon
                                        className='w-5 h-5 text-slate-800'
                                        icon='mdi:map-marker-radius'
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='min-h-[56px] py-4 px-8 flex flex-row flex-wrap gap-4  items-start justify-start'>
                        {getEmptyTables() > 0 ? (
                            <div className='flex font-bold'>
                                {getTables().length} disponibili
                            </div>
                        ) : null}
                    </div>
                    <div className='min-h-[156px] pb-8 px-8 pt-4 flex flex-row gap-3 justify-center'>
                        {selection.date && selection.time ? (
                            getEmptyTables() > 0 ? (
                                getTables()
                            ) : selection.size === 0 ? (
                                <p className='font-bold'>
                                    Selezionare il numero di persone
                                </p>
                            ) : (
                                <p className='font-bold'>
                                    Non ci sono tavoli disponibili
                                </p>
                            )
                        ) : (
                            <p className='font-bold'>
                                Per favore selezionare un orario di prenotazione
                                ed il numero di persone.
                            </p>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <div className='min-h-[78px] px-8 py-4  flex flex-row flex-wrap gap-4  items-center justify-center'>
                        <div className='py-[11px]'>
                            <div className='relative flex flex-wrap items-stretch w-full'>
                                <input
                                    placeholder='Nome'
                                    type='text'
                                    name='Nome'
                                    value={booking.name}
                                    onChange={(e) => {
                                        setBooking({
                                            ...booking,
                                            name: e.target.value,
                                        });
                                    }}
                                    width='w-[534px]'
                                    className='border border-r-0  border-zinc-600 rounded-r-none relative flex-auto mb-0 rounded-3xl h-12 text-sm focus:outline-none leading-5 block px-5 py-4 w-1% '
                                />
                                <div className='ml-0 flex border-zinc-600 bg-white rounded-l-none items-center px-5 rounded-3xl border border-l-0 whitespace-nowrap'></div>
                            </div>
                        </div>
                        <div className='py-[11px]'>
                            <div className='relative flex flex-wrap items-stretch w-full'>
                                <input
                                    placeholder='Numero di telefono'
                                    type='text'
                                    name='telefono'
                                    value={booking.phone}
                                    onChange={(e) => {
                                        setBooking({
                                            ...booking,
                                            phone: e.target.value,
                                        });
                                    }}
                                    width='w-[534px]'
                                    className='border border-r-0  border-zinc-600 rounded-r-none relative flex-auto mb-0 rounded-3xl h-12 text-sm focus:outline-none leading-5 block px-5 py-4 w-1% '
                                />
                                <div className='ml-0 flex border-zinc-600 bg-white rounded-l-none items-center px-5 rounded-3xl border border-l-0 whitespace-nowrap'></div>
                            </div>
                        </div>
                        <div className='py-[11px]'>
                            <div className='relative flex flex-wrap items-stretch w-full'>
                                <input
                                    placeholder='Email'
                                    type='text'
                                    name='email'
                                    value={booking.email}
                                    onChange={(e) => {
                                        setBooking({
                                            ...booking,
                                            email: e.target.value,
                                        });
                                    }}
                                    className='border border-r-0  border-zinc-600 rounded-r-none relative flex-auto mb-0 rounded-3xl h-12 text-sm focus:outline-none leading-5 block px-5 py-4 w-1% '
                                />
                                <div className='ml-0 flex border-zinc-600 bg-white rounded-l-none items-center px-5 rounded-3xl border border-l-0 whitespace-nowrap'></div>
                            </div>
                        </div>
                    </div>
                    <div className='min-h-[78px] px-8 pt-4 pb-8 flex flex-row flex-wrap gap-4  items-center justify-center'>
                        <button
                            onClick={(_) => {
                                reserve();
                            }}
                            className='text-white shadow-md active:translate-y-[2px] active:shadow-zinc-800 active:shadow-sm shadow-zinc-600/50 bg-orange-600 px-8 cursor-pointer hover:text-zinc-800 hover:bg-gray-150  text-lg block rounded-3xl transition ease-in-out duration-300 bg-left-top py-2.5'
                        >
                            Prenota
                        </button>
                    </div>
                </>
            )}
        </BottomSheet>
    );
};

export default ReservationForm;
