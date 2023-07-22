"use client";

import { useGetProduct } from "@/app/lib/api";
import { useParams } from "next/navigation";

const ProductDetails = ({ initialProduct }) => {
    const params = useParams();

    const { data, isLoading, isError } = useGetProduct({
        slug: params.slug,
        initialProduct,
    });

    return (
        <div className='mx-auto max-w-7xl'>
            <div className='px-4 py-10 sm:px-6 lg:px-8'>
                <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
                    <div className='flex flex-col-reverse'>
                        <div className='mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none'></div>
                        <div className='aspect-square relative h-full w-full sm:rounded-lg overflow-hidden'>
                            <img
                                src={data?.product[0].images[0]}
                                alt={data?.product[0].name}
                                className='object-cover p-3 object-center bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-400 via-zinc-300 to-zinc-200 shadow-sm'
                            />
                        </div>
                    </div>
                    <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
                        <div>
                            <h1 className='text-3xl font-bold text-gray-900'>
                                {data?.product[0].name}
                            </h1>
                            <div className='mt-3 flex items-end justify-between'>
                                <p className='text-2xl text-gray-900'>
                                    <div className='font-semibold'>
                                        €{data?.product[0].price}
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
