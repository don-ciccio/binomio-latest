import { Flex, Icon, Divider } from "@tremor/react";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { useGetStores } from "@/store/react-query/hooks/useQueries";
import { Link } from "react-router-dom";
import TableLoader from "@/components/common/TableLoader";

const Booking = () => {
    const { data: stores, isLoading } = useGetStores();

    return (
        <>
            {isLoading ? (
                <TableLoader />
            ) : (
                <>
                    {stores?.map((store, index) => (
                        <div
                            key={index}
                            className='h-full w-full bg-gray-50 px-3 py-5 xl:px-20 xl:py-12'
                        >
                            <Flex
                                className='w-full justify-between'
                                justifyContent='start'
                                alignItems='center'
                            >
                                <div className='flex items-center'>
                                    <h3 className='text-xl font-semibold text-gray-900'>
                                        {store.name}
                                    </h3>
                                    <Icon
                                        icon={InformationCircleIcon}
                                        variant='simple'
                                        tooltip={store.name}
                                    />
                                </div>

                                <div>
                                    <Link
                                        className='hidden p-2 rounded border border-gray-300 bg-white px-8 text-base font-medium text-gray-700 transition-all hover:border-blue-500 hover:bg-blue-500 hover:text-white sm:block'
                                        to={`${store._id}`}
                                    >
                                        Gestisci
                                    </Link>
                                </div>
                            </Flex>
                            <div className='w-full rounded-md border border-gray-200 bg-white mt-6'>
                                <div className='border-b border-gray-200 py-4 px-6 flex items-center justify-between'>
                                    <span className='text-xl font-medium'>
                                        Prenotazioni
                                    </span>
                                </div>

                                <div className='flex flex-col px-6 pt-6'>
                                    <div>
                                        <label className='block font-medium mb-3'>
                                            Elenco prenotazioni
                                        </label>
                                        <span className='block text-sm text-gray-500'>
                                            TODO
                                        </span>
                                    </div>
                                    <Divider />
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </>
    );
};

export default Booking;
