import DatePicker from "react-datepicker";
import { forwardRef } from "react";
import { addDays, format } from "date-fns";
import { Icon } from "@iconify/react";
import { registerLocale } from "react-datepicker";
import it from "date-fns/locale/it";

const CustomDatePicker = (props) => {
    registerLocale("it", it);

    const maxDate = addDays(new Date(), 15);

    return (
        <div className='relative w-48'>
            <DatePicker
                {...props}
                locale={it}
                minDate={new Date()}
                maxDate={maxDate}
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
    <div className='relative'>
        <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
            <svg
                aria-hidden='true'
                className='w-5 h-5 text-slate-800 dark:text-gray-400'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    fillRule='evenodd'
                    d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                    clipRule='evenodd'
                ></path>
            </svg>
        </div>
        <button
            onClick={onClick}
            ref={ref}
            type='text'
            className='bg-gray-50 border pt-3 rounded-3xl border-gray-300 text-gray-900 sm:text-sm  focus:ring-slate-500 focus:border-slate-500 block w-full pl-5 p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500'
        >
            {format(new Date(value), "dd MMMM yyyy", { locale: it })}
        </button>
    </div>
));
