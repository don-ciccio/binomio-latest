import PropTypes from "prop-types";
import TableLoader from "@/components/common/TableLoader";
import { Link } from "react-router-dom";

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
                            className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'
                        >
                            <div className='flex flex-row justify-between items-center border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                                <h3 className='font-medium text-black dark:text-white'>
                                    Profilo
                                </h3>
                                <div className='flex'>
                                    <Link
                                        to={`${store._id}`}
                                        className='relative text-sm inline-flex hover:underline hover:text-primary font-medium dark:text-white'
                                    >
                                        Modifica
                                    </Link>
                                </div>
                            </div>
                            <div className='flex flex-col gap-5.5 p-6.5'>
                                <div>
                                    <label className='mb-3 block text-black dark:text-white'>
                                        Nome
                                    </label>
                                    <span>{store.name}</span>
                                </div>
                            </div>
                            <div className='flex flex-col gap-5.5 p-6.5'>
                                <div>
                                    <label className='mb-3 block text-black dark:text-white'>
                                        Indirizzo Aziendale
                                    </label>
                                    <span>
                                        {store.location.formattedAddress}
                                    </span>
                                </div>
                            </div>
                            <div className='flex flex-col gap-5.5 p-6.5'>
                                <div>
                                    <label className='mb-3 block text-black dark:text-white'>
                                        Stato
                                    </label>
                                    <span>
                                        {store.isOpen === true
                                            ? "Attivo"
                                            : "Chiuso"}
                                    </span>
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
