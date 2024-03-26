"use client";

import ProductCard from "@/app/components/main/Cards/ProductCard";
import Filter from "@/app/components/main/Filter";
import { useProductsByCategory } from "@/app/lib/api";
import { useMounted } from "@/app/lib/hooks/useMounted";

import qs from "query-string";

import {
    usePathname,
    useRouter,
    useParams,
    useSearchParams,
} from "next/navigation";

import { useToggle } from "@/app/lib/store";
import SkeletonCategory from "@/app/components/ui/SkeletonCategory";
import { useState } from "react";
import { Icon } from "@iconify/react";
import ProductListCard from "@/app/components/main/Cards/ProductListCard";

function shorten(str, maxLen) {
    if (str.length <= maxLen) return str;
    const trimmed_str = str.replace(/ {1,}/g, " ").trim();
    return trimmed_str.split(" ").splice(0, maxLen).join(" ");
}

const ProductsByCatSection = () => {
    const open = useToggle((state) => state.open);
    const setOpen = useToggle((state) => state.setOpen);
    const params = useParams();
    const searchParams = useSearchParams();
    const current = qs.parse(searchParams.toString());
    const pathname = usePathname();
    const router = useRouter();
    const [toggleView, setToggleView] = useState(true);

    const mounted = useMounted();
    const { data, isLoading } = useProductsByCategory({
        cat: params.category,
        query: current,
    });

    const existingParams = [];

    searchParams.forEach((value, key) => {
        existingParams.push([key, value]);
    });

    const onSelect = (key, value) => {
        const newUrlParams = new URLSearchParams(searchParams.toString());

        newUrlParams.delete(key, value);
        router.replace(`${pathname}?${newUrlParams}`);
    };
    return (
        <div className='md:px-6 xxs:px-4 lg:pb-14 pt-8 relative z-1 text-center bg-gray-150 block'>
            <div className='flex justify-between items-center mb-6 h-8'>
                <div className='flex flex-row gap-3 '>
                    <div
                        className='flex flex-row items-center justify-center cursor-pointer'
                        onClick={() => setToggleView(!toggleView)}
                    >
                        {toggleView ? (
                            <Icon
                                icon={"bi:view-list"}
                                className='w-5 h-5 text-zinc-900'
                            />
                        ) : (
                            <Icon
                                icon={"bi:grid"}
                                className='w-5 h-5 text-zinc-900'
                            />
                        )}
                    </div>
                    <div className='flex flex-row gap-2'>
                        {existingParams.map(([key, value]) => (
                            <li key={key} className='inline-block'>
                                <div className='flex flex-wrap px-3 gap-1 py-2 m-1 justify-between items-center text-sm font-medium rounded-3xl cursor-pointer bg-zinc-800 text-gray-200 hover:bg-zinc-700 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100'>
                                    <span>{value}</span>
                                    <button
                                        onClick={() => onSelect(key, value)}
                                    >
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            className='h-5 w-5 ml-1 hover:text-gray-300'
                                            viewBox='0 0 20 20'
                                            fill='currentColor'
                                        >
                                            <path
                                                fillRule='evenodd'
                                                d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                                                clipRule='evenodd'
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </div>
                </div>

                <div className='flex justify-end basis-1/4'>
                    <button onClick={() => setOpen(!open)}>
                        <div className='flex flex-basis-11 justify-center'>
                            <div className='z-2 flex flex-row gap-1 items-center justify-center'>
                                <div className='flex'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='20'
                                        height='20'
                                        viewBox='0 0 24 24'
                                    >
                                        <path
                                            fill='currentColor'
                                            d='M9 5a1 1 0 1 0 0 2a1 1 0 0 0 0-2zM6.17 5a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 0 1 0-2h1.17zM15 11a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2h7.17zM9 17a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2h1.17z'
                                        />
                                    </svg>
                                </div>
                                <div className='flex uppercase'>Filtra</div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            <Filter data={data} />

            <div
                className={`${
                    toggleView
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8"
                        : " grid-cols-1"
                }`}
            >
                {mounted && !isLoading ? (
                    data?.products.map((product, index) => (
                        <div
                            key={index}
                            className='flex items-center justify-center'
                        >
                            {toggleView ? (
                                <ProductCard
                                    id={product._id}
                                    name={product.name}
                                    price={product.price}
                                    images={product.images}
                                />
                            ) : (
                                <ProductListCard
                                    id={product._id}
                                    name={product.name}
                                    price={product.price}
                                    images={product.images}
                                    description={
                                        shorten(product.description, 25) + "..."
                                    }
                                />
                            )}
                        </div>
                    ))
                ) : (
                    <SkeletonCategory number={8} />
                )}
            </div>
        </div>
    );
};

export default ProductsByCatSection;
