import RippleButton from "@/app/components/ui/Button";
import CustomDatePicker from "@/app/components/ui/CustomDatePicker";
import Input from "@/app/components/ui/Input";
import { useCart } from "@/app/lib/hooks/useCart";
import { useAddressStore } from "@/app/lib/store";
import { useWeekdaysStore } from "@/app/lib/store/weekdaysStore";
import api from "@/app/lib/utils/axiosInterceptor";
import { useState } from "react";
import { format } from "date-fns";

const ShippingDetails = ({ setActiveStep }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [time, setTime] = useState("");
    const { cartData } = useCart();
    const completed = useAddressStore((state) => state.completed);

    const [verificationResult, setVerificationResult] = useState(null);

    const fetchWeekdays = useWeekdaysStore((state) => state.fetch);
    const weekdays = useWeekdaysStore((state) => state.days);
    const blackoutDays = useWeekdaysStore((state) => state.blackOutDays);
    const slotTime = useWeekdaysStore((state) => state.slotList);

    const checkRadiusFn = async () => {
        try {
            let res;

            const shippingInfo = useAddressStore.getState().shippingInfo;
            const checkRadius = {
                orderItems: cartData,
                shippingInfo,
            };
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            if (completed) {
                res = await api.post("/api/checkRadius", checkRadius, config);
            }

            setVerificationResult(res.data.success);
            fetchWeekdays(checkRadius);

            if (res.error) {
                console.log(res.error.errMessage);
            }
        } catch (error) {
            console.log(error.response.data.errMessage);
        }
    };

    const offDay = weekdays
        ?.filter((weekday) => {
            return weekday.available !== false;
        })
        .map((weekday) => weekday.weekday);

    const isWeekday = (date) => {
        const day = new Date(
            new Date(date).getTime() -
                new Date(date).getTimezoneOffset() * -6000
        ).getDay();

        return offDay.includes(day);
    };

    const blackDays = blackoutDays?.blackOutDays.map(
        (day) =>
            new Date(
                new Date(day).getTime() -
                    new Date(day).getTimezoneOffset() * -6000
            )
    );

    const handleSubmit = () => {
        setActiveStep(2);
    };

    return (
        <div className='flex-auto grid items-center lg:px-[50px]'>
            <p className='font-medium text-[20px] mb-6'>
                Indirizzo di consegna
            </p>
            <div className='min-h-[427px]'>
                <div className='flex flex-row justify-between items-center'>
                    <p className='text-[#2D3748] font-medium'>
                        Usa indirizzo salvato
                    </p>
                    <Input placeholder='via Roma 10' width='w-[65%]' />
                </div>

                <div className='py-[11px]'>
                    <p className='text-[#718096] text-[15px] mb-2'>Indirizzo</p>

                    <Input
                        name='address'
                        placeholder='Indirizzo'
                        width='w-full'
                    />
                </div>

                <div className='py-[11px] grid grid-flow-col gap-[40px]'>
                    <div>
                        <p className='text-[#718096] text-[15px] mb-2'>Città</p>

                        <Input
                            placeholder='Città'
                            name='city'
                            type='text'
                            width='w-[278px]'
                        />
                    </div>
                    <div>
                        <p className='text-[#718096] text-[15px] mb-2'>
                            Codice postale
                        </p>

                        <Input
                            placeholder='Cap'
                            name='postalCode'
                            type='text'
                            width='w-[212px]'
                        />
                    </div>
                </div>
                <div className='py-[11px] inline-flex'>
                    <button
                        disabled={!completed}
                        onClick={() => checkRadiusFn()}
                        className='disabled:opacity-25 disabled:cursor-not-allowed font-semibold items-center px-7 py-2 text-sm text-center text-white bg-orange-600 rounded-full hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-zinc-300 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800'
                    >
                        Verifica
                    </button>
                </div>
                {verificationResult && (
                    <div className='py-[11px] flex flex-col'>
                        <span className='flex font-medium text-[20px] mb-6'>
                            Giorno e orario di consegna
                        </span>
                        <div className='flex flex-row gap-4'>
                            <CustomDatePicker
                                filterDate={isWeekday}
                                excludeDates={blackDays}
                                selected={startDate}
                                onChange={(date) => {
                                    setStartDate(date);
                                    setTime("");
                                }}
                            />
                            <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                <select
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className='w-44 cursor-pointer appearance-none outline-none  bg-gray-50 border pl-5 p-3 rounded-3xl border-gray-300 text-gray-900 sm:text-sm  focus:ring-slate-500 focus:border-slate-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500'
                                >
                                    <option disabled value=''>
                                        Orario
                                    </option>

                                    {slotTime?.map(
                                        (slot, idx) =>
                                            slot.weekday ===
                                                startDate.getDay() - 1 &&
                                            slot.slotTime
                                                .slice(0, -1)
                                                .map((s, i) => (
                                                    <option
                                                        disabled={
                                                            s.active
                                                                ? null
                                                                : true
                                                        }
                                                        key={i}
                                                        value={s.time}
                                                    >
                                                        {format(
                                                            s.time,
                                                            "HH:mm"
                                                        )}{" "}
                                                        -{" "}
                                                        {format(
                                                            s.time + 1800000,
                                                            "HH:mm"
                                                        )}
                                                    </option>
                                                ))
                                    )}
                                </select>
                                <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2'>
                                    <svg
                                        className='fill-current'
                                        width='24'
                                        height='24'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <g opacity='0.8'>
                                            <path
                                                fillRule='evenodd'
                                                clipRule='evenodd'
                                                d='M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z'
                                                fill=''
                                            ></path>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className=' border-b border-[#dfdfdf] pt-[50px]' />

            <div className='grid grid-flow-col gap-[50px]  justify-end items-center py-2'>
                <p
                    onClick={() => {
                        setActiveStep(0);
                    }}
                    className='text-[#2D3748] text-[16px] cursor-pointer font-medium'
                >
                    Annulla ordine
                </p>

                <RippleButton
                    disabled={!time}
                    onClick={handleSubmit}
                    label='Pagamento'
                    width='w-[200px]'
                />
            </div>
        </div>
    );
};

export default ShippingDetails;
