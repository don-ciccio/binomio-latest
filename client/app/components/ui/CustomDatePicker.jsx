import DatePicker from "react-datepicker";
import { forwardRef, useEffect, useState } from "react";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { registerLocale } from "react-datepicker";
import it from "date-fns/locale/it";

const CustomDatePicker = () => {
    registerLocale("it", it);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(
        new Date().setMonth(startDate.getMonth() + 1)
    );

    useEffect(() => {
        if (startDate > endDate) setStartDate(endDate);
    }, [endDate]);

    useEffect(() => {
        if (startDate > endDate) setEndDate(startDate);
    }, [startDate]);

    return (
        <div className='relative w-40'>
            <DatePicker
                locale={it}
                minDate={new Date()}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                startDate={startDate}
                endDate={endDate}
                nextMonthButtonLabel='>'
                previousMonthButtonLabel='<'
                popperClassName='react-datepicker-left'
                customInput={<ButtonInput />}
                renderCustomHeader={({
                    date,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                }) => (
                    <div className='flex items-center justify-between px-2 py-2'>
                        <span className='text-lg text-gray-700'>
                            {format(date, "MMMM yyyy", { locale: it })}
                        </span>
                        <div className='space-x-2'>
                            <button
                                onClick={decreaseMonth}
                                disabled={prevMonthButtonDisabled}
                                type='button'
                                className={`
                                            ${
                                                prevMonthButtonDisabled &&
                                                "cursor-not-allowed opacity-50"
                                            }
                                            inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-slate-500
                                        `}
                            >
                                <Icon
                                    className='w-5 h-5 text-gray-600'
                                    icon='ic:round-chevron-left'
                                />
                            </button>

                            <button
                                onClick={increaseMonth}
                                disabled={nextMonthButtonDisabled}
                                type='button'
                                className={`
                                            ${
                                                nextMonthButtonDisabled &&
                                                "cursor-not-allowed opacity-50"
                                            }
                                            inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-slate-500
                                        `}
                            >
                                <Icon
                                    className='w-5 h-5 text-gray-600'
                                    icon='ic:round-chevron-right'
                                />
                            </button>
                        </div>
                    </div>
                )}
            />
        </div>
    );
};

export default CustomDatePicker;

const ButtonInput = forwardRef(({ value, onClick }, ref) => (
    <button
        onClick={onClick}
        ref={ref}
        type='button'
        className='rounded-3xl inline-flex justify-start w-full pl-4 pr-3 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300  shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-slate-700'
    >
        {format(new Date(value), "dd MMMM yyyy", { locale: it })}
    </button>
));
