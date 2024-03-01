import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
    TextInput,
    Textarea,
    Dialog,
    DialogPanel,
    Title,
    Button,
} from "@tremor/react";

axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API_URL;

const ContentForm = ({
    setDirty,
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

    const [isModal, setIsModal] = useState(false);

    const markFormDirty = () => setDirty(true);

    const resetHandler = () => {
        setIsModal(true);
    };

    const resetState = () => {
        setDirty(false);
        setIsModal(false);
        setTopbar(existingTopbar);
        setHeroTitle(existingTitle);
        setHeroDescription(existingDescription);
    };

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
        <form
            id='content-form'
            onChange={markFormDirty}
            onReset={resetHandler}
            onSubmit={saveContent}
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
                            Anulla modifiche
                        </Button>
                    </div>
                </DialogPanel>
            </Dialog>
            <div className='grid grid-cols-1 gap-5'>
                <div className='flex flex-col gap-5'>
                    <div className='w-full rounded-md border border-gray-200 bg-white'>
                        <div className='border-b border-gray-200 py-4 px-6'>
                            <span className='text-lg font-medium'>
                                Contenuti Homepage
                            </span>
                        </div>
                        <div className='flex flex-col gap-2 p-6'>
                            <div>
                                <label className='block text-sm font-medium text-gray-600'>
                                    Barra avvisi
                                </label>
                                <TextInput
                                    className='mt-2 max-w-sm'
                                    type='text'
                                    placeholder='Messaggio barra avvisi'
                                    value={topbar}
                                    onValueChange={(e) => setTopbar(e)}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 px-6 pt-6'>
                            <div>
                                <label className='block text-sm font-medium text-gray-600'>
                                    Sezione Hero
                                </label>
                                <TextInput
                                    className='mt-2 max-w-md'
                                    type='text'
                                    placeholder='Titolo Hero'
                                    value={heroTitle}
                                    onValueChange={(e) => setHeroTitle(e)}
                                />
                            </div>
                            <div>
                                <Textarea
                                    type='text'
                                    placeholder='Descrizione Hero'
                                    value={heroDescription}
                                    onValueChange={(e) => setHeroDescription(e)}
                                    className='mb-8'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ContentForm;

ContentForm.propTypes = {
    setDirty: PropTypes.func,
    _id: PropTypes.string,
    topbar: PropTypes.string,
    heroTitle: PropTypes.string,
    heroDescription: PropTypes.string,
};
