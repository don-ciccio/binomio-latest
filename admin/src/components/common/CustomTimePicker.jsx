import { forwardRef } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const ReactDatePickerInput = forwardRef((props, ref) => (
    <div className='relative bg-transparent dark:bg-form-input'>
        <input
            {...props}
            ref={ref}
            type='text'
            className='pl-4 w-25 rounded border border-stroke bg-gray  outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
        />
        <span className='absolute top-1/2 right-4 -translate-y-1/2'>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='14'
                height='14'
                viewBox='0 0 14 14'
            >
                <path
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 5.1L6.74.61a.36.36 0 0 1 .52 0l4.49 4.49m-9.5 3.8l4.49 4.49a.36.36 0 0 0 .52 0l4.49-4.49'
                />
            </svg>
        </span>
    </div>
));

ReactDatePickerInput.displayName = "ReactDatePickerInput";

export const CustomTimePicker = (props) => {
    return (
        <DatePicker
            {...props}
            // @see https://github.com/Hacker0x01/react-datepicker/issues/862#issuecomment-534736357
            customInput={<ReactDatePickerInput />}
        />
    );
};
