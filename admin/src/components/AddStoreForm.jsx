import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateStore } from "@/store/react-query/hooks/useMutations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Switch, Metric, TextInput, NumberInput } from "@tremor/react";
import { MapPinIcon } from "@heroicons/react/20/solid";

import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API_URL;

const AddStoreForm = ({
    _id,
    isOpen: previousOpen,
    name: previousName,
    shopAddress: previousShopAddress,
    deliveryRadius: previousDeliveryRadius,
}) => {
    const [isOpen, setIsOpen] = useState(previousOpen || false);
    const [name, setName] = useState(previousName || "");
    const [shopAddress, setShopAddress] = useState(
        previousShopAddress || {
            address: "",
            city: "",
            postalCode: "",
        }
    );
    const [deliveryRadius, setDeliveryRadius] = useState(
        previousDeliveryRadius || 1
    );

    const history = useNavigate();
    const redirect = window.location.search
        ? window.location.search.split("=")[1]
        : "/stores";

    const queryClient = useQueryClient();
    const mutation = useCreateStore();

    const mutationPut = useMutation({
        mutationFn: ({ data, _id }) => {
            return axios.put(`${API_URL}/api/admin/store`, { ...data, _id });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["stores"] });
            history(redirect);
        },
    });

    const createStore = (e) => {
        e.preventDefault();
        const data = {
            name,
            shopAddress,
            deliveryRadius,
            isOpen,
        };

        if (_id) {
            mutationPut.mutate({ data: data, _id: _id });
        } else {
            mutation.mutate(data);
            history(redirect);
        }
    };

    return (
        <>
            <div className='flex p-1 mb-2 justify-between items-center'>
                <Metric>{name}</Metric>
                <div className='flex flex-row gap-2'>
                    <Switch onChange={(e) => setIsOpen(e)} checked={isOpen} />
                    <span className='span-text text-sm items-center'>
                        {isOpen ? "Aperto" : "Chiuso"}
                    </span>
                </div>
            </div>
            <form onSubmit={createStore}>
                <div className='grid grid-cols-1 gap-5'>
                    <div className='flex flex-col gap-5'>
                        <div className='w-full rounded-md border border-gray-200 bg-white'>
                            <div className='border-b border-gray-200 py-4 px-6'>
                                <span className='text-lg font-medium'>
                                    Modifica profilo
                                </span>
                            </div>

                            <div className='flex flex-col gap-2 px-6 pt-6'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-600'>
                                        Nome del negozio
                                    </label>
                                    <TextInput
                                        className='mt-2 max-w-sm'
                                        type='text'
                                        placeholder='Titolo'
                                        value={name}
                                        onValueChange={(e) => setName(e)}
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col gap-6 p-6'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-600'>
                                        Indirizzo
                                    </label>
                                    <TextInput
                                        type='text'
                                        placeholder='Indirizzo'
                                        value={shopAddress.address}
                                        onChange={(e) =>
                                            setShopAddress({
                                                ...shopAddress,
                                                address: e,
                                            })
                                        }
                                        className='mt-2 max-w-md'
                                    />
                                </div>
                                <div>
                                    <div className='flex flex-row gap-4'>
                                        <TextInput
                                            type='text'
                                            placeholder='Città'
                                            value={shopAddress.city}
                                            onChange={(e) =>
                                                setShopAddress({
                                                    ...shopAddress,
                                                    city: e,
                                                })
                                            }
                                            className='max-w-sm'
                                        />
                                        <TextInput
                                            type='text'
                                            placeholder='Codice Postale'
                                            value={shopAddress.postalCode}
                                            onChange={(e) =>
                                                setShopAddress({
                                                    ...shopAddress,
                                                    postalCode: e,
                                                })
                                            }
                                            className='max-w-xs'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full rounded-md border border-gray-200 bg-white'>
                            <div className='border-b border-gray-200 py-4 px-6'>
                                <span className='text-lg font-medium'>
                                    Spedizione e consegne
                                </span>
                            </div>

                            <div className='flex flex-col gap-2 p-6'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-600'>
                                        Raggio consegne
                                    </label>

                                    <NumberInput
                                        icon={MapPinIcon}
                                        type='number'
                                        value={deliveryRadius}
                                        onValueChange={(e) =>
                                            setDeliveryRadius(e)
                                        }
                                        className='max-w-xs mt-2'
                                        placeholder='Scegli...'
                                        max={50}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-start gap-4.5 mt-6'>
                        <button
                            type='button'
                            onClick={() => history(-1)}
                            className='flex justify-center rounded border bg-white border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white'
                        >
                            Annulla
                        </button>

                        <button
                            className='flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95'
                            type='submit'
                        >
                            Salva
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AddStoreForm;

AddStoreForm.propTypes = {
    _id: PropTypes.string,
    name: PropTypes.string,
    isOpen: PropTypes.bool,
    shopAddress: PropTypes.object,
    deliveryRadius: PropTypes.number,
};
