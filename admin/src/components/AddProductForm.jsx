import PropTypes from "prop-types";
import { useState } from "react";
import { useGetCategories } from "@/store/react-query/hooks/useQueries";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    MultiSelect,
    MultiSelectItem,
    Select,
    SelectItem,
} from "@tremor/react";
import { ReactSortable } from "react-sortablejs";
import {
    TextInput,
    Textarea,
    Button,
    Dialog,
    DialogPanel,
    Title,
} from "@tremor/react";

import { z } from "zod";
import CurrencyInput from "react-currency-input-field";

import axios from "axios";
import Spinner from "./common/Spinner";
import { useGetStores } from "../store/react-query/hooks/useQueries";
import { useSnackbar } from "notistack";
axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API_URL;

const options = ["Attivo", "Bozza"];

const getSuggestion = async (seller) => {
    try {
        let url = `${API_URL}/api/product/autocomplete/seller?seller=${seller}`;
        let { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.error(error);
    }
};

const merge = (a1, a2) => {
    return a1
        .map((x) => {
            const y = a2.find((item) => x.name === item.name);
            if (y) {
                return Object.assign({}, x, y);
            } else return x;
        })
        .concat(a2.filter((item) => a1.every((x) => x.name !== item.name)));
};

const schema = z.object({
    name: z.string().min(8),
    description: z.string().min(10),
    price: z.number().min(1).or(z.string().min(1)),
    category: z.string().min(2),
    properties: z.record(z.string().or(z.array())),
    status: z.string().min(2),
    store: z.string().min(2),
});

const AddProductForm = ({
    _id,
    setDirty,
    name: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images: existingImages,
    category: existingCategory,
    properties: assignedProperties,
    seller: assignedSeller,
    status: previousStatus,
    store: assignedStore,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const [isUploading, setIsUploading] = useState(false);
    const [name, setName] = useState(existingTitle || "");
    const [category, setCategory] = useState(existingCategory || "");
    const [status, setStatus] = useState(previousStatus || "Attivo");
    const [seller, setSeller] = useState(assignedSeller || "");
    const [store, setStore] = useState(assignedStore || "");
    const [errors, setErrors] = useState([]);
    const [productProperties, setProductProperties] = useState(
        assignedProperties || {}
    );

    const [description, setDescription] = useState(existingDescription || "");
    const [price, setPrice] = useState(existingPrice || "");
    const [images, setImages] = useState(existingImages || []);
    const [multiProperty, setMultiProperty] = useState({});
    const [isButtonShown, setIsButtonShown] = useState(null);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const clickHandler = (index) => {
        setIsButtonShown((prev) => {
            return prev === index ? null : index;
        });
    };

    const { enqueueSnackbar } = useSnackbar();

    const showAlert = (err, variant, path) => {
        err = err.find((error) => error.path[0] === path);

        if (err?.message !== undefined) {
            enqueueSnackbar(err?.message, {
                variant: variant,
                preventDuplicate: true,
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right",
                },
            });
        }
    };

    const resetState = () => {
        setDirty(false);
        setIsOpen(false);
        setName(existingTitle);
        setCategory(existingCategory);
        setDescription(existingDescription);
        setPrice(existingPrice);
        setImages(existingImages || []);
        setStatus(previousStatus);
        setSeller(assignedSeller);
        setStore(assignedStore);
        setProductProperties(assignedProperties);
        setIsButtonShown(null);
    };

    const resetHandler = (e) => {
        e.preventDefault();
        setIsOpen(true);
    };

    const markFormDirty = () => setDirty(true);

    const history = useNavigate();
    const queryClient = useQueryClient();

    const { data: categories, isSuccess } = useGetCategories({ search: "" });
    const { data: stores } = useGetStores();

    const redirect = window.location.search
        ? window.location.search.split("=")[1]
        : "/products";

    const mutationPut = useMutation({
        mutationFn: ({ data, _id }) => {
            return axios.put(`${API_URL}/api/admin/product`, { ...data, _id });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });

            history(redirect);
        },
    });

    const mutationPost = useMutation({
        mutationFn: ({ data }) => {
            return axios.post(`${API_URL}/api/admin/product/new`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            history(redirect);
        },
    });

    const handleStatus = (event) => {
        setDirty(true);
        setStatus(event);
    };

    const handleStore = (event) => {
        setDirty(true);
        setStore(event);
    };

    const saveProduct = (e) => {
        e.preventDefault();

        const data = {
            name: name,
            description: description,
            price: price,
            images: images,
            category: category,
            seller: seller.toString(),
            status: status,
            store: store,
            properties: { ...productProperties, ...multiProperty },
        };

        const formData = schema.safeParse(data);

        if (!formData.success) {
            const { issues } = formData.error;

            setErrors(issues);
        } else {
            setErrors([]);
            if (_id) {
                mutationPut.mutate({ data: data, _id: _id });
            } else {
                mutationPost.mutate({ data: data });
            }
        }

        setIsFormSubmitted(true);
    };

    const deleteImages = async (e) => {
        e.preventDefault();
        setDirty(true);
        const removed = images[isButtonShown].toString();

        if (isFormSubmitted) {
            await axios.delete(`${API_URL}/api/products/upload`, {
                data: { url: removed },
                headers: { "Content-Type": "application/json" },
            });
        }

        setImages((currentImg) =>
            currentImg.filter((img, i) => i !== isButtonShown)
        );

        queryClient.invalidateQueries({ queryKey: ["products"] });
    };

    const uploadImages = async (e) => {
        const files = e.target?.files;
        setDirty(true);
        if (files?.length !== undefined && files?.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of Array.from(files)) {
                data.append("file", file);
                const res = await axios.post(
                    `${API_URL}/api/products/upload`,
                    data
                );
                setImages((oldImages) => {
                    return [...oldImages, ...res.data.links];
                });

                setIsUploading(false);
            }
        }
    };

    const updateImagesOrder = (images) => {
        setImages(images);
    };

    const setProductProp = (propName, value) => {
        setDirty(true);
        setProductProperties((prev) => {
            const newProductProps = { ...prev };
            newProductProps[propName] = value;
            return newProductProps;
        });
    };

    const setMultiProp = (e, name) => {
        setDirty(true);
        setMultiProperty((prev) => {
            const newProductProps = { ...prev };
            newProductProps[name] = e.map((a) => a);
            return newProductProps;
        });
    };

    let propertiesToFill = [];
    let obj = [];
    if (isSuccess && category) {
        let catInfo = categories
            .filter(({ _id }) => _id === category)
            .map((c) => c.properties);

        let catParent = categories.filter(({ _id }) => _id === category);
        propertiesToFill = merge(...catInfo, []);

        if (propertiesToFill[0]?.values.constructor === Array) {
            obj = propertiesToFill[0]?.values.map((str) => ({
                value: str,
                label: str,
            }));
        }

        if (catParent[0]?.parent?._id) {
            const parentCat = categories.filter(
                ({ _id }) => _id === catParent[0]?.parent?._id
            );

            propertiesToFill = merge(parentCat[0].properties, ...catInfo);

            if (propertiesToFill[0]?.values.constructor === Array) {
                obj = propertiesToFill[0]?.values.map((str) => ({
                    value: str,
                    label: str,
                }));
            }
            catInfo = parentCat;
        }
    }

    const onChangeSuggestion = async (e) => {
        setSeller(e);
        let data = await getSuggestion(e);
        setSuggestions(data);
    };

    return (
        <form
            id='product-form'
            onSubmit={saveProduct}
            onChange={markFormDirty}
            onReset={resetHandler}
        >
            <Dialog
                open={isOpen}
                onClose={(val) => setIsOpen(val)}
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
                            onClick={() => setIsOpen(false)}
                        >
                            Continua a modificare
                        </Button>
                        <Button
                            variant='secondary'
                            color='red'
                            onClick={resetState}
                        >
                            Annulla modifiche
                        </Button>
                    </div>
                </DialogPanel>
            </Dialog>

            <div className='grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-3'>
                <div className='sm:col-span-2 flex flex-col gap-5'>
                    {/* <!-- Input Fields --> */}
                    <div className='w-full rounded-md border border-gray-200 bg-white'>
                        <div className='border-b border-gray-200 py-4 px-6'>
                            <span className='text-lg font-medium'>
                                Caratteristiche Prodotto
                            </span>
                        </div>
                        <div className='flex flex-col gap-6 p-6'>
                            <div>
                                <label className='block text-sm font-medium text-gray-600'>
                                    Titolo
                                </label>
                                <TextInput
                                    className='mt-2'
                                    type='text'
                                    placeholder='Titolo'
                                    value={name}
                                    onValueChange={(e) => setName(e)}
                                />
                            </div>
                            {errors.length > 0 &&
                                showAlert(errors, "error", "name")}
                            <div>
                                <label className='block text-sm font-medium text-gray-600'>
                                    Aggiungi immagine
                                </label>
                                <div>
                                    <div className='flex flex-col gap-3.5'>
                                        <div
                                            id='FileUpload'
                                            className='flex items-center justify-center w-full mt-2'
                                        >
                                            <label className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'>
                                                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                                                    <svg
                                                        className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
                                                        aria-hidden='true'
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        fill='none'
                                                        viewBox='0 0 20 16'
                                                    >
                                                        <path
                                                            stroke='currentColor'
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                            strokeWidth='2'
                                                            d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                                                        />
                                                    </svg>
                                                    <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                                                        <span className='text-primary'>
                                                            Clicca per effetture
                                                            l&rsquo;upload
                                                        </span>{" "}
                                                        o trascina
                                                        l&rsquo;immagine
                                                    </p>
                                                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                                                        SVG, PNG, JPG o GIF
                                                        (MAX. 800x400px)
                                                    </p>
                                                </div>
                                                <input
                                                    id='dropzone-file'
                                                    onChange={uploadImages}
                                                    type='file'
                                                    className='hidden'
                                                />
                                            </label>
                                        </div>
                                        <div className='flex flex-row flex-wrap items-start gap-1 max-h-[4.5rem]'>
                                            <ReactSortable
                                                list={images}
                                                setList={updateImagesOrder}
                                                className='flex gap-2 group'
                                            >
                                                {images?.length > 0 ? (
                                                    images.map((link, i) => (
                                                        <div
                                                            className='max-w-[5rem] cursor-pointer'
                                                            key={i}
                                                        >
                                                            <div
                                                                className='relative'
                                                                onMouseEnter={() =>
                                                                    clickHandler(
                                                                        i
                                                                    )
                                                                }
                                                                onMouseLeave={() =>
                                                                    clickHandler(
                                                                        i
                                                                    )
                                                                }
                                                            >
                                                                <img
                                                                    src={link}
                                                                    alt=''
                                                                    className='p-0.5 border-2 border-gray-300 border-dashed rounded-lg dark:border-strokedark'
                                                                />
                                                                <button
                                                                    onClick={
                                                                        deleteImages
                                                                    }
                                                                    className={`${
                                                                        isButtonShown ===
                                                                        i
                                                                            ? "absolute -right-1 -top-2 bg-[#D34053] text-white rounded-full"
                                                                            : "hidden"
                                                                    }`}
                                                                >
                                                                    <Icon
                                                                        className='w-5 h-5'
                                                                        icon='iconamoon:close-bold'
                                                                    />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className='max-w-[5rem] h-11'></div>
                                                )}
                                            </ReactSortable>
                                            {isUploading && (
                                                <div className='h-8 mt-4 ml-3.5 flex items-center'>
                                                    <Spinner />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-600'>
                                    Descrizione
                                </label>
                                <Textarea
                                    rows={"6"}
                                    placeholder='Descrizione'
                                    value={description}
                                    onValueChange={(e) => setDescription(e)}
                                    className='mt-2'
                                ></Textarea>
                                {errors.length > 0 &&
                                    showAlert(errors, "error", "description")}
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-600'>
                                    Prezzo
                                </label>

                                <CurrencyInput
                                    id='validationCustom01'
                                    name='input-1'
                                    value={price}
                                    onValueChange={(e) => setPrice(e)}
                                    placeholder='Prezzo'
                                    className='tremor-TextInput-root relative items-center min-w-[10rem] outline-none rounded-tremor-default transition duration-100 border shadow-tremor-input dark:shadow-dark-tremor-input bg-tremor-background dark:bg-dark-tremor-background hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-muted text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis dark:border-dark-tremor-border mt-2 block   border-gray-300 focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted :dark:border-dark-tremor-brand-subtle focus:dark:ring-dark-tremor-brand-muted sm:text-sm focus:ring-2'
                                    prefix={"€"}
                                    step={1}
                                />
                                {errors.length > 0 &&
                                    showAlert(errors, "error", "price")}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <div className='rounded-md border border-gray-200 bg-white'>
                        <div className='border-b border-gray-200 py-4 px-6'>
                            <span className='text-lg font-medium'>Stato</span>
                        </div>
                        <div className='flex flex-col gap-6 p-6'>
                            <Select
                                className='max-w-full sm:max-w-xs'
                                value={status}
                                onValueChange={handleStatus}
                            >
                                <SelectItem value={options[0]}>
                                    {options[0]}
                                </SelectItem>
                                <SelectItem value={options[1]}>
                                    {options[1]}
                                </SelectItem>
                            </Select>
                            {errors.length > 0 &&
                                showAlert(errors, "error", "status")}
                        </div>
                    </div>
                    <div className='rounded-md border border-gray-200 bg-white'>
                        <div className='border-b border-gray-200 py-4 px-6'>
                            <span className='text-lg font-medium'>Negozio</span>
                        </div>
                        <div className='flex flex-col gap-6 p-6'>
                            <Select
                                className='max-w-full sm:max-w-xs'
                                value={store}
                                onValueChange={handleStore}
                                placeholder='Scegli...'
                            >
                                {stores?.map((store, index) => (
                                    <SelectItem key={index} value={store._id}>
                                        {store.name}
                                    </SelectItem>
                                ))}
                            </Select>
                            {errors.length > 0 &&
                                showAlert(errors, "error", "store")}
                        </div>
                    </div>
                    <div className='rounded-md border border-gray-200 bg-white'>
                        <div className='border-b border-gray-200 py-4 px-6'>
                            <span className='text-lg font-medium'>
                                Produttore
                            </span>
                        </div>
                        <div className='flex flex-col gap-6 p-6'>
                            <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                <TextInput
                                    value={seller}
                                    onValueChange={(e) => onChangeSuggestion(e)}
                                    type='text'
                                    placeholder='Inserisci...'
                                />

                                <div className='absolute z-10 w-full'>
                                    <ul
                                        className={`${
                                            suggestions.length === 0
                                                ? "hidden"
                                                : ""
                                        } divide-y overflow-y-auto outline-none rounded-tremor-default max-h-[228px] left-0 border my-1 bg-tremor-background border-tremor-border divide-tremor-border shadow-tremor-dropdown dark:bg-dark-tremor-background dark:border-dark-tremor-border dark:divide-dark-tremor-border dark:shadow-dark-tremor-dropdown`}
                                        id='seller'
                                    >
                                        {suggestions.map(({ seller, _id }) => (
                                            <li
                                                className='tremor-SelectItem-root flex justify-start items-center cursor-default text-tremor-default px-2.5 py-2.5 ui-active:bg-tremor-background-muted ui-active:text-tremor-content-strong ui-selected:text-tremor-content-strong ui-selected:bg-tremor-background-muted text-tremor-content-emphasis dark:ui-active:bg-dark-tremor-background-muted dark:ui-active:text-dark-tremor-content-strong dark:ui-selected:text-dark-tremor-content-strong dark:ui-selected:bg-dark-tremor-background-muted dark:text-dark-tremor-content-emphasis'
                                                onClick={() => {
                                                    setSeller(seller);
                                                    setSuggestions([]);
                                                }}
                                                key={_id}
                                            >
                                                {seller}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {errors.length > 0 &&
                                    showAlert(errors, "error", "seller")}
                            </div>
                        </div>
                    </div>
                    <div className='rounded-md border border-gray-200 bg-white'>
                        <div className='border-b border-gray-200 py-4 px-6'>
                            <span className='text-lg font-medium'>
                                Categoria
                            </span>
                        </div>
                        <div className='flex flex-col gap-6 p-6'>
                            <Select
                                value={category}
                                onValueChange={(e) => setCategory(e)}
                                placeholder='Scegli...'
                            >
                                {categories?.map((category, i) => (
                                    <SelectItem key={i} value={category._id}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </Select>

                            {propertiesToFill.length > 0 &&
                                propertiesToFill.map((p, i) => (
                                    <div key={i}>
                                        <label className='block text-sm font-medium text-gray-600 mb-2'>
                                            {p.name}
                                        </label>
                                        {p.values.includes("") ? (
                                            <TextInput
                                                value={
                                                    productProperties[p.name]
                                                }
                                                onValueChange={(e) =>
                                                    setProductProp(p.name, e)
                                                }
                                                type='text'
                                            />
                                        ) : !p.multi ? (
                                            <div>
                                                <Select
                                                    value={
                                                        productProperties[
                                                            p.name
                                                        ]
                                                    }
                                                    onChange={(e) =>
                                                        setProductProp(
                                                            p.name,
                                                            e
                                                        )
                                                    }
                                                >
                                                    {p.values.map((v, i) => (
                                                        <SelectItem
                                                            key={i}
                                                            value={v}
                                                        >
                                                            {v}
                                                        </SelectItem>
                                                    ))}
                                                </Select>
                                            </div>
                                        ) : (
                                            <div>
                                                <MultiSelect
                                                    defaultValue={
                                                        productProperties[
                                                            p.name
                                                        ]
                                                    }
                                                    placeholder='Seleziona...'
                                                    onValueChange={(e) =>
                                                        setMultiProp(e, p.name)
                                                    }
                                                >
                                                    {obj.map(
                                                        (
                                                            { value, label },
                                                            id
                                                        ) => (
                                                            <MultiSelectItem
                                                                key={id}
                                                                value={value}
                                                            >
                                                                {label}
                                                            </MultiSelectItem>
                                                        )
                                                    )}
                                                </MultiSelect>
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AddProductForm;

AddProductForm.propTypes = {
    setDirty: PropTypes.func,
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    images: PropTypes.array,
    category: PropTypes.string,
    status: PropTypes.string,
    seller: PropTypes.string,
    store: PropTypes.string,
    properties: PropTypes.object,
};
