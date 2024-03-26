import { useParams } from "react-router-dom";
import { useGetOrderById } from "../../store/react-query/hooks/useQueries";
import Loader from "@/components/common/Loader";
import { Metric, Badge } from "@tremor/react";
import { IvaTax, formatCurrency } from "../../utils";
import { CheckCircleIcon, StopCircleIcon } from "@heroicons/react/20/solid";

const View = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetOrderById(id);
    console.log(data?.data.order);
    if (isLoading)
        return (
            <div className='flex items-center justify-center h-screen'>
                <Loader />
            </div>
        );

    return (
        <div className='px-3 xl:px-20 py-12'>
            <div className='flex p-1 mb-4'>
                <Metric>#{data?.data.order.orderId}</Metric>
            </div>
            <div className='grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-3'>
                <div className='sm:col-span-2 flex flex-col gap-5'>
                    <div className='w-full rounded-md border border-gray-200 bg-white'>
                        <div className='border-b border-gray-200 py-4 px-6'>
                            <span className='text-lg font-medium'>
                                Dettagli ordine
                            </span>
                        </div>
                        <ul className='mt-4 text-sm text-zinc-600'>
                            {data?.data.order.orderItems.map((item) => (
                                <>
                                    <li className='py-3 pr-6 pl-4 list-none'>
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
                                                        x {item.quantity}
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
                            ))}
                        </ul>
                    </div>
                    <div className='w-full rounded-md border border-gray-200 bg-white'>
                        <div className='border-b border-gray-200 py-4 px-6'>
                            <Badge
                                icon={
                                    data?.data.order.isPaid === true
                                        ? CheckCircleIcon
                                        : StopCircleIcon
                                }
                                color={
                                    data?.data.order.isPaid === true
                                        ? "green"
                                        : "red"
                                }
                            >
                                {data?.data.order.isPaid === true
                                    ? "Pagato"
                                    : "Annullato"}
                            </Badge>
                        </div>
                        <div className='grid grid-rows-3 gap-3 pt-5 px-6 pb-3 text-sm text-zinc-600'>
                            <div className='row-span-1'>
                                <div className=''>
                                    <div className='grid grid-cols-10'>
                                        <div className='col-span-3'>
                                            <span className=''>Subtotale:</span>
                                        </div>
                                        <div className='col-span-5'>
                                            <span className=''>
                                                {
                                                    data?.data.order.orderItems
                                                        .length
                                                }{" "}
                                                articoli
                                            </span>
                                        </div>
                                        <div className='col-span-2 justify-self-end'>
                                            <span className=''>
                                                {formatCurrency(
                                                    Number(
                                                        parseFloat(
                                                            data?.data.order
                                                                .totalPrice
                                                        ) -
                                                            IvaTax(
                                                                parseFloat(
                                                                    data?.data
                                                                        .order
                                                                        .totalPrice
                                                                ),
                                                                10
                                                            )
                                                    ).toFixed(2)
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row-span-1'>
                                <div className='grid grid-cols-10'>
                                    <span className='col-span-3'>Imposte:</span>
                                    <span className='col-span-5'>
                                        IVA (22%) (incluso)
                                    </span>
                                    <span className='col-span-2  justify-self-end'>
                                        {formatCurrency(
                                            IvaTax(
                                                parseFloat(
                                                    data?.data.order.totalPrice
                                                ),
                                                10
                                            ).toFixed(2)
                                        )}
                                    </span>
                                </div>
                            </div>
                            <div className='row-span-1'>
                                <div className='grid grid-cols-10'>
                                    <span className='col-span-3'>
                                        Totale carrello:
                                    </span>
                                    <span className='col-span-5'></span>
                                    <span className='col-span-2 font-semibold justify-self-end'>
                                        {formatCurrency(
                                            data?.data.order.totalPrice
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <div className='rounded-md border border-gray-200 bg-white'>
                        <div className='border-b border-gray-200 py-4 px-6'>
                            <span className='text-lg font-medium'>Note</span>
                        </div>
                        <div className='flex flex-col gap-6 p-6 text-sm text-zinc-600'>
                            Consegna alle 21.30
                        </div>
                    </div>
                    <div className='rounded-md border border-gray-200 bg-white'>
                        <div className='border-b border-gray-200 py-4 px-6'>
                            <span className='text-lg font-medium'>Cliente</span>
                        </div>
                        <div className='flex flex-col gap-6 p-6 text-sm text-zinc-600'>
                            <div>
                                <label className='block text-sm font-medium text-gray-600 mb-2'>
                                    Nome
                                </label>
                                {data?.data.order.user.name}
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-600 mb-2'>
                                    Recapiti
                                </label>
                                {data?.data.order.user.email}
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-600 mb-2'>
                                    Indirizzo di consegna
                                </label>
                                <ul className='list-none'>
                                    <li>
                                        {data?.data.order.shippingInfo.address}
                                    </li>
                                    <li>
                                        {
                                            data?.data.order.shippingInfo
                                                .postalCode
                                        }{" "}
                                        {data?.data.order.shippingInfo.city}
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

export { View as ViewOrder };
