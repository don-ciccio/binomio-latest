import PropTypes from "prop-types";
import { Icon } from "@iconify/react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { useGetCategories } from "@/store/react-query/hooks/useQueries";

import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API_URL;

const AddCategoryForm = ({
    _id,
    name: existingTitle,
    parent: existingParent,
    properties: existingProperties,
}) => {
    const [name, setName] = useState(existingTitle || "");
    const [parent, setParent] = useState(existingParent || "");
    const [properties, setProperties] = useState(existingProperties || []);

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

    const addProperty = () => {
        setProperties((prev) => {
            return [...prev, { name: "", values: "" }];
        });
    };

    const handlePropertyNameChange = (index, property, newName) => {
        setProperties((prev) => {
            const properties = [...prev];
            properties[index].name = newName;
            return properties;
        });
    };

    const handlePropertyValueChange = (index, property, newValues) => {
        setProperties((prev) => {
            const properties = [...prev];
            properties[index].values = newValues.split(",");
            return properties;
        });
    };

    const removeProperty = (index) => {
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
            properties: properties.map((p) => ({
                name: p.name,
                values: p.values,
            })),
        };

        if (_id) {
            mutationPut.mutate({ data: data, _id: _id });
        } else {
            mutationPost.mutate({ data: data });
        }
    };
    return (
        <form onSubmit={saveCategory}>
            <div className='grid grid-cols-1 gap-5'>
                <div className='flex flex-col gap-5'>
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Caratteristiche Categoria
                            </h3>
                        </div>
                        <div className='flex flex-col gap-5.5 p-6.5'>
                            <div>
                                <label className='mb-3 block text-black dark:text-white'>
                                    Titolo
                                </label>
                                <input
                                    type='text'
                                    placeholder='Nome Categoria'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-gray py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                />
                            </div>
                        </div>
                        <div className='flex flex-col  p-6.5'>
                            <label className='mb-3 block text-black dark:text-white'>
                                Collezione
                            </label>
                            <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                <select
                                    value={parent}
                                    onChange={(e) => setParent(e.target.value)}
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
                        </div>
                    </div>
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Proprietà
                            </h3>
                        </div>
                        <div className='flex flex-col gap-5.5 p-6.5'>
                            <div className='mb-6 flex  gap-5 flex-col items-start'>
                                <button
                                    type='button'
                                    onClick={() => addProperty()}
                                    className='flex items-center gap-2 rounded bg-primary py-2 px-4.5 font-medium text-white hover:bg-opacity-80'
                                >
                                    <svg
                                        className='fillCurrent'
                                        width='16'
                                        height='16'
                                        viewBox='0 0 16 16'
                                        fill='#fff'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            d='M15 7H9V1C9 0.4 8.6 0 8 0C7.4 0 7 0.4 7 1V7H1C0.4 7 0 7.4 0 8C0 8.6 0.4 9 1 9H7V15C7 15.6 7.4 16 8 16C8.6 16 9 15.6 9 15V9H15C15.6 9 16 8.6 16 8C16 7.4 15.6 7 15 7Z'
                                            fill=''
                                        ></path>
                                    </svg>
                                    Aggiungi Proprietà
                                </button>
                                {properties.length > 0 &&
                                    properties.map((property, i) => (
                                        <div
                                            className='w-full flex flex-row gap-4'
                                            key={i}
                                        >
                                            <input
                                                className='w-full rounded-lg border-[1.5px] border-stroke bg-gray py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                type='text'
                                                onChange={(e) =>
                                                    handlePropertyNameChange(
                                                        i,
                                                        property,
                                                        e.target.value
                                                    )
                                                }
                                                value={property.name}
                                                placeholder='nome'
                                            />
                                            <input
                                                className='w-full rounded-lg border-[1.5px] border-stroke bg-gray py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                type='text'
                                                onChange={(e) =>
                                                    handlePropertyValueChange(
                                                        i,
                                                        property,
                                                        e.target.value
                                                    )
                                                }
                                                value={property.values}
                                                placeholder='valori, multipli con la virgola'
                                            />
                                            <button
                                                className='justify-center rounded bg-danger py-2 px-3.5 font-medium text-gray hover:bg-opacity-95'
                                                onClick={() =>
                                                    removeProperty(i)
                                                }
                                                type='button'
                                            >
                                                <Icon
                                                    className='w-6 h-6'
                                                    icon={
                                                        "fluent:delete-24-regular"
                                                    }
                                                />
                                            </button>
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
            </div>
        </form>
    );
};

export default AddCategoryForm;

AddCategoryForm.propTypes = {
    _id: PropTypes.string,
    name: PropTypes.string,
    parent: PropTypes.string,
    properties: PropTypes.array,
};
