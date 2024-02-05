import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateStore } from "@/store/react-query/hooks/useMutations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    Switch,
    Metric,
    TextInput,
    NumberInput,
    Button,
    Dialog,
    DialogPanel,
    Title,
    Callout,
    Badge,
} from "@tremor/react";
import { MapPinIcon, ExclamationCircleIcon } from "@heroicons/react/20/solid";

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
    const [isModal, setIsModal] = useState(false);
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

    const [dirty, setDirty] = useState(false);

    const markFormDirty = () => setDirty(true);

    const resetState = () => {
        setDirty(false);
        setIsModal(false);
        setName(previousName);
        setIsOpen(previousOpen);
        setShopAddress(previousShopAddress);
        setDeliveryRadius(previousDeliveryRadius);
    };

    const resetHandler = () => {
        setIsModal(true);
    };

    const handleOpen = () => {
        setDirty(true);
        setIsOpen(!isOpen);
    };

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
        <form
            onChange={markFormDirty}
            onReset={resetHandler}
            onSubmit={createStore}
        >
            <Dialog
                open={isModal}
                onClose={(val) => setIsModal(val)}
                static={true}
            >
                <DialogPanel>
                    <Title className='mb-3'>
                        Rimuovi tutte le modifiche non salvate
                    </Title>
                    Rimuovendo le modifiche, eliminerai tutte quelle apportate
                    dopo l&rsquo;ultimo salvataggio.
                    <div className='flex justify-between mt-3'>
                        <Button
                            variant='secondary'
                            onClick={() => setIsModal(false)}
                        >
                            Continua a modificare
                        </Button>
                        <Button
                            variant='secondary'
                            color='red'
                            onClick={resetState}
                        >
                            Rimuovi modifiche
                        </Button>
                    </div>
                </DialogPanel>
            </Dialog>
            <div className='flex p-1 mb-2 justify-between items-center'>
                <Metric>{previousName}</Metric>
                <div className='flex flex-row gap-2'>
                    <Switch onChange={handleOpen} checked={isOpen} />
                    <span className='span-text text-sm items-center'>
                        {isOpen ? (
                            <Badge size='sm' color={"green"}>
                                Aperto
                            </Badge>
                        ) : (
                            <Badge size='sm' color={"red"}>
                                Chiuso
                            </Badge>
                        )}
                    </span>
                </div>
            </div>

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
                                    onValueChange={(e) =>
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
                                        onValueChange={(e) =>
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
                                        onValueChange={(e) =>
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
                                    onValueChange={(e) => setDeliveryRadius(e)}
                                    className='max-w-xs mt-2'
                                    placeholder='Scegli...'
                                    max={50}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`flex mt-5 items-center`}>
                <div
                    className={`w-full transition-all duration-300 ${
                        !dirty ? "opacity-0" : "opacity-100"
                    }`}
                >
                    <Callout
                        className='items-center flex-row justify-between mt-0'
                        title='Modifiche non salvate'
                        icon={ExclamationCircleIcon}
                        color={"gray"}
                    >
                        <span
                            className={`flex items-center gap-2.5 ${
                                !dirty ? "hidden" : ""
                            }`}
                        >
                            <Button
                                size='lg'
                                variant='secondary'
                                color='gray'
                                type='reset'
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                Rimuovi
                            </Button>

                            <Button
                                size='lg'
                                variant='primary'
                                color='gray'
                                type='submit'
                            >
                                Salva
                            </Button>
                        </span>
                    </Callout>
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
