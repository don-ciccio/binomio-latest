"use client";
import ProductRow from "@/app/components/main/ProductRow";
import { useGetCategories } from "@/app/lib/api";
import { useState } from "react";

const ProductsSection = () => {
    const [search, setSearch] = useState("");
    const { data } = useGetCategories({ search });

    return (
        <div className='relative z-2'>
            <div className='md:px-10 xxs:px-4 md:pb-0 lg:pb-14 lg:pt-8 relative z-1 text-center bg-gray-150 block'>
                {data.map(
                    (cat) =>
                        cat.number_of_product > 0 &&
                        !cat.parent && (
                            <div className='mb-10' key={cat._id}>
                                <div className='mb-8 flex items-baseline justify-between'>
                                    <h2 className='text-2xl font-medium tracking-wide uppercase'>
                                        {cat.name}
                                    </h2>
                                    <a
                                        className='hidden md:flex items-center font-medium text-base'
                                        href='/'
                                    >
                                        Esplora
                                        <svg
                                            className='-rotate-90 scale-75 inline-block h-6 w-6 stroke-black stroke-2 stroke-skin-dark'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                d='M6 9l6 6 6-6'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            ></path>
                                        </svg>
                                    </a>
                                </div>
                                <ProductRow filterCategory={cat._id} />
                            </div>
                        )
                )}
            </div>
        </div>
    );
};

export default ProductsSection;
