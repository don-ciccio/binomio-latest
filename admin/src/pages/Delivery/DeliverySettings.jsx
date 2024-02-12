import {
    Accordion,
    Metric,
    AccordionList,
    Subtitle,
    Button,
} from "@tremor/react";

import { useNavigate, useParams } from "react-router-dom";

import { useCallback, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import DeliveryAvailability from "@/components/delivery/DeliveryAvailability";
import { useMounted } from "@/hooks/useMounted";
import { useWeekdaysStore } from "@/store/zustand/store";
import DeliverySlots from "@/components/delivery/DeliverySlots";
import { useSlotStore } from "@/store/zustand/store";
import { useBlackoutDaysStore } from "@/store/zustand/store";

import axios from "axios";
import BlackoutDates from "@/components/delivery/BlackoutDates";
import { useGetStoreById } from "../../store/react-query/hooks/useQueries";

axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API_URL;

const DeliverySettings = () => {
    const { id } = useParams();

    const { data: store } = useGetStoreById(id);
    const history = useNavigate();
    const weekdays = useWeekdaysStore((state) => state.data);
    const fetchWeekdays = useWeekdaysStore((state) => state.fetch);
    const fetchSlotTime = useSlotStore((state) => state.fetch);
    const slotTime = useSlotStore((state) => state.data);

    const fetchBlackoutDays = useBlackoutDaysStore((state) => state.fetch);

    const [startDate, setStartDate] = useState(new Date());
    const [blackoutDates, setBlackoutDates] = useState([]);
    const [date, setDate] = useState([]);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        fetchWeekdays(id);
        fetchSlotTime(id);
        fetchBlackoutDays(id);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const mounted = useMounted();

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const mutation = useMutation(
        ({ data, id }) => {
            return axios.put(
                `${API_URL}/api/admin/calendar/${id}/settings`,
                { ...data, id },
                config
            );
        },
        {
            onSuccess: () => {
                fetchSlotTime(id);
                fetchBlackoutDays(id);
                setDate([]);
                setBlackoutDates([]);
                setSelected([]);
            },
        }
    );

    const handleChange = useCallback(() => {
        try {
            const data = {
                settings: weekdays,
                slots: slotTime,
                dates: blackoutDates,
                selected: selected,
            };

            mutation.mutate({ data: data, id: id });
        } catch (error) {
            console.log(error.message);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [weekdays]);

    useEffect(() => {
        if (!mounted()) return;
        handleChange();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [weekdays]);

    const updateSettings = (event) => {
        event.preventDefault();

        try {
            const data = {
                settings: weekdays,
                slots: slotTime,
                dates: blackoutDates,
                selected: selected,
            };

            mutation.mutate({ data: data, id: id });
            history(-1);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className=' px-3 xl:px-20 py-12'>
            <div className='flex flex-col p-1 gap-3 mb-4 justify-between items-start'>
                <Metric>Gestione consegne</Metric>
                <Subtitle>{store?.data?.name}</Subtitle>
            </div>
            <form onSubmit={updateSettings}>
                <AccordionList>
                    <Accordion>
                        <DeliveryAvailability />
                    </Accordion>
                    <Accordion>
                        <DeliverySlots />
                    </Accordion>
                    <Accordion>
                        <BlackoutDates
                            date={date}
                            setDate={setDate}
                            startDate={startDate}
                            setStartDate={setStartDate}
                            selected={selected}
                            setSelected={setSelected}
                            blackoutDates={blackoutDates}
                            setBlackoutDates={setBlackoutDates}
                        />
                    </Accordion>
                </AccordionList>
                <div className='flex justify-end gap-4 mt-6'>
                    <Button
                        variant='secondary'
                        type='button'
                        onClick={() => history(-1)}
                    >
                        Annulla
                    </Button>

                    <Button variant='primary' type='submit'>
                        Salva
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default DeliverySettings;
