import AddProductForm from "@/components/AddProductForm";
import { useState } from "react";
import { Callout, Button } from "@tremor/react";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

const Add = () => {
    const [dirty, setDirty] = useState(false);
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
            <div className='h-full w-full bg-gray-50 px-3 xl:px-20 py-12'>
                <AddProductForm setDirty={setDirty} />
            </div>
        </>
    );
};

export { Add as AddProduct };
