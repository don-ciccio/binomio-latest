import AddProductForm from "@/components/AddProductForm";
import Loader from "@/components/common/Loader";
import { Metric, Callout, Button } from "@tremor/react";
import { useGetProductById } from "@/store/react-query/hooks/useQueries";
import { useParams } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

const Edit = () => {
    const { id } = useParams();
    const [dirty, setDirty] = useState(false);

    const { data: product, isLoading } = useGetProductById(id);

    if (isLoading)
        return (
            <div className='flex items-center justify-center h-screen'>
                <Loader />
            </div>
        );

    return (
        <>
            <div className={`fixed top-0 left-0 right-0 z-50 px-1`}>
                <div
                    className={`w-full transition-all duration-300 ${
                        !dirty ? "opacity-0" : "opacity-100"
                    }`}
                >
                    <Callout
                        className='items-center flex-row justify-between mt-0 h-11'
                        title='Modifiche non salvate'
                        icon={ExclamationCircleIcon}
                        color={"gray"}
                    >
                        <span
                            className={`flex items-center gap-2.5 pb-2 ${
                                !dirty ? "hidden" : ""
                            }`}
                        >
                            <Button
                                form='product-form'
                                size='xs'
                                variant='primary'
                                color='rose'
                                type='reset'
                            >
                                Rimuovi
                            </Button>

                            <Button
                                form='product-form'
                                size='xs'
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
            <div className='px-3 py-5 xl:px-20 xl:py-12'>
                <div className='flex p-1 mb-4'>
                    <Metric>{product?.data.product.name}</Metric>
                </div>
                <AddProductForm
                    {...product?.data.product}
                    setDirty={setDirty}
                />
            </div>
        </>
    );
};

export { Edit as EditProduct };
