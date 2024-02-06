import { useState } from "react";
import { useSlotStore } from "@/store/zustand/store";
import { useWeekdaysStore } from "../../store/zustand/store";
import { format } from "date-fns";
import {
    AccordionBody,
    AccordionHeader,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
} from "@tremor/react";

import Loader from "@/components/common/Loader";

const DeliverySlots = () => {
    const [weekday, setWeekday] = useState(0);

    const slotTime = useSlotStore((state) => state.data);
    const toggleTimeSlot = useSlotStore((state) => state.toggleTimeSlot);
    const slotLoading = useSlotStore((state) => state.loading);

    const weekdays = useWeekdaysStore((state) => state.data);

    console.log(weekday);
    return (
        <>
            <AccordionHeader>Slot di consegna</AccordionHeader>
            <AccordionBody>
                <TabGroup>
                    <TabList variant='solid' className='mt-2'>
                        {weekdays?.map(
                            (day, idx) =>
                                day.available === true && (
                                    <Tab
                                        onClick={() => setWeekday(day.weekday)}
                                        key={idx}
                                    >
                                        {day.name.slice(0, 3)}
                                    </Tab>
                                )
                        )}
                    </TabList>
                    {slotTime && (
                        <TabPanels>
                            <TabPanel className='flex items-center justify-center'>
                                {slotLoading ? (
                                    <Loader />
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
                            </TabPanel>
                        </TabPanels>
                    )}
                </TabGroup>
            </AccordionBody>
        </>
    );
};

export default DeliverySlots;
