import { Flex, Icon } from "@tremor/react";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import StoresTable from "@/components/storeTable/StoreTable";
import { useGetStores } from "@/store/react-query/hooks/useQueries";
import { Link } from "react-router-dom";

const Stores = () => {
    const { data: stores, isLoading } = useGetStores();

    return (
        <div className='h-full w-full bg-gray-50 px-3 py-5 xl:px-20 xl:py-12'>
            <Flex
                className='w-full justify-between'
                justifyContent='start'
                alignItems='center'
            >
                <div className='flex items-center'>
                    <h3 className='text-xl font-semibold text-gray-900'>
                        Sedi
                    </h3>
                    <Icon
                        icon={InformationCircleIcon}
                        variant='simple'
                        tooltip='Mostra sedi'
                    />
                </div>

                <div>
                    <Link
                        className='hidden p-2 rounded border border-gray-300 bg-white px-8 text-base font-medium text-gray-700 transition-all hover:border-blue-500 hover:bg-blue-500 hover:text-white sm:block'
                        to={"add"}
                    >
                        Aggiungi sede
                    </Link>
                </div>
            </Flex>

            <StoresTable data={stores} isLoading={isLoading} />
        </div>
    );
};

export default Stores;
