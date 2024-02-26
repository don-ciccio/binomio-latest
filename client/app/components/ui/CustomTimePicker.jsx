import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import { Icon } from "@iconify/react";

const ButtonInput = forwardRef(({ value, onClick }, ref) => (
    <div className='relative w-32'>
        <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
            <Icon
                className='w-5 h-5 text-slate-800'
                icon='mingcute:time-fill'
            />
        </div>
        <button
            onClick={onClick}
            ref={ref}
            className='bg-gray-50 border pt-3 rounded-3xl border-gray-300 text-gray-900 sm:text-sm  focus:ring-slate-500 focus:border-slate-500 block w-full pl-5 p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500'
        >
            {value}
        </button>
    </div>
));

ButtonInput.displayName = "ButtonInput";

export const CustomTimePicker = (props) => {
    return (
        <DatePicker
            {...props}
            // @see https://github.com/Hacker0x01/react-datepicker/issues/862#issuecomment-534736357
            customInput={<ButtonInput />}
        />
    );
};
