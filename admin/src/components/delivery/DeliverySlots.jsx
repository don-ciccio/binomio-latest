import { useState } from "react";
import { useSlotStore } from "@/store/zustand/store";
import { useWeekdaysStore } from "../../store/zustand/store";
import { format } from "date-fns";

import Loader from "@/components/common/Loader";

const DeliverySlots = () => {
    const [weekday, setWeekday] = useState(0);

    const slotTime = useSlotStore((state) => state.data);
    const toggleTimeSlot = useSlotStore((state) => state.toggleTimeSlot);
    const slotLoading = useSlotStore((state) => state.loading);

    const weekdays = useWeekdaysStore((state) => state.data);

    return (
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
            <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                <h3 className='font-medium text-black dark:text-white'>
                    Slot di consegna
                </h3>
            </div>
            <div className='flex flex-col gap-5.5 p-6.5'>
                <div className='mb-7.5 flex flex-wrap gap-3 rounded-lg border border-stroke py-3 px-4 dark:border-strokedark'>
                    {weekdays?.map((day, idx) => (
                        <a
                            onClick={() => setWeekday(day.weekday)}
                            key={idx}
                            className={`cursor-pointer rounded-md py-3 px-4 text-sm font-medium hover:bg-primary hover:text-white dark:hover:bg-primary md:text-base lg:px-6 bg-gray dark:bg-meta-4 text-black dark:text-white ${
                                day.weekday === weekday
                                    ? "bg-primary text-white"
                                    : ""
                            } `}
                        >
                            {day.name.slice(0, 3)}
                        </a>
                    ))}
                </div>
                {slotTime && (
                    <div id='tab-contents'>
                        <div>
                            {slotLoading ? (
                                <div className='flex items-center justify-center'>
                                    <Loader />
                                </div>
                            ) : (
                                slotTime.map((slot, idx) => (
                                    <div key={idx}>
                                        {slot.weekday === weekday &&
                                            slot.slotTime
                                                .slice(0, -1)
                                                .map((s, i) => (
                                                    <div
                                                        key={i}
                                                        className='inline-flex p-2'
                                                    >
                                                        <button
                                                            key={i}
                                                            onClick={() =>
                                                                toggleTimeSlot(
                                                                    s.time,
                                                                    weekday
                                                                )
                                                            }
                                                            type='button'
                                                            className={`cursor-pointer rounded-md py-3 px-4 text-sm font-medium hover:bg-primary hover:text-white dark:hover:bg-primary md:text-base lg:px-6 bg-gray dark:bg-meta-4 text-black dark:text-white  ${
                                                                s.active
                                                                    ? "bg-primary text-white"
                                                                    : ""
                                                            }`}
                                                        >
                                                            {format(
                                                                s.time,
                                                                "HH:mm"
                                                            )}
                                                            -
                                                            {format(
                                                                s.time +
                                                                    1800000,
                                                                "HH:mm"
                                                            )}
                                                        </button>
                                                    </div>
                                                ))}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeliverySlots;
