"use client";

import ProductCard from "@/app/components/main/Cards/ProductCard";
import Filter from "@/app/components/main/Filter";
import { useProductsByCategory } from "@/app/lib/api";
import { useMounted } from "@/app/lib/hooks/useMounted";

import qs from "query-string";

import { useParams, useSearchParams } from "next/navigation";

import { useToggle } from "@/app/lib/store";

const ProductsByCatSection = ({ initialData }) => {
    const open = useToggle((state) => state.open);
    const setOpen = useToggle((state) => state.setOpen);
    const params = useParams();
    const searchParams = useSearchParams();
    const current = qs.parse(searchParams.toString());

    const mounted = useMounted();
    const { data, isLoading, isError } = useProductsByCategory({
        cat: params.category,
        query: current,
        initialData,
    });

    return (
        <div className='md:px-6 xxs:px-4 md:pb-0 lg:pb-14 pt-8 relative z-1 text-center bg-gray-150 block'>
            <div className='flex justify-end items-center mb-4'>
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

            <Filter data={data} />

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8'>
                {mounted &&
                    data?.products.map((product, index) => (
                        <div key={index} className='flex'>
                            <ProductCard
                                id={product._id}
                                name={product.name}
                                price={product.price}
                                images={product.images}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ProductsByCatSection;
