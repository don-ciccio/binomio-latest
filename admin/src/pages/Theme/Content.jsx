import TableLoader from "@/components/common/TableLoader";

import { Callout, Button } from "@tremor/react";

import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

import ContentForm from "@/components/ContentForm";
import { useGetContent } from "@/store/react-query/hooks/useQueries";
import { useState } from "react";

const Content = () => {
    const { data, isLoading } = useGetContent();
    const [dirty, setDirty] = useState(false);

    if (isLoading)
        return (
            <div className='flex items-center justify-center h-screen'>
                <TableLoader />
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
                                form='content-form'
                                size='xs'
                                variant='primary'
                                color='rose'
                                type='reset'
                            >
                                Rimuovi
                            </Button>

                            <Button
                                form='content-form'
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
            <div className='h-full w-full bg-gray-50 px-3 py-5 xl:px-20 xl:py-12'>
                <ContentForm {...data?.data.content} setDirty={setDirty} />
            </div>
        </>
    );
};

export default Content;
