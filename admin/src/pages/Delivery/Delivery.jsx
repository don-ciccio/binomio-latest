import Breadcrumb from "@/components/common/BreadCrumb";
import { useGetStores } from "@/store/react-query/hooks/useQueries";
import Loader from "@/components/common/Loader";
import { useEffect, useState } from "react";
import DeliveryForm from "@/components/DeliveryForm";
import { useWeekdaysStore } from "@/store/zustand/store";

const Delivery = () => {
    const [store, setStore] = useState("");

    const fetchWeekdays = useWeekdaysStore((state) => state.fetch);

    useEffect(() => {
        if (store !== undefined) {
            fetchWeekdays(store);
        }
    }, [fetchWeekdays, store]);

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
                                <select
                                    value={store}
                                    onChange={(e) => setStore(e.target.value)}
                                    className='relative z-20 w-full appearance-none rounded border border-stroke bg-gray py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                >
                                    <option value={""}>Nessuna</option>
                                    {stores?.map((store, i) => (
                                        <option key={i} value={store._id}>
                                            {store.name}
                                        </option>
                                    ))}
                                </select>
                                <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2'>
                                    <svg
                                        className='fill-current'
                                        width='24'
                                        height='24'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <g opacity='0.8'>
                                            <path
                                                fillRule='evenodd'
                                                clipRule='evenodd'
                                                d='M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z'
                                                fill=''
                                            ></path>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    )}
                </div>
                {store && store.length > 0 ? <DeliveryForm /> : null}
            </div>
        </>
    );
};

export default Delivery;
