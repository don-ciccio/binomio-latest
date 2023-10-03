"use client";

import RippleButton from "@/app/components/ui/Button";
import ProductSkeleton from "@/app/components/ui/ProductSkeleton";
import { useGetProduct } from "@/app/lib/api";
import { useParams } from "next/navigation";
import { useCartStore, useToastStore } from "@/app/lib/store";
import { useState } from "react";
const ProductDetails = ({ initialProduct }) => {
    const params = useParams();
    const { cart, addToCart } = useCartStore();
    const { setToast } = useToastStore();
    const [quantity, setQuantity] = useState(1);

    const { data, isLoading, isError } = useGetProduct({
        slug: params.slug,
        initialProduct,
    });

    async function handleClick(productId, e) {
        e.stopPropagation();
        const alreadyAdded = cart.find((item) => item.id === productId);
        if (alreadyAdded) {
            setToast({
                status: "info",
                message: "Il prodotto è già stato aggiunto!",
            });
        } else {
            addToCart({ id: productId, quantity: quantity });
            setToast({
                status: "successo",
                message: "Il prodotto è stato aggiunto al carrello!",
            });
        }
    }

    const increaseQty = () => {
        const count = document.querySelector(".count");

        const qty = count.valueAsNumber + 1;
        setQuantity(qty);
    };

    const decreaseQty = () => {
        const count = document.querySelector(".count");

        if (count.valueAsNumber <= 1) return;

        const qty = count.valueAsNumber - 1;
        setQuantity(qty);
    };

    if (isLoading || isError) return <ProductSkeleton />;

    return (
        <div className='mx-auto max-w-7xl'>
            <div className='px-4 py-10 sm:px-6 lg:px-8'>
                <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
                    <div className='flex flex-col-reverse'>
                        <div className='mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none'></div>

                        <img
                            src={data?.product[0].images[0]}
                            alt={data?.product[0].name}
                            className='rounded-lg object-cover p-3 object-center bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-400 via-zinc-300 to-zinc-200 shadow-sm'
                        />
                    </div>
                    <div className='mt-5 px-4 sm:px-0 lg:mt-0'>
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
                            <div className='my-5 flex items-center sm:gap-x-3 gap-y-3 flex-col sm:flex-row'>
                                <div className='min-w-200 sm:min-w-[150px] flex md:w-1/4 w-2/4 bg-zinc-300 rounded-full px-5 py-3'>
                                    <div className='flex justify-center items-center w-1/3'>
                                        <button
                                            type='button'
                                            title='Reduce Quantity'
                                            onClick={decreaseQty}
                                            className={` rounded-l-xl leading-none ${
                                                quantity < 2
                                                    ? "cursor-not-allowed  opacity-75"
                                                    : ""
                                            }`}
                                            tabIndex={quantity < 2 ? -1 : 0}
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
                                    <span className='text-center  w-1/3 '>
                                        <input
                                            type='number'
                                            className='count w-full outline-none text-right bg-zinc-300'
                                            value={quantity}
                                            readOnly
                                        />
                                    </span>
                                    <div className='flex justify-center items-center w-1/3'>
                                        <button
                                            type='button'
                                            title='Increase Quantity'
                                            onClick={increaseQty}
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
                                <RippleButton
                                    onClick={(e) =>
                                        handleClick(data?.product[0]._id, e)
                                    }
                                    label='Aggiungi al carrello'
                                />
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
