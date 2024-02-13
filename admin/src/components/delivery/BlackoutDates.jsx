import PropTypes from "prop-types";

import { useCallback, useEffect } from "react";
import { format, formatISO, parse, startOfDay } from "date-fns";
import { AccordionBody, AccordionHeader, Button } from "@tremor/react";
import { PlusIcon, CalendarDaysIcon } from "@heroicons/react/20/solid";
import { useBlackoutDaysStore, useWeekdaysStore } from "@/store/zustand/store";
import Loader from "@/components/common/Loader";
import { CustomDatePicker } from "../common/CustomDatePicker";
import { registerLocale } from "react-datepicker";
import it from "date-fns/locale/it";
import AddedElement from "../common/AddedElement";

const BlackoutDates = ({
    startDate,
    setStartDate,
    date,
    setDate,
    selected,
    setSelected,
    blackoutDates,
    setBlackoutDates,
}) => {
    registerLocale("it", it);

    const weekdays = useWeekdaysStore((state) => state.data);
    const loading = useWeekdaysStore((state) => state.loading);

    const blackoutDays = useBlackoutDaysStore((state) => state.data);
    const blackoutDaysLoading = useBlackoutDaysStore((state) => state.loading);

    useEffect(() => {
        setDate([]);
        const today = format(new Date(), "yyyy-MM-dd") + "T23:00:00.000Z";

        blackoutDays?.forEach((day) => {
            const setTimezone = new Date(
                new Date(day).getTime() -
                    new Date(day).getTimezoneOffset() * -6000
            );

            if (day > today) {
                setDate((date) => [
                    ...date,
                    <AddedElement
                        value={format(setTimezone, "dd/MM/yyyy")}
                        key={date.length}
                    />,
                ]);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blackoutDays]);

    const removeDiv = useCallback(
        (itemId) => {
            // filter out the div which matches the ID
            setDate(
                date.filter((id) => {
                    if (id === itemId)
                        return setSelected([
                            ...selected,
                            formatISO(
                                parse(id.props.value, "dd/MM/yyyy", new Date())
                            ),
                        ]);
                    return id !== itemId;
                })
            );
            setBlackoutDates(
                blackoutDates.filter((id) => {
                    return (
                        id !==
                        formatISO(
                            parse(itemId.props.value, "dd/MM/yyyy", new Date())
                        )
                    );
                })
            );
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [date]
    );

    const offDay = weekdays
        ?.filter((weekday) => {
            return weekday.available !== false;
        })
        .map((weekday) => weekday.weekday);

    const blackDays = blackoutDays?.map(
        (day) =>
            new Date(
                new Date(day).getTime() -
                    new Date(day).getTimezoneOffset() * -6000
            )
    );

    const isWeekday = (date) => {
        const day = new Date(
            new Date(date).getTime() -
                new Date(date).getTimezoneOffset() * -6000
        ).getDay();

        return offDay.includes(day);
    };

    const handleAddDate = (e) => {
        e.preventDefault();
        setDate([
            ...date,
            <AddedElement
                value={format(startDate, "dd/MM/yyyy")}
                key={date.length}
            />,
        ]);
        setBlackoutDates([...blackoutDates, formatISO(startOfDay(startDate))]);
    };

    const handleDay = (date) => {
        setStartDate(date);
    };

    return (
        <>
            <AccordionHeader>Date di blackout</AccordionHeader>
            <AccordionBody>
                <div className='rounded-md border pt-5 px-3 border-gray-200 bg-gray-50'>
                    <div className='flex gap-4 mb-5'>
                        <div className='flex flex-row items-end max-w-xs'>
                            <Button
                                icon={PlusIcon}
                                type='button'
                                onClick={(e) => handleAddDate(e)}
                            >
                                Aggiungi Data
                            </Button>
                        </div>
                        <div className='flex '>
                            {loading ? (
                                <div className='flex items-center justify-center'>
                                    <Loader />
                                </div>
                            ) : (
                                <CustomDatePicker
                                    selected={startDate}
                                    onChange={(date) => handleDay(date)}
                                    excludeDates={blackDays}
                                    filterDate={isWeekday}
                                    minDate={new Date()}
                                />
                            )}
                        </div>
                    </div>

                    {blackoutDaysLoading ? (
                        <div className='flex items-center justify-center'>
                            <Loader />
                        </div>
                    ) : (
                        <div className='flex flex-col'>
                            {date.map((row, id) => (
                                <div className='' key={id}>
                                    <AddedElement
                                        icon={CalendarDaysIcon}
                                        value={row.props.value}
                                        deleteHandler={() => removeDiv(row)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </AccordionBody>
        </>
    );
};

export default BlackoutDates;

BlackoutDates.propTypes = {
    startDate: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    setStartDate: PropTypes.func,
    date: PropTypes.array,
    setDate: PropTypes.func,
    selected: PropTypes.array,
    setSelected: PropTypes.func,
    blackoutDates: PropTypes.array,
    setBlackoutDates: PropTypes.func,
};
