import PropTypes from "prop-types";
import TableLoader from "@/components/common/TableLoader";
import { Link } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { Divider, Icon, Badge } from "@tremor/react";
const StoresTable = ({ data, isLoading }) => {
    return (
        <>
            {isLoading ? (
                <TableLoader />
            ) : (
                <div>
                    {data?.map((store, index) => (
                        <div
                            key={index}
                            className='w-full rounded-md border border-gray-200 bg-white mt-6'
                        >
                            <div className='border-b border-gray-200 py-4 px-6 flex items-center justify-between'>
                                <span className='text-xl font-medium'>
                                    Profilo
                                </span>
                                <div className='flex'>
                                    <Link
                                        to={`${store._id}`}
                                        className='relative text-sm inline-flex hover:underline hover:text-primary font-medium dark:text-white'
                                    >
                                        <Icon
                                            icon={PencilSquareIcon}
                                            variant='light'
                                            tooltip='Modifica'
                                            size='sm'
                                        />
                                    </Link>
                                </div>
                            </div>
                            <div className='flex flex-col px-6 pt-6'>
                                <div>
                                    <label className='block font-medium mb-3'>
                                        Nome del negozio
                                    </label>
                                    <span className='block text-gray-500'>
                                        {store.name}
                                    </span>
                                </div>
                                <Divider />
                            </div>

                            <div className='flex flex-col px-6 pt-2'>
                                <div>
                                    <label className='block font-medium mb-3'>
                                        Indirizzo aziendale
                                    </label>
                                    <span className='block text-gray-500'>
                                        {store.location.formattedAddress}
                                    </span>
                                </div>
                                <Divider />
                            </div>
                            <div className='flex flex-col px-6 pt-2 pb-6'>
                                <div>
                                    <label className='block font-medium mb-3'>
                                        Stato
                                    </label>
                                    <Badge
                                        color={
                                            store.isOpen === true
                                                ? "green"
                                                : "red"
                                        }
                                    >
                                        {store.isOpen === true
                                            ? "Aperto"
                                            : "Chiuso"}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default StoresTable;

StoresTable.propTypes = {
    data: PropTypes.array,
    isLoading: PropTypes.bool,
};
