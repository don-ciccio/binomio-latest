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
import Table from "../ui/Table";

const StickyBottom = () => {
    const open = useToggleBooking((state) => state.open);
    const setOpen = useToggleBooking((state) => state.setOpen);

    const id = "64787b91837e138ddfed4ed0";

    const [totalTables, setTotalTables] = useState([]);

    const [selection, setSelection] = useState({
        table: {
            name: null,
            id: null,
        },
        date: new Date(),
        time: null,
        location: "Any Location",
        size: 0,
    });

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
        if (selection.time && selection.date) {
            (async (_) => {
                let datetime = selection.date;
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
                } else {
                    tables.push(
                        <Table
                            key={totalTables[i]._id}
                            id={totalTables[i]._id}
                            seats={totalTables[i].capacity}
                            name={totalTables[i].name}
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

            return results;
        }
    };
    return (
        <>
            <BottomSheet onDismiss={onDismiss} open={open}>
                {!selection.table.id ? (
                    <>
                        <div className='pb-8 px-8 pt-4  flex flex-row flex-wrap gap-4  items-center justify-center'>
                            <CustomDatePicker
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
                                        <option value={null}>Orario</option>
                                        {weekDays?.map(
                                            (day, idx) =>
                                                day.weekday ===
                                                    selection.date.getDay() -
                                                        1 &&
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
                                        <option value={null}>
                                            Scegli location
                                        </option>
                                        {areas?.map((location, idx) => (
                                            <option value={location}>
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
                        <div className='min-h-[80px] pb-8 px-8 pt-4  flex flex-row flex-wrap gap-4  items-start justify-start'>
                            {getEmptyTables() > 0 ? (
                                <div className='flex font-bold'>
                                    {getTables().length} disponibili
                                </div>
                            ) : null}
                        </div>
                        <div className='pb-8 px-8 pt-4 flex flex-row gap-3 justify-center'>
                            {getTables()}
                        </div>
                    </>
                ) : (
                    <div className='min-h-[80px] pb-8 px-8 pt-4  flex flex-row flex-wrap gap-4  items-center justify-center'>
                        <p>prenotazione</p>
                    </div>
                )}
            </BottomSheet>
        </>
    );
};

export default StickyBottom;
