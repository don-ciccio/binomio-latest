import { forwardRef } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const ReactDatePickerInput = forwardRef((props, ref) => (
    <div className='relative w-full min-w-[10rem] text-tremor-default focus:ring-2 focus:ring-tremor-brand-muted dark:focus:ring-dark-tremor-brand-muted max-w-sm mx-auto'>
        <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
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
        </div>
        <input
            {...props}
            ref={ref}
            type='text'
            className='w-full outline-none text-left whitespace-nowrap truncate focus:ring-2 transition duration-100 rounded-tremor-default flex flex-nowrap border pl-3 py-2 shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted dark:shadow-dark-tremor-input dark:focus:border-dark-tremor-brand-subtle dark:focus:ring-dark-tremor-brand-muted pr-8 bg-tremor-background dark:bg-dark-tremor-background hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-muted text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis border-tremor-border dark:border-dark-tremor-border'
        />
    </div>
));

ReactDatePickerInput.displayName = "ReactDatePickerInput";

export const CustomDatePicker = (props) => {
    return (
        <DatePicker
            {...props}
            // @see https://github.com/Hacker0x01/react-datepicker/issues/862#issuecomment-534736357
            customInput={<ReactDatePickerInput />}
        />
    );
};
