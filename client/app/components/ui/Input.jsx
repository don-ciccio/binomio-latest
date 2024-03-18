import { useAddressStore } from "@/app/lib/store";
import { useState } from "react";

const Input = ({
    name,
    placeholder,
    width,
    setDirty,
    setVerificationResult,
}) => {
    const { fieldsValue, setFieldsValue } = useAddressStore((state) => ({
        fieldsValue: state.shippingInfo,
        setFieldsValue: state.setShippingInfo,
    }));
    const markFormDirty = () => {
        setDirty(true);
        setVerificationResult(null);
    };

    return (
        <form onChange={markFormDirty}>
            <div className={`${width} relative flex flex-wrap items-stretch`}>
                <input
                    placeholder={placeholder}
                    type='text'
                    name={name}
                    value={fieldsValue[name]}
                    onChange={(e) => setFieldsValue(name, e.target.value)}
                    className='border rounded-r-none relative flex-auto mb-0 rounded-3xl h-12 text-sm focus:outline-none leading-5 block px-5 py-4 w-1% !bg-white border-white'
                />
                <div className='ml-0 flex bg-white rounded-l-none items-center px-5 rounded-3xl border-0 whitespace-nowrap'></div>
            </div>
        </form>
    );
};

export default Input;
