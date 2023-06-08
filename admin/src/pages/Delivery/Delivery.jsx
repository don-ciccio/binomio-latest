import Breadcrumb from "@/components/common/BreadCrumb";
import { useGetStores } from "@/store/react-query/hooks/useQueries";
import Loader from "@/components/common/Loader";
import { Link } from "react-router-dom";

const Delivery = () => {
    const { data: stores, isLoading } = useGetStores();

    return (
        <>
            <Breadcrumb pageName='Delivery' />
            <div className='flex flex-col gap-5'>
                <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                    <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                        <h3 className='font-medium text-black dark:text-white'>
                            Sede
                        </h3>
                    </div>
                    {isLoading ? (
                        <div className='flex items-center justify-center h-screen'>
                            <Loader />
                        </div>
                    ) : (
                        <div className='flex flex-col gap-5.5 p-6.5'>
                            <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                {stores?.map(({ _id, name }) => (
                                    <Link
                                        to={_id}
                                        className='flex justify-center rounded border bg-white border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white'
                                        key={_id}
                                    >
                                        {name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Delivery;
