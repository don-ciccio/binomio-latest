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

const ProductsByCatSection = ({ initialData }) => {
    const open = useToggle((state) => state.open);
    const setOpen = useToggle((state) => state.setOpen);
    const params = useParams();
    const searchParams = useSearchParams();
    const current = qs.parse(searchParams.toString());
    const pathname = usePathname();
    const router = useRouter();

    const mounted = useMounted();
    const { data, isLoading, isError } = useProductsByCategory({
        cat: params.category,
        query: current,
        initialData,
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
        <div className='md:px-6 xxs:px-4 md:pb-0 lg:pb-14 pt-8 relative z-1 text-center bg-gray-150 block'>
            <div className='flex justify-between items-center mb-6 h-8'>
                <div className='flex flex-row gap-2 basis-2/3'>
                    {existingParams.map(([key, value]) => (
                        <li key={key} className='inline-block'>
                            <div className='inline-flex font-[500] text-sm leading-5 pr-2 pl-3 py-1 border-gray-300  border rounded-3xl items-center m-1'>
                                <span>{value}</span>
                                <button
                                    onClick={() => onSelect(key, value)}
                                    className='text-gray-500 hover:text-gray-600 inline-flex w-4 h-4 ml-1 p-1 shrink-0 cursor-pointer transform-none rounded-full hover:bg-gray-300'
                                >
                                    <svg
                                        className='block align-middle'
                                        stroke='currentColor'
                                        fill='none'
                                        viewBox='0 0 8 8'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeWidth='1.5'
                                            d='M1 1l6 6m0-6L1 7'
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                        </li>
                    ))}
                </div>
                <div className='flex justify-end basis-1/3'>
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

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8'>
                {mounted && !isLoading ? (
                    data?.products.map((product, index) => (
                        <div key={index} className='flex'>
                            <ProductCard
                                id={product._id}
                                name={product.name}
                                price={product.price}
                                images={product.images}
                            />
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
