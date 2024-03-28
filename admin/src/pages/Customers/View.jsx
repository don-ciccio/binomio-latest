import { Link, useParams } from "react-router-dom";
import { useGetUserById } from "../../store/react-query/hooks/useQueries";
import Loader from "@/components/common/Loader";
import { Metric, Card } from "@tremor/react";
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
                            <div className='flex flex-initial border-x'>
                                <div className='p-4'>
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex items-center justify-center font-medium text-zinc-800'>
                                            Importo speso
                                        </div>
                                        <div className='flex items-center justify-center font-medium text-base text-zinc-600'>
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
                                        <div className='flex items-center justify-center font-medium text-zinc-800'>
                                            Ordini
                                        </div>
                                        <div className='flex items-center justify-center font-medium text-base text-zinc-600'>
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

                    <div className='w-full rounded-md border border-gray-200 bg-white p-4'>
                        <div className='p-4'>
                            <span className='text-base font-medium'>
                                Ultimo ordine effettuato
                            </span>
                        </div>
                        <Card>
                            <div className='flex justify-between'>
                                <div className='flex mb-3'>
                                    <Link
                                        to={`/orders/${data?.data.user[0].orders._id}`}
                                        className='font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline'
                                    >
                                        #{data?.data.user[0].orders.orderId}
                                    </Link>
                                </div>
                                <div className='flex'>
                                    {formatCurrency(
                                        data?.data.user[0].orders.totalPrice
                                    )}
                                </div>
                            </div>
                            <ul className='mt-4 text-sm text-zinc-600'>
                                {data?.data.user[0].orders.orderItems.map(
                                    (item) => (
                                        <>
                                            <li className=' list-none'>
                                                <div className='flex'>
                                                    <div className='flex-initial'>
                                                        <img
                                                            src={item.image}
                                                            className='w-8 md:w-14 md:rounded-lg md:border md:p-1.5'
                                                        />
                                                    </div>
                                                    <div className='flex-auto ml-3'>
                                                        <div className='grid grid-cols-10 gap-3'>
                                                            <div className='col-span-5'>
                                                                {item.name}
                                                            </div>
                                                            <div className='col-span-3'>
                                                                {formatCurrency(
                                                                    item.price
                                                                )}{" "}
                                                                x{" "}
                                                                {item.quantity}
                                                            </div>
                                                            <div className='col-span-2 justify-self-end'>
                                                                {formatCurrency(
                                                                    item.price *
                                                                        item.quantity
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </>
                                    )
                                )}
                            </ul>
                        </Card>
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <div className='rounded-md border border-gray-200 bg-white'>
                        <div className='border-b border-gray-200 py-4 px-6'>
                            <span className='text-lg font-medium'>Cliente</span>
                        </div>
                        <div className='flex flex-col gap-6 p-6 text-sm text-zinc-600'>
                            <div>
                                <label className='block text-sm font-medium text-zinc-800  mb-2'>
                                    Nome
                                </label>

                                {data?.data.user[0].name}
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-zinc-800 mb-2'>
                                    Recapiti
                                </label>
                                {data?.data.user[0].email}
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-zinc-800 mb-2'>
                                    Indirizzo di consegna
                                </label>
                                <ul className='list-none'>
                                    <li>
                                        {
                                            data?.data.user[0].orders
                                                .shippingInfo.address
                                        }
                                    </li>
                                    <li>
                                        {
                                            data?.data.user[0].orders
                                                .shippingInfo.postalCode
                                        }{" "}
                                        {
                                            data?.data.user[0].orders
                                                .shippingInfo.city
                                        }
                                    </li>
                                    <li>
                                        {
                                            data?.data.user[0].orders
                                                .shippingInfo.details
                                        }
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { View as ViewCustomer };
