import { useParams } from "react-router-dom";
import { useGetUserById } from "../../store/react-query/hooks/useQueries";
import Loader from "@/components/common/Loader";
import { Metric, Badge } from "@tremor/react";
import { formatCurrency } from "../../utils";

const View = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetUserById(id);

    console.log(data?.data);
    if (isLoading)
        return (
            <div className='flex items-center justify-center h-screen'>
                <Loader />
            </div>
        );

    return (
        <div className='px-3 xl:px-20 py-12'>
            <div className='flex p-1 mb-4'>
                <Metric>{data?.data.user[0].name}</Metric>
            </div>
            <div className='grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-3'>
                <div className='sm:col-span-2 flex flex-col gap-5'>
                    <div className='w-full rounded-md border border-gray-200 bg-white px-4'>
                        <div className='flex flex-row justify-around items-center text-sm'>
                            <div className='flex grow justify-start'>
                                <span className='h-12 w-12 rounded-full'>
                                    <img
                                        src={data?.data.user[0].avatar}
                                        alt='User'
                                    />
                                </span>
                            </div>
                            <div className='flex flex-initial'>
                                <div className='p-4'>
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex items-center justify-center text-[#374151]'>
                                            Importo speso
                                        </div>
                                        <div className='flex items-center justify-center font-medium  text-zinc-600'>
                                            {formatCurrency(
                                                data?.data.user[0].totalCost
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='p-4'>
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex items-center justify-center text-[#374151]'>
                                            Ordini
                                        </div>
                                        <div className='flex items-center justify-center font-medium  text-zinc-600'>
                                            {
                                                data?.data.user[0]
                                                    .number_of_orders
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { View as ViewCustomer };
