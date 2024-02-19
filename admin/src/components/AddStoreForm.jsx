import PropTypes from "prop-types";

import { useSnackbar } from "notistack";
import { zodResolver } from "@hookform/resolvers/zod";
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
    Badge,
} from "@tremor/react";
import { MapPinIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API_URL;

const schema = z.object({
    isOpen: z.boolean(),
    name: z.string().min(8),
    shopAddress: z.object({
        address: z.string().min(8),
        city: z.string().min(2),
        postalCode: z.string().min(2),
    }),
    deliveryRadius: z.string().min(1),
});

const AddStoreForm = ({
    setDirty,
    isModal,
    setIsModal,
    _id,
    isOpen: previousOpen,
    name: previousName,
    shopAddress: previousShopAddress,
    deliveryRadius: previousDeliveryRadius,
}) => {
    const {
        register,
        handleSubmit,
        setError,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: previousName || "",
            isOpen: previousOpen || false,
            shopAddress: previousShopAddress || {},
            deliveryRadius: previousDeliveryRadius || 1,
        },
        resolver: zodResolver(schema),
    });

    const watchShowOpen = watch("isOpen");
    const { enqueueSnackbar } = useSnackbar();

    const showAlert = (err, variant) => {
        enqueueSnackbar(err, {
            variant: variant,
            preventDuplicate: true,
            anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
            },
        });
    };

    const markFormDirty = () => setDirty(true);

    const resetState = () => {
        reset();
        setIsModal(false);
    };

    const resetHandler = () => {
        setIsModal(true);
    };

    const handleOpen = () => {
        setDirty(false);
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

    const createStore = (data) => {
        try {
            if (_id) {
                mutationPut.mutate({ data: data, _id: _id });
            } else {
                mutation.mutate(data);
                history(redirect);
            }
        } catch (error) {
            setError("root", {
                message: "Errore dal server",
            });
        }
    };

    return (
        <form
            id='store-form'
            onChange={markFormDirty}
            onReset={resetHandler}
            onSubmit={handleSubmit(createStore)}
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
            <div className='flex p-1 mb-4 justify-between items-center'>
                <Metric>{previousName}</Metric>
                <div className='flex flex-row gap-2'>
                    <Switch onChange={handleOpen} checked={watchShowOpen} />
                    <span className='span-text text-sm items-center'>
                        {watchShowOpen ? (
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
                                    {...register("name")}
                                />
                                {errors.name &&
                                    showAlert(errors.name.message, "error")}
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
                                    {...register("shopAddress.address")}
                                    className='mt-2 max-w-md'
                                />
                            </div>
                            <div>
                                <div className='flex flex-row gap-4'>
                                    <TextInput
                                        type='text'
                                        placeholder='Città'
                                        {...register("shopAddress.city")}
                                        className='max-w-sm'
                                    />
                                    <TextInput
                                        type='text'
                                        placeholder='Codice Postale'
                                        {...register("shopAddress.postalCode")}
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
                                    {...register("deliveryRadius")}
                                    className='max-w-xs mt-2'
                                    placeholder='Scegli...'
                                    max={50}
                                    min={1}
                                />
                            </div>
                            {errors.deliveryRadius &&
                                showAlert(
                                    errors.deliveryRadius.message,
                                    "error"
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AddStoreForm;

AddStoreForm.propTypes = {
    setIsModal: PropTypes.func,
    isModal: PropTypes.bool,
    setDirty: PropTypes.func,
    _id: PropTypes.string,
    name: PropTypes.string,
    isOpen: PropTypes.bool,
    shopAddress: PropTypes.object,
    deliveryRadius: PropTypes.number,
};
