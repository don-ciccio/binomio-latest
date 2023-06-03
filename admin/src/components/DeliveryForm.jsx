import { useWeekdaysStore } from "@/store/zustand/store";
import Loader from "@/components/common/Loader";
import Input from "./common/Input";
import { CustomTimePicker } from "./common/CustomTimePicker";

const DeliveryForm = () => {
    const weekdays = useWeekdaysStore((state) => state.data);
    const loading = useWeekdaysStore((state) => state.loading);
    const toggleAvailableState = useWeekdaysStore(
        (state) => state.toggleAvailableState
    );
    console.log(weekdays);
    return (
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
            <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                <h3 className='font-medium text-black dark:text-white'>
                    Disponibilità alla consegna
                </h3>
            </div>
            <div className='flex flex-col gap-5.5 p-6.5'>
                <div>
                    <label className='mb-5 block text-black dark:text-white'>
                        Seleziona i giorni di consegna:
                    </label>
                    {loading ? (
                        <div className='flex items-center justify-center'>
                            <Loader />
                        </div>
                    ) : (
                        weekdays?.map((day, index) => (
                            <li
                                className='flex flex-row justify-start gap-5 mb-5 h-6'
                                key={index}
                            >
                                <span className='span-text items-start text-base w-1/6 font-medium text-black'>
                                    {day.name}
                                </span>
                                <div className='flex gap-4 w-1/4'>
                                    <Input
                                        id={day.name}
                                        name={day.name}
                                        available={day.available}
                                        onChange={() =>
                                            toggleAvailableState(day.weekday)
                                        }
                                        index={index}
                                    />
                                    <span className='span-text text-base items-center'>
                                        {day.available ? (
                                            "Aperto"
                                        ) : (
                                            <div className='inline-flex gap-3'>
                                                <span>Chiuso</span>
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    width='21'
                                                    height='21'
                                                    viewBox='0 0 24 24'
                                                >
                                                    <path
                                                        fill='none'
                                                        stroke='currentColor'
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        strokeWidth='2'
                                                        d='M9.353 3C5.849 4.408 3 7.463 3 11.47A9.53 9.53 0 0 0 12.53 21c4.007 0 7.062-2.849 8.47-6.353C8.17 17.065 8.14 8.14 9.353 3z'
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                    </span>
                                </div>
                                {day.available && (
                                    <>
                                        <span className='flex text-sm items-center justify-center'>
                                            DA
                                        </span>
                                        <div className='flex'>
                                            <CustomTimePicker
                                                selected={day.startHour}
                                                onChange={(date) =>
                                                    useWeekdaysStore
                                                        .getState()
                                                        .setStartTime(
                                                            date.getTime(),
                                                            day.weekday
                                                        )
                                                }
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeIntervals={30}
                                                timeCaption='Orario'
                                                dateFormat='HH:mm'
                                                timeFormat='HH:mm'
                                                minTime={82800000}
                                                maxTime={day.endHour}
                                            />
                                            <span className='flex text-sm items-center justify-center px-5'>
                                                A
                                            </span>
                                            <CustomTimePicker
                                                selected={day.endHour}
                                                onChange={(date) =>
                                                    useWeekdaysStore
                                                        .getState()
                                                        .setEndTime(
                                                            date.getTime(),
                                                            day.weekday
                                                        )
                                                }
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeIntervals={30}
                                                timeCaption='Orario'
                                                dateFormat='HH:mm'
                                                timeFormat='HH:mm'
                                                minTime={day.startHour}
                                                maxTime={81000000}
                                            />
                                        </div>
                                    </>
                                )}
                            </li>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeliveryForm;
