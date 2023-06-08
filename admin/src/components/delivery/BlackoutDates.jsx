import PropTypes from "prop-types";

import { useCallback, useEffect } from "react";
import { format, formatISO, parse, startOfDay } from "date-fns";

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
        blackoutDays?.forEach((day) => {
            console.log(day);
            const setTimezone = new Date(
                new Date(day).getTime() -
                    new Date(day).getTimezoneOffset() * -6000
            );
            setDate((date) => [
                ...date,
                <AddedElement
                    value={format(setTimezone, "dd/MM/yyyy")}
                    key={date.length}
                />,
            ]);
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
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
            <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                <h3 className='font-medium text-black dark:text-white'>
                    Date di blackout
                </h3>
            </div>
            <div className='flex flex-col p-6.5'>
                <div className='flex flex-row items-center mb-5'>
                    <div className='relative '>
                        {loading ? (
                            <div className='flex items-center justify-center'>
                                <Loader />
                            </div>
                        ) : (
                            <CustomDatePicker
                                selected={startDate}
                                onChange={(date) => handleDay(date)}
                                dateFormat='dd/MM/yyyy'
                                excludeDates={blackDays}
                                filterDate={isWeekday}
                                minDate={new Date()}
                                locale={it}
                            />
                        )}
                    </div>
                    <div className='ml-5 flex'>
                        <button
                            type='button'
                            onClick={(e) => handleAddDate(e)}
                            className='flex items-center gap-2 rounded bg-primary py-2 px-4.5 font-medium text-white hover:bg-opacity-80'
                        >
                            <svg
                                className='fillCurrent'
                                width='16'
                                height='16'
                                viewBox='0 0 16 16'
                                fill='#fff'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M15 7H9V1C9 0.4 8.6 0 8 0C7.4 0 7 0.4 7 1V7H1C0.4 7 0 7.4 0 8C0 8.6 0.4 9 1 9H7V15C7 15.6 7.4 16 8 16C8.6 16 9 15.6 9 15V9H15C15.6 9 16 8.6 16 8C16 7.4 15.6 7 15 7Z'
                                    fill=''
                                ></path>
                            </svg>
                            Aggiungi Data
                        </button>
                    </div>
                </div>
                {blackoutDaysLoading ? (
                    <div className='flex items-center justify-center'>
                        <Loader />
                    </div>
                ) : (
                    <>
                        {date.map((row, id) => (
                            <div key={id}>
                                <AddedElement
                                    value={row.props.value}
                                    deleteHandler={() => removeDiv(row)}
                                />
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
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
