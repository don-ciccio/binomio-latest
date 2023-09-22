"use client";

import RippleButton from "@/app/components/ui/Button";
import ProductSkeleton from "@/app/components/ui/ProductSkeleton";
import { useGetProduct } from "@/app/lib/api";
import { useParams } from "next/navigation";

const ProductDetails = ({ initialProduct }) => {
    const params = useParams();

    const { data, isLoading, isError } = useGetProduct({
        slug: params.slug,
        initialProduct,
    });

    if (isLoading || isError) return <ProductSkeleton />;

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
                                <div className='text-2xl text-gray-900'>
                                    <p className='font-semibold'>
                                        €{data?.product[0].price}
                                    </p>
                                </div>
                            </div>
                            <div className='my-5 flex items-center gap-x-3'>
                                <div className='flex w-1/4 bg-zinc-300 rounded-full  px-5 py-3'>
                                    <div className='flex justify-center items-center w-1/3'>
                                        <button
                                            type='button'
                                            title='Reduce Quantity'
                                            className='rounded-l-xl leading-none cursor-not-allowed  opacity-75'
                                            tabIndex='-1'
                                        >
                                            <svg
                                                className={`inline-block h-3 w-3 text-zinc-800`}
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='1200'
                                                height='1200'
                                                viewBox='0 0 1200 1200'
                                            >
                                                <path
                                                    fill='currentColor'
                                                    d='M0 430.078h1200v339.844H0V430.078z'
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                    <span className='flex justify-center w-1/3 text-center text-lg'>
                                        1
                                    </span>
                                    <div className='flex justify-center items-center w-1/3'>
                                        <button
                                            type='button'
                                            title='Reduce Quantity'
                                            className='rounded-r-xl  leading-none'
                                        >
                                            <svg
                                                className={`inline-block h-3 w-3 text-zinc-800`}
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='1200'
                                                height='1200'
                                                viewBox='0 0 1200 1200'
                                            >
                                                <path
                                                    fill='currentColor'
                                                    d='M430.078 0v430.078H0v339.844h430.078V1200h339.844V769.922H1200V430.078H769.922V0H430.078z'
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <RippleButton label='Aggiungi al carrello' />
                            </div>
                            <div className='mt-3 flex items-end justify-between'>
                                <p>{data?.product[0].description}</p>
                            </div>
                            <div className='mt-5 flex items-end justify-between'>
                                <ul>
                                    {data &&
                                        Object.entries(
                                            data?.product[0].properties
                                        ).map(([key, value]) => (
                                            <li
                                                key={key}
                                                className='mb-2 relative font-light'
                                            >
                                                <p>
                                                    <strong className='font-semibold'>
                                                        {key}:&nbsp;&nbsp;
                                                    </strong>
                                                    {value}
                                                </p>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
