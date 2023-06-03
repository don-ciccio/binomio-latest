import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateStore } from "@/store/react-query/hooks/useMutations";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
        <form onSubmit={createStore}>
            <div className='grid grid-cols-1 gap-5'>
                <div className='flex flex-col gap-5'>
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='flex flex-row justify-between items-center border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Dettagli del Negozio
                            </h3>
                            <div className='flex flex-row gap-3'>
                                <label className='relative inline-flex cursor-pointer'>
                                    <input
                                        checked={isOpen}
                                        onChange={(e) =>
                                            setIsOpen(e.target.checked)
                                        }
                                        type='checkbox'
                                        className='sr-only peer'
                                    />

                                    <div className="w-11 h-6 bg-gray peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                                </label>
                                <span className='span-text text-base items-center'>
                                    {isOpen ? "Aperto" : "Chiuso"}
                                </span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-5.5 p-6.5'>
                            <div>
                                <label className='mb-3 block text-black dark:text-white'>
                                    Nome
                                </label>
                                <input
                                    type='text'
                                    placeholder='Nome'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-gray py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                />
                            </div>
                        </div>
                        <div className='flex flex-col gap-5.5 p-6.5'>
                            <div>
                                <label className='mb-3 block text-black dark:text-white'>
                                    Indirizzo
                                </label>
                                <input
                                    type='text'
                                    placeholder='Indirizzo'
                                    value={shopAddress.address}
                                    onChange={(e) =>
                                        setShopAddress({
                                            ...shopAddress,
                                            address: e.target.value,
                                        })
                                    }
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-gray py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                />
                            </div>
                            <div>
                                <div className='flex flex-row gap-4'>
                                    <input
                                        type='text'
                                        placeholder='Città'
                                        value={shopAddress.city}
                                        onChange={(e) =>
                                            setShopAddress({
                                                ...shopAddress,
                                                city: e.target.value,
                                            })
                                        }
                                        className='w-full rounded-lg border-[1.5px] border-stroke bg-gray py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                    />
                                    <input
                                        type='text'
                                        placeholder='Codice Postale'
                                        value={shopAddress.postalCode}
                                        onChange={(e) =>
                                            setShopAddress({
                                                ...shopAddress,
                                                postalCode: e.target.value,
                                            })
                                        }
                                        className='w-1/2 rounded-lg border-[1.5px] border-stroke bg-gray py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Spedizione e consegne
                            </h3>
                        </div>

                        <div className='flex flex-row gap-5.5 p-6.5'>
                            <div>
                                <label className='mb-3 block text-black dark:text-white'>
                                    Raggio consegne
                                </label>
                                <div className='input-km input-km-right'>
                                    <input
                                        type='number'
                                        value={deliveryRadius}
                                        onChange={(e) =>
                                            setDeliveryRadius(e.target.value)
                                        }
                                        className='pr-7 w-[80px] rounded-lg border-[1.5px] border-stroke bg-gray py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                    />
                                    <i className='right-10'>km</i>
                                </div>
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
