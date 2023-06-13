import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API_URL;

const ContentForm = ({
    _id,
    topbar: existingTopbar,
    heroTitle: existingTitle,
    heroDescription: existingDescription,
}) => {
    const history = useNavigate();
    const [topbar, setTopbar] = useState(existingTopbar || "");
    const [heroTitle, setHeroTitle] = useState(existingTitle || "");
    const [heroDescription, setHeroDescription] = useState(
        existingDescription || ""
    );

    const queryClient = useQueryClient();

    const mutationPost = useMutation({
        mutationFn: ({ data }) => {
            return axios.post(`${API_URL}/api/admin/content`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["content"] });
            history(-1);
        },
    });

    const mutationPut = useMutation({
        mutationFn: ({ data, _id }) => {
            return axios.put(`${API_URL}/api/admin/content?id=${_id}`, {
                ...data,
                _id,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["content"] });
            history(-1);
        },
    });

    const saveContent = async (e) => {
        e.preventDefault();
        const data = {
            topbar,
            heroTitle,
            heroDescription,
        };

        if (_id) {
            // update
            mutationPut.mutate({ data: data, _id: _id });
        } else {
            mutationPost.mutate({ data: data });
        }
    };

    return (
        <form onSubmit={saveContent}>
            <div className='grid grid-cols-1 gap-5'>
                <div className='flex flex-col gap-5'>
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Contenuti Homepage
                            </h3>
                        </div>
                        <div className='flex flex-col gap-5.5 p-6.5'>
                            <div>
                                <label className='mb-3 block text-black dark:text-white'>
                                    Barra avvisi
                                </label>
                                <input
                                    type='text'
                                    placeholder='Messaggio barra avvisi'
                                    value={topbar}
                                    onChange={(e) => setTopbar(e.target.value)}
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-gray py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                />
                            </div>
                        </div>
                        <div className='flex flex-col gap-5.5 p-6.5'>
                            <div>
                                <label className='mb-3 block text-black dark:text-white'>
                                    Sezione Hero
                                </label>
                                <input
                                    type='text'
                                    placeholder='Titolo Hero'
                                    value={heroTitle}
                                    onChange={(e) =>
                                        setHeroTitle(e.target.value)
                                    }
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-gray py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                />
                            </div>
                            <div>
                                <textarea
                                    type='text'
                                    placeholder='Descrizione Hero'
                                    value={heroDescription}
                                    onChange={(e) =>
                                        setHeroDescription(e.target.value)
                                    }
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-gray py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
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
    );
};

export default ContentForm;

ContentForm.propTypes = {
    _id: PropTypes.string,
    topbar: PropTypes.string,
    heroTitle: PropTypes.string,
    heroDescription: PropTypes.string,
};
