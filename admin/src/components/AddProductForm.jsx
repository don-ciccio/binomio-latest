import PropTypes from "prop-types";
import { useState } from "react";
import { useGetCategories } from "@/store/react-query/hooks/useQueries";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Select from "react-select";
import { ReactSortable } from "react-sortablejs";

import axios from "axios";
import Spinner from "./common/Spinner";
import { useGetStores } from "../store/react-query/hooks/useQueries";
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

const AddProductForm = ({
    _id,
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
    const [isUploading, setIsUploading] = useState(false);
    const [name, setName] = useState(existingTitle || "");
    const [category, setCategory] = useState(existingCategory || "");
    const [status, setStatus] = useState(previousStatus || "Attivo");
    const [seller, setSeller] = useState(assignedSeller || "");
    const [store, setStore] = useState(assignedStore || "");

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
            queryClient.invalidateQueries({ queryKey: ["products"] });
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
        setStatus(event.target.value);
    };

    const saveProduct = async (e) => {
        e.preventDefault();
        if (Object.keys(multiProperty).length === 0) {
            const data = {
                name,
                description,
                price,
                images,
                category,
                seller,
                status,
                store,
                properties: productProperties,
            };
            if (_id) {
                mutationPut.mutate({ data: data, _id: _id });
            } else {
                mutationPost.mutate({ data: data });
            }
            setIsFormSubmitted(true);
        } else {
            const data = {
                name,
                description,
                price,
                images,
                category,
                seller,
                status,
                store,
                properties: multiProperty,
            };
            if (_id) {
                mutationPut.mutate({ data: data, _id: _id });
            } else {
                mutationPost.mutate({ data: data });
            }
            setIsFormSubmitted(true);
        }
    };

    const deleteImages = async (e) => {
        e.preventDefault();
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
        setProductProperties((prev) => {
            const newProductProps = { ...prev };
            newProductProps[propName] = value;
            return newProductProps;
        });
    };

    const setMultiProp = (e, name) => {
        setMultiProperty((prev) => {
            const newProductProps = { ...prev };

            newProductProps[name] = e.map((a) => a.value);
            return newProductProps;
        });
    };
    console.log(multiProperty);
    const propertiesToFill = [];
    let obj = [];
    if (isSuccess && category) {
        let catInfo = categories
            .filter(({ _id }) => _id === category)
            .map((c) => c.properties);

        let catParent = categories.filter(({ _id }) => _id === category);
        propertiesToFill.push(...catInfo);
        obj = propertiesToFill[0][0]?.values.map((str) => ({
            value: str,
            label: str,
        }));

        while (catParent?.parent?._id) {
            const parentCat = categories.filter(
                ({ _id }) => _id === catParent?.parent?._id
            );
            propertiesToFill.push(...parentCat);
            catInfo = parentCat;
        }
    }

    const onChangeSuggestion = async (e) => {
        setSeller(e.target.value);
        let data = await getSuggestion(e.target.value);
        setSuggestions(data);
    };

    return (
        <form onSubmit={saveProduct}>
            <div className='grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-3'>
                <div className='sm:col-span-2 flex flex-col gap-5'>
                    {/* <!-- Input Fields --> */}
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Caratteristiche Prodotto
                            </h3>
                        </div>
                        <div className='flex flex-col gap-5.5 p-6.5'>
                            <div>
                                <label className='mb-3 block text-black dark:text-white'>
                                    Titolo
                                </label>
                                <input
                                    type='text'
                                    placeholder='Titolo'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-gray py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                />
                            </div>
                            <div className='mb-5'>
                                <label className='mb-2.5 block  text-black dark:text-white'>
                                    Aggiungi immagine
                                </label>
                                <div>
                                    <div className='flex flex-col'>
                                        <div
                                            id='FileUpload'
                                            className='relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5'
                                        >
                                            <input
                                                type='file'
                                                onChange={uploadImages}
                                                className='cursor-pointer absolute inset-0 z-50 m-0 h-full w-full p-0 opacity-0 outline-none'
                                            />
                                            <div className='flex flex-col items-center justify-center space-y-3'>
                                                <span className='flex h-11.5 w-11.5 items-center justify-center rounded-full border border-stroke bg-primary/5 dark:border-strokedark'>
                                                    <svg
                                                        width='20'
                                                        height='20'
                                                        viewBox='0 0 20 20'
                                                        fill='none'
                                                        xmlns='http://www.w3.org/2000/svg'
                                                    >
                                                        <g clipPath='url(#clip0_75_12841)'>
                                                            <path
                                                                d='M2.5 15.8333H17.5V17.5H2.5V15.8333ZM10.8333 4.85663V14.1666H9.16667V4.85663L4.1075 9.91663L2.92917 8.73829L10 1.66663L17.0708 8.73746L15.8925 9.91579L10.8333 4.85829V4.85663Z'
                                                                fill='#3C50E0'
                                                            ></path>
                                                        </g>
                                                        <defs>
                                                            <clipPath id='clip0_75_12841'>
                                                                <rect
                                                                    width='20'
                                                                    height='20'
                                                                    fill='white'
                                                                ></rect>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </span>
                                                <p className='text-center text-xs'>
                                                    <span className='text-primary'>
                                                        Clicca per effetture
                                                        l&rsquo;upload
                                                    </span>{" "}
                                                    o trascina l&rsquo;immagine
                                                </p>
                                            </div>
                                        </div>
                                        <div className='flex flex-row flex-wrap items-start gap-1 max-h-18'>
                                            <ReactSortable
                                                list={images}
                                                setList={updateImagesOrder}
                                                className='flex gap-2 group'
                                            >
                                                {!!images?.length &&
                                                    images.map((link, i) => (
                                                        <div
                                                            className='max-w-11 cursor-pointer'
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
                                                                    className='rounded-sm border border-bodydark border-dashed dark:border-strokedark'
                                                                />
                                                                <button
                                                                    onClick={
                                                                        deleteImages
                                                                    }
                                                                    className={`${
                                                                        isButtonShown ===
                                                                        i
                                                                            ? "absolute -right-1 -top-2 bg-danger text-white rounded-full"
                                                                            : "hidden"
                                                                    }`}
                                                                >
                                                                    <Icon
                                                                        className='w-4 h-4'
                                                                        icon='iconamoon:close-bold'
                                                                    />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                            </ReactSortable>
                                            {isUploading && (
                                                <div className='h-6 mt-2 ml-1.5 flex items-center'>
                                                    <Spinner />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className='mb-3 block text-black dark:text-white'>
                                    Descrizione
                                </label>
                                <textarea
                                    rows={6}
                                    placeholder='Descrizione'
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-gray py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                ></textarea>
                            </div>
                            <div>
                                <label className='mb-3 block text-black dark:text-white'>
                                    Prezzo
                                </label>
                                <div className='input-icon input-icon-right'>
                                    <input
                                        type='number'
                                        placeholder='Prezzo'
                                        value={price}
                                        onChange={(e) =>
                                            setPrice(e.target.value)
                                        }
                                        className='w-full rounded-lg border-[1.5px] border-stroke bg-gray py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                    />
                                    <i>€</i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Stato
                            </h3>
                        </div>
                        <div className='flex flex-col gap-5.5 p-6.5'>
                            <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                <select
                                    value={status}
                                    onChange={handleStatus}
                                    className='relative z-20 w-full appearance-none rounded border border-stroke bg-gray py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                >
                                    <option value={options[0]}>
                                        {options[0]}
                                    </option>
                                    <option value={options[1]}>
                                        {options[1]}
                                    </option>
                                </select>
                                <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2'>
                                    <svg
                                        className='fill-current'
                                        width='24'
                                        height='24'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <g opacity='0.8'>
                                            <path
                                                fillRule='evenodd'
                                                clipRule='evenodd'
                                                d='M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z'
                                                fill=''
                                            ></path>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Negozio
                            </h3>
                        </div>
                        <div className='flex flex-col gap-5.5 p-6.5'>
                            <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                <select
                                    value={store}
                                    onChange={(e) => setStore(e.target.value)}
                                    className='relative z-20 w-full appearance-none rounded border border-stroke bg-gray py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                >
                                    <option value=''>Nessuno</option>
                                    {stores?.map((store, index) => (
                                        <option key={index} value={store._id}>
                                            {store.name}
                                        </option>
                                    ))}
                                </select>
                                <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2'>
                                    <svg
                                        className='fill-current'
                                        width='24'
                                        height='24'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <g opacity='0.8'>
                                            <path
                                                fillRule='evenodd'
                                                clipRule='evenodd'
                                                d='M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z'
                                                fill=''
                                            ></path>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Produttore
                            </h3>
                        </div>
                        <div className='flex flex-col gap-5.5 p-6.5'>
                            <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                <input
                                    autoComplete='off'
                                    list='seller'
                                    value={seller}
                                    onChange={(e) => onChangeSuggestion(e)}
                                    type='text'
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-gray py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                />
                                <ul
                                    className={`${
                                        suggestions.length === 0 ? "hidden" : ""
                                    } absolute z-999  rounded-lg border-[1.5px] border-stroke bg-white py-3 px-5 shadow-default dark:border-strokedark dark:bg-boxdark block translate-y-0.5 w-full`}
                                    id='seller'
                                >
                                    {suggestions.map(({ seller, _id }) => (
                                        <li
                                            className='cursor-pointer flex w-full items-center gap-2 rounded-sm py-1.5 pr-4 pl-2 text-left text-sm hover:bg-gray dark:hover:bg-meta-4'
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
                        </div>
                    </div>
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Categoria
                            </h3>
                        </div>
                        <div className='flex flex-col gap-5.5 p-6.5'>
                            <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                <select
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    className='relative z-20 w-full appearance-none rounded border border-stroke bg-gray py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                >
                                    <option value=''>Nessuna</option>
                                    {categories?.map((category, i) => (
                                        <option key={i} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>

                                <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2'>
                                    <svg
                                        className='fill-current'
                                        width='24'
                                        height='24'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <g opacity='0.8'>
                                            <path
                                                fillRule='evenodd'
                                                clipRule='evenodd'
                                                d='M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z'
                                                fill=''
                                            ></path>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                            {propertiesToFill.length > 0 &&
                                propertiesToFill[0].map((p, i) => (
                                    <div
                                        className='relative z-20 bg-transparent dark:bg-form-input'
                                        key={i}
                                    >
                                        <label className='mb-3 block text-black dark:text-white'>
                                            {p.name}
                                        </label>
                                        {p.values.includes("") ? (
                                            <input
                                                className='w-full rounded-lg border-[1.5px] border-stroke bg-gray py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                value={
                                                    productProperties[p.name]
                                                }
                                                onChange={(e) =>
                                                    setProductProp(
                                                        p.name,
                                                        e.target.value
                                                    )
                                                }
                                                type='text'
                                            />
                                        ) : !p.multi ? (
                                            <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                                <select
                                                    className='relative z-20 w-full appearance-none rounded border border-stroke bg-gray py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                    value={
                                                        productProperties[
                                                            p.name
                                                        ]
                                                    }
                                                    onChange={(e) =>
                                                        setProductProp(
                                                            p.name,
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    {p.values.map((v, i) => (
                                                        <option
                                                            key={i}
                                                            value={v}
                                                        >
                                                            {v}
                                                        </option>
                                                    ))}
                                                </select>
                                                <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2'>
                                                    <svg
                                                        className='fill-current'
                                                        width='24'
                                                        height='24'
                                                        viewBox='0 0 24 24'
                                                        fill='none'
                                                        xmlns='http://www.w3.org/2000/svg'
                                                    >
                                                        <g opacity='0.8'>
                                                            <path
                                                                fillRule='evenodd'
                                                                clipRule='evenodd'
                                                                d='M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z'
                                                                fill=''
                                                            ></path>
                                                        </g>
                                                    </svg>
                                                </span>
                                            </div>
                                        ) : (
                                            <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                                <Select
                                                    className='relative z-20 w-full rounded border border-stroke bg-gray py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                    isMulti
                                                    unstyled
                                                    defaultValue={obj.filter(
                                                        (f) =>
                                                            productProperties[
                                                                p.name
                                                            ]?.indexOf(
                                                                f.value
                                                            ) !== -1
                                                    )}
                                                    options={obj}
                                                    placeholder='Seleziona...'
                                                    onChange={(e) =>
                                                        setMultiProp(e, p.name)
                                                    }
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
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
        </form>
    );
};

export default AddProductForm;

AddProductForm.propTypes = {
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
