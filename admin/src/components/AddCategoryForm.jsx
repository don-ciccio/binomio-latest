import PropTypes from "prop-types";

import Spinner from "./common/Spinner";

import { ReactSortable } from "react-sortablejs";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { Fragment, useState } from "react";
import { useGetCategories } from "@/store/react-query/hooks/useQueries";

import {
    TextInput,
    Textarea,
    Button,
    Icon as TremorIcon,
    Dialog,
    DialogPanel,
    Title,
} from "@tremor/react";

import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Icon } from "@iconify/react";

import { Select, SelectItem } from "@tremor/react";

import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API_URL;

const AddCategoryForm = ({
    setDirty,
    _id,
    name: existingTitle,
    parent: existingParent,
    properties: existingProperties,
    images: existingImages,
    description: existingDescription,
}) => {
    const [name, setName] = useState(existingTitle || "");
    const [parent, setParent] = useState(existingParent || "");
    const [properties, setProperties] = useState(existingProperties || []);
    const [images, setImages] = useState(existingImages || []);
    const [description, setDescription] = useState(existingDescription || "");
    const [isButtonShown, setIsButtonShown] = useState(null);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const markFormDirty = () => setDirty(true);

    const resetState = () => {
        setDirty(false);
        setIsOpen(false);
        setName(existingTitle);
        setParent(existingParent);
        setDescription(existingDescription);
        setProperties(existingProperties);
        setImages(existingImages);

        setIsButtonShown(null);
    };

    const resetHandler = (e) => {
        e.preventDefault();
        setIsOpen(true);
    };

    const { data: categories } = useGetCategories({ search: "" });

    const history = useNavigate();
    const queryClient = useQueryClient();

    const redirect = window.location.search
        ? window.location.search.split("=")[1]
        : "/categories";

    const mutationPut = useMutation({
        mutationFn: ({ data, _id }) => {
            return axios.put(`${API_URL}/api/admin/category`, { ...data, _id });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            history(redirect);
        },
    });

    const mutationPost = useMutation({
        mutationFn: ({ data }) => {
            return axios.post(`${API_URL}/api/admin/category/new`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            history(redirect);
        },
    });

    const clickHandler = (index) => {
        setIsButtonShown((prev) => {
            return prev === index ? null : index;
        });
    };

    const deleteImages = async (e) => {
        e.preventDefault();
        setDirty(true);
        const removed = images[isButtonShown].toString();

        if (isFormSubmitted) {
            await axios.delete(`${API_URL}/api/categories/upload`, {
                data: { url: removed },
                headers: { "Content-Type": "application/json" },
            });
        }

        setImages((currentImg) =>
            currentImg.filter((img, i) => i !== isButtonShown)
        );

        queryClient.invalidateQueries({ queryKey: ["categories"] });
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
                    `${API_URL}/api/categories/upload`,
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

    const addProperty = () => {
        setDirty(true);
        setProperties((prev) => {
            return [...prev, { name: "", values: "", multi: false }];
        });
    };

    const handleParent = (event) => {
        setDirty(true);
        setParent(event);
    };

    const handlePropertyNameChange = (index, property, newName) => {
        setDirty(true);
        setProperties((prev) => {
            const properties = [...prev];
            properties[index].name = newName;
            return properties;
        });
    };

    const handlePropertyMultiChange = (index, newMulti) => {
        setDirty(true);
        setProperties((prev) => {
            const properties = [...prev];
            properties[index].multi = newMulti;
            return properties;
        });
    };

    const handlePropertyValueChange = (index, property, newValues) => {
        setDirty(true);
        setProperties((prev) => {
            const properties = [...prev];
            properties[index].values = newValues.split(",");
            return properties;
        });
    };

    const removeProperty = (index) => {
        setDirty(true);
        setProperties((prev) => {
            const properties = [...prev];
            return properties.filter((p, pIndex) => {
                return pIndex !== index;
            });
        });
    };

    const saveCategory = async (e) => {
        e.preventDefault();
        const data = {
            name,
            parent,
            description,
            images,
            properties: properties.map((p) => ({
                name: p.name,
                values: p.values,
                multi: p.multi,
            })),
        };

        if (_id) {
            mutationPut.mutate({ data: data, _id: _id });
        } else {
            mutationPost.mutate({ data: data });
        }
        setIsFormSubmitted(true);
    };

    return (
        <form
            id='category-form'
            onChange={markFormDirty}
            onSubmit={saveCategory}
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
                            Rimuovi modifiche
                        </Button>
                    </div>
                </DialogPanel>
            </Dialog>

            <div className='grid grid-cols-1 gap-5'>
                <div className='flex flex-col gap-5'>
                    <div className='flex md:flex-row flex-col gap-5'>
                        <div className='w-full rounded-md border border-gray-200 bg-white'>
                            <div className='border-b border-gray-200 py-4 px-6'>
                                <span className='text-lg font-medium'>
                                    Caratteristiche Categoria
                                </span>
                            </div>
                            <div className='flex flex-col gap-6 p-6'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-600'>
                                        Titolo
                                    </label>
                                    <TextInput
                                        className='mt-2 max-w-full'
                                        type='text'
                                        placeholder='Titolo'
                                        value={name}
                                        onValueChange={(e) => setName(e)}
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col gap-2 p-6'>
                                <label className='block text-sm font-medium text-gray-600'>
                                    Collezione
                                </label>
                                <div className='flex flex-col'>
                                    <Select
                                        className='max-w-full'
                                        value={parent}
                                        onValueChange={handleParent}
                                        placeholder='Scegli...'
                                    >
                                        {categories?.map((category, i) => (
                                            <SelectItem
                                                key={i}
                                                value={category._id}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className='w-full rounded-md border border-gray-200 bg-white'>
                            <div className='border-b border-gray-200 py-4 px-6'>
                                <span className='text-lg font-medium'>
                                    Immagine
                                </span>
                            </div>
                            <div className='lex flex-col gap-2 p-6'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-600'>
                                        Aggiungi immagine
                                    </label>
                                    <div>
                                        <div className='flex flex-col gap-2.5'>
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
                                                                Clicca per
                                                                effetture
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
                                                        images.map(
                                                            (link, i) => (
                                                                <div
                                                                    className='max-w-[2.75rem] cursor-pointer'
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
                                                                            src={
                                                                                link
                                                                            }
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
                                                                                className='w-4 h-4'
                                                                                icon='iconamoon:close-bold'
                                                                            />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )
                                                        )
                                                    ) : (
                                                        <div className='max-w-[2.75rem] h-11'></div>
                                                    )}
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
                            </div>
                        </div>
                    </div>
                    <div className='w-full rounded-md border border-gray-200 bg-white'>
                        <div className='border-b border-gray-200 py-4 px-6'>
                            <span className='text-lg font-medium'>
                                Descrizione
                            </span>
                        </div>
                        <div className='flex flex-col gap-2 p-6'>
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
                            </div>
                        </div>
                    </div>
                    <div className='w-full rounded-md border border-gray-200 bg-white'>
                        <div className='border-b border-gray-200 py-4 px-6'>
                            <span className='text-lg font-medium'>
                                Proprietà
                            </span>
                        </div>
                        <div className='px-4 py-5 sm:p-6'>
                            <div className='flex flex-col gap-6'>
                                <Button
                                    icon={PlusIcon}
                                    size='lg'
                                    variant='primary'
                                    type='button'
                                    className='max-w-[120px]'
                                    onClick={() => addProperty()}
                                >
                                    Aggiungi
                                </Button>
                                <div className='grid grid-cols-10 gap-6'>
                                    {properties.length > 0 &&
                                        properties.map((property, i) => (
                                            <Fragment key={i}>
                                                <div className='col-span-3'>
                                                    <TextInput
                                                        type='text'
                                                        placeholder='Nome'
                                                        value={property.name}
                                                        onValueChange={(e) =>
                                                            handlePropertyNameChange(
                                                                i,
                                                                property,
                                                                e
                                                            )
                                                        }
                                                    />
                                                </div>

                                                <div className='col-span-5'>
                                                    <TextInput
                                                        type='text'
                                                        placeholder='valori, multipli con la virgola'
                                                        value={property.values}
                                                        onValueChange={(e) =>
                                                            handlePropertyValueChange(
                                                                i,
                                                                property,
                                                                e
                                                            )
                                                        }
                                                    />
                                                    <div className='mt-2 flex items-center'>
                                                        <div className='flex h-5 items-center'>
                                                            <input
                                                                type='checkbox'
                                                                value={
                                                                    property.multi
                                                                }
                                                                onChange={(e) =>
                                                                    handlePropertyMultiChange(
                                                                        i,
                                                                        e.target
                                                                            .checked
                                                                    )
                                                                }
                                                                checked={
                                                                    property.multi
                                                                }
                                                                className='h-4 w-4 rounded border-gray-300 text-blue-700 focus:ring-blue-700'
                                                            />
                                                        </div>
                                                        <div className='ml-2 text-xs sm:text-sm'>
                                                            <label className=' text-gray-500'>
                                                                Selezione
                                                                multipla
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-span-2 mt-0.5'>
                                                    <button
                                                        onClick={() =>
                                                            removeProperty(i)
                                                        }
                                                        type='button'
                                                    >
                                                        <TremorIcon
                                                            icon={TrashIcon}
                                                            variant='outlined'
                                                            tooltip='Elimina'
                                                            size='sm'
                                                            color='red'
                                                        />
                                                    </button>
                                                </div>
                                            </Fragment>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AddCategoryForm;

AddCategoryForm.propTypes = {
    setDirty: PropTypes.func,
    _id: PropTypes.string,
    name: PropTypes.string,
    parent: PropTypes.string,
    properties: PropTypes.array,
    images: PropTypes.array,
    description: PropTypes.string,
};
