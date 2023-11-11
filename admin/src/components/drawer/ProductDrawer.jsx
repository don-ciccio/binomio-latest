import React, { useState } from "react";
import Title from "../form/Title";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useForm } from "react-hook-form";
import LabelArea from "@/components/form/LabelArea";
import Error from "@/components/form/Error";

import {
    Button,
    Input,
    TableCell,
    TableContainer,
    TableHeader,
    Textarea,
    Table,
} from "@windmill/react-ui";

//internal import

const ProductDrawer = ({ id }) => {
    const [tapValue, setTapValue] = useState("Basic Info");
    const {
        register,
        handleSubmit,
        setValue,
        clearErrors,
        formState: { errors },
    } = useForm();
    return (
        <>
            <div className='w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'>
                {id ? (
                    <Title
                        title={"Modifica Prodotto"}
                        description={"Modifica le informazioni del prodotto"}
                    />
                ) : (
                    <Title
                        title={"Aggiungi Prodotto"}
                        description={
                            "Aggiungi il prodotto e le informazioni necessarie qui"
                        }
                    />
                )}
            </div>
            <Scrollbars className='track-horizontal thumb-horizontal w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200'>
                <form className='block' id='block'>
                    {tapValue === "Basic Info" && (
                        <div className='px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32'>
                            <div className='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'>
                                <LabelArea label={"Titolo/Nome Prodotto"} />
                                <div className='col-span-8 sm:col-span-4'>
                                    <Input
                                        {...register(`title`, {
                                            required: "TItle is required!",
                                        })}
                                        className='border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white'
                                        name='title'
                                        type='text'
                                        placeholder={"Titolo"}
                                    />
                                    <Error errorName={errors.title} />
                                </div>
                            </div>
                            <div className='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'>
                                <LabelArea label={"Descrizione"} />
                                <div className='col-span-8 sm:col-span-4'>
                                    <Textarea
                                        className='border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white'
                                        {...register("description", {
                                            required: false,
                                        })}
                                        name='description'
                                        placeholder={"Descrizione"}
                                        rows='4'
                                        spellCheck='false'
                                    />
                                    <Error errorName={errors.description} />
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </Scrollbars>
        </>
    );
};

export default React.memo(ProductDrawer);
