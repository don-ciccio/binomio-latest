import { useWeekdaysStore } from "@/store/zustand/store";
import Loader from "@/components/common/Loader";
import { CustomTimePicker } from "../common/CustomTimePicker";
import { AccordionBody, AccordionHeader } from "@tremor/react";
import { Grid, Col, Icon } from "@tremor/react";
import { ClockIcon } from "@heroicons/react/24/outline";

const DeliveryForm = () => {
    const weekdays = useWeekdaysStore((state) => state.data);
    const loading = useWeekdaysStore((state) => state.loading);
    const toggleAvailableState = useWeekdaysStore(
        (state) => state.toggleAvailableState
    );

    return (
        <>
            <AccordionHeader>Disponibilità alla consegna</AccordionHeader>

            <AccordionBody>
                <div>
                    {loading ? (
                        <div className='flex items-center justify-center'>
                            <Loader />
                        </div>
                    ) : (
                        <div className='rounded-md border pt-5 px-3 pb-3 border-gray-200 bg-gray-50'>
                            {weekdays?.map((day, index) => (
                                <div className='px-4 pb-3' key={index}>
                                    <Grid
                                        numItems={11}
                                        className='gap-2 place-items-start items-center min-h-[38px]'
                                    >
                                        <Col numColSpan={2}>
                                            <div className='flex flex-row gap-4'>
                                                <input
                                                    type='checkbox'
                                                    id={day.name}
                                                    checked={day.available}
                                                    onChange={() =>
                                                        toggleAvailableState(
                                                            day.weekday
                                                        )
                                                    }
                                                    color='blue'
                                                />
                                                <span className='flex text-sm font-medium text-black'>
                                                    {day.name}
                                                </span>
                                            </div>
                                        </Col>

                                        {day.available ? (
                                            <Col numColSpan={5}>
                                                <div className='flex gap-2'>
                                                    <Icon
                                                        icon={ClockIcon}
                                                        variant='simple'
                                                        size='md'
                                                    />
                                                    <div>
                                                        <CustomTimePicker
                                                            selected={
                                                                day.startHour
                                                            }
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
                                                            maxTime={
                                                                day.endHour
                                                            }
                                                        />
                                                    </div>
                                                    <div className='mr-3'>
                                                        <CustomTimePicker
                                                            selected={
                                                                day.endHour
                                                            }
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
                                                            minTime={
                                                                day.startHour
                                                            }
                                                            maxTime={81000000}
                                                        />
                                                    </div>
                                                </div>
                                            </Col>
                                        ) : (
                                            <Col
                                                numColSpan={6}
                                                className='w-full'
                                            ></Col>
                                        )}
                                    </Grid>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </AccordionBody>
        </>
    );
};

export default DeliveryForm;
