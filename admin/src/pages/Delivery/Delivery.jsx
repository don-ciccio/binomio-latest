import Breadcrumb from "@/components/common/BreadCrumb";
import { useGetStores } from "@/store/react-query/hooks/useQueries";
import { Link } from "react-router-dom";
import TableLoader from "@/components/common/TableLoader";

const Delivery = () => {
    const { data: stores, isLoading } = useGetStores();

    return (
        <>
            <Breadcrumb pageName='Delivery' />

            {isLoading ? (
                <TableLoader />
            ) : (
                <div>
                    {stores?.map((store, index) => (
                        <div
                            key={index}
                            className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'
                        >
                            <div className='flex flex-row justify-between items-center border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                                <h3 className='font-medium text-black dark:text-white'>
                                    {store.name}
                                </h3>
                                <div className='flex'>
                                    <Link
                                        to={`${store._id}`}
                                        className='relative text-sm inline-flex hover:underline hover:text-primary font-medium dark:text-white'
                                    >
                                        Gestione Consegne
                                    </Link>
                                </div>
                            </div>

                            <div className='flex flex-col gap-5.5 p-6.5'>
                                <div>
                                    <label className='mb-3 block text-black dark:text-white'>
                                        Indirizzo di partenza
                                    </label>
                                    <span>
                                        {store.location.formattedAddress}
                                    </span>
                                </div>
                            </div>
                            <div className='flex flex-col gap-5.5 p-6.5'>
                                <div>
                                    <label className='mb-3 block text-black dark:text-white'>
                                        Raggio di Consegna
                                    </label>
                                    <span>{store.deliveryRadius} km</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Delivery;
