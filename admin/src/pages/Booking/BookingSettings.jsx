import {
    Accordion,
    Metric,
    AccordionList,
    Subtitle,
    Button,
    AccordionBody,
    AccordionHeader,
    TextInput,
    Select,
    SelectItem,
    NumberInput,
} from "@tremor/react";
import {
    PlusIcon,
    MapPinIcon,
    UserCircleIcon,
} from "@heroicons/react/20/solid";

import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { useGetStoreById } from "../../store/react-query/hooks/useQueries";
import { useAreaStore, useWeekdaysStore } from "../../store/zustand/store";
import { useCallback, useEffect, useState } from "react";
import AddedElement from "../../components/common/AddedElement";

import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API_URL;

const BookingSettings = () => {
    const { id } = useParams();
    const history = useNavigate();

    const { data: store } = useGetStoreById(id);

    const [location, setLocation] = useState([]);
    const [locationName, setLocationName] = useState("");
    const [roomName, setRoomName] = useState([]);
    const [selected, setSelected] = useState([]);

    const [tableName, setTableName] = useState([]);
    const [tableArea, setTableArea] = useState([]);
    const [seatsNumber, setSeatsNumber] = useState(null);

    const fetchWeekdays = useWeekdaysStore((state) => state.fetch);
    const weekdays = useWeekdaysStore((state) => state.data);

    const fetchAreas = useAreaStore((state) => state.fetch);
    const areas = useAreaStore((state) => state.data);
    const areasLoading = useAreaStore((state) => state.loading);

    useEffect(() => {
        fetchWeekdays(id);
        fetchAreas(id);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        setLocation([]);
        areas?.forEach((area) => {
            setLocation((loc) => [
                ...loc,
                <AddedElement value={area} key={loc.length} />,
            ]);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [areas]);

    const handleAddLocation = (e) => {
        e.preventDefault();
        setLocation([
            ...location,
            <AddedElement value={locationName} key={location.length} />,
        ]);
        setRoomName([...roomName, locationName]);
        setLocationName("");
    };
    console.log(roomName);

    const removeDiv = useCallback(
        (itemId) => {
            // filter out the div which matches the ID
            setLocation(
                location.filter((id) => {
                    if (id === itemId)
                        return setSelected([...selected, id.props.value]);
                    return id !== itemId;
                })
            );
            setRoomName(
                roomName.filter((id) => {
                    return id !== itemId.props.value;
                })
            );
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [location]
    );

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const mutation = useMutation(
        ({ data, id }) => {
            return axios.put(
                `${API_URL}/api/admin/booking/${id}/settings`,
                { ...data, id },
                config
            );
        },
        {
            onSuccess: () => {
                fetchAreas(id);
                setLocation([]);
                setRoomName([]);
                setSelected([]);
            },
        }
    );

    const updateSettings = (event) => {
        event.preventDefault();
        try {
            const data = {
                area: roomName,
                selected: selected,
            };
            mutation.mutate({ data: data, id: id });
            history(-1);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleTableArea = (event) => {
        setTableArea(event);
    };

    return (
        <div className=' px-3 xl:px-20 py-12'>
            <div className='flex flex-col p-1 gap-3 mb-4 justify-between items-start'>
                <Metric>Gestione prenotazioni</Metric>
                <Subtitle>{store?.data?.name}</Subtitle>
            </div>
            <form onSubmit={updateSettings}>
                <AccordionList>
                    <Accordion>
                        <AccordionHeader>Coperti</AccordionHeader>
                        <AccordionBody>
                            <div className='flex flex-col gap-5'>
                                <div className='rounded-md border pt-5 px-3 border-gray-200 bg-gray-50'>
                                    <div className='flex gap-4 mb-5'>
                                        <div className='flex flex-row items-end max-w-xs'>
                                            <Button
                                                icon={PlusIcon}
                                                type='button'
                                                onClick={(e) =>
                                                    handleAddLocation(e)
                                                }
                                            >
                                                Aggiungi posizione
                                            </Button>
                                        </div>
                                        <div className='flex '>
                                            <TextInput
                                                className='mt-2 max-w-full'
                                                type='text'
                                                placeholder='Posizione'
                                                value={locationName}
                                                onValueChange={(e) =>
                                                    setLocationName(e)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className='flex flex-col'>
                                        {location.map((row, id) => (
                                            <div className='' key={id}>
                                                <AddedElement
                                                    icon={MapPinIcon}
                                                    value={row.props.value}
                                                    deleteHandler={() =>
                                                        removeDiv(row)
                                                    }
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='rounded-md border pt-5 px-3 border-gray-200 bg-gray-50 min-h-[180px]'>
                                    <div className='flex gap-4 mb-5 items-center'>
                                        <div className='flex flex-row items-end max-w-xs'>
                                            <Button
                                                icon={PlusIcon}
                                                type='button'
                                                onClick={(e) =>
                                                    handleAddLocation(e)
                                                }
                                            >
                                                Aggiungi tavoli
                                            </Button>
                                        </div>
                                        <div className='flex '>
                                            <TextInput
                                                className=' max-w-full'
                                                type='text'
                                                placeholder='Nome'
                                                value={tableName}
                                                onValueChange={(e) =>
                                                    setTableName(e)
                                                }
                                            />
                                        </div>
                                        <div className='flex'>
                                            <Select
                                                value={tableArea}
                                                onValueChange={handleTableArea}
                                                placeholder='Posizione...'
                                            >
                                                {areas?.map((item, index) => (
                                                    <SelectItem
                                                        key={index}
                                                        value={item}
                                                    >
                                                        {item}
                                                    </SelectItem>
                                                ))}
                                            </Select>
                                        </div>
                                        <div className='flex'>
                                            <NumberInput
                                                className='max-w-[200px]'
                                                icon={UserCircleIcon}
                                                placeholder='Persone...'
                                                value={seatsNumber}
                                                onValueChange={(e) =>
                                                    setSeatsNumber(e)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AccordionBody>
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

export default BookingSettings;
