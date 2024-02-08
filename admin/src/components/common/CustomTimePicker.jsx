import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import { TextInput } from "@tremor/react";

import "react-datepicker/dist/react-datepicker.css";

const ReactDatePickerInput = forwardRef((props, ref) => (
    <TextInput {...props} ref={ref} />
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
