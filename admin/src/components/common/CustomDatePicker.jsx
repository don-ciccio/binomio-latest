import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import { addDays, format } from "date-fns";
import { Icon } from "@iconify/react";
import { registerLocale } from "react-datepicker";
import it from "date-fns/locale/it";

export const CustomDatePicker = (props) => {
    registerLocale("it", it);

    const maxDate = addDays(new Date(), 25);

    return (
        <div className='absolute w-48'>
            <DatePicker
                {...props}
                locale={it}
                minDate={new Date()}
                maxDate={maxDate}
                nextMonthButtonLabel='>'
                previousMonthButtonLabel='<'
                popperClassName='react-datepicker-left'
                customInput={<ReactDatePickerInput />}
                renderCustomHeader={({
                    date,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                }) => (
                    <div className='flex items-center justify-between px-2 pb-2'>
                        <span className='text-lg'>
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
                                            inline-flex p-1 text-sm font-medium text-white bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-slate-500
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

const ReactDatePickerInput = forwardRef(({ value, onClick }, ref) => (
    <div className='w-full min-w-[10rem] text-tremor-default focus:ring-2 focus:ring-tremor-brand-muted dark:focus:ring-dark-tremor-brand-muted max-w-sm mx-auto'>
        <button
            onClick={onClick}
            ref={ref}
            type='button'
            className='w-full outline-none text-left whitespace-nowrap truncate focus:ring-2 transition duration-100 rounded-tremor-default flex flex-nowrap border pl-3 py-2 shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted dark:shadow-dark-tremor-input dark:focus:border-dark-tremor-brand-subtle dark:focus:ring-dark-tremor-brand-muted pr-8 bg-tremor-background dark:bg-dark-tremor-background hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-muted text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis border-tremor-border dark:border-dark-tremor-border'
        >
            <svg
                aria-hidden='true'
                className='tremor-DatePicker-calendarIcon flex-none shrink-0 h-5 w-5 mr-2 -ml-0.5 text-tremor-content-subtle dark:text-dark-tremor-content-subtle'
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
            <p className='truncate text-sm'>
                {format(new Date(value), "dd MMMM yyyy", { locale: it })}
            </p>
        </button>
    </div>
));

ReactDatePickerInput.displayName = "ReactDatePickerInput";
