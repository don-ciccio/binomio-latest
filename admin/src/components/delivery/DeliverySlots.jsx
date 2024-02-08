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
    Button,
} from "@tremor/react";

import Loader from "@/components/common/Loader";

const DeliverySlots = () => {
    const [weekday, setWeekday] = useState(0);

    const slotTime = useSlotStore((state) => state.data);
    const toggleTimeSlot = useSlotStore((state) => state.toggleTimeSlot);
    const slotLoading = useSlotStore((state) => state.loading);

    const weekdays = useWeekdaysStore((state) => state.data);

    return (
        <>
            <AccordionHeader>Slot di consegna</AccordionHeader>
            <AccordionBody>
                <div className='rounded-md border pt-3 px-3 pb-3 border-gray-200 bg-gray-50'>
                    <TabGroup>
                        <TabList variant='solid' className='mt-2'>
                            {weekdays?.map(
                                (day, idx) =>
                                    day.available === true && (
                                        <Tab
                                            onClick={() =>
                                                setWeekday(day.weekday)
                                            }
                                            key={idx}
                                        >
                                            {day.name.slice(0, 3)}
                                        </Tab>
                                    )
                            )}
                        </TabList>
                        {slotTime && (
                            <TabPanels>
                                <TabPanel className='flex flex-col items-center justify-center'>
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
                                                                <Button
                                                                    key={i}
                                                                    onClick={() =>
                                                                        toggleTimeSlot(
                                                                            s.time,
                                                                            weekday
                                                                        )
                                                                    }
                                                                    type='button'
                                                                    variant={`${
                                                                        s.active
                                                                            ? "primary"
                                                                            : "secondary"
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
                                                                </Button>
                                                            </div>
                                                        ))}
                                            </div>
                                        ))
                                    )}
                                </TabPanel>
                            </TabPanels>
                        )}
                    </TabGroup>
                </div>
            </AccordionBody>
        </>
    );
};

export default DeliverySlots;
