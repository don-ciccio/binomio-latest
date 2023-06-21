"use client";
import ProductCard from "@/app/components/main/Cards/ProductCard";
import { useGetProducts } from "@/app/lib/api";
import { useState } from "react";

const ProductsSection = ({ initialData }) => {
    const [sort, setSort] = useState({ sort: "price", order: "asc" });
    const [filterCategory, setFilterCategory] = useState([
        "6447f1114072a82589b362eb",
    ]);
    const [status, setStatus] = useState("All");
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const { data } = useGetProducts({
        page,
        sort,
        filterCategory,
        status,
        search,
    });

    return (
        <div className='relative z-2'>
            <div className='md:px-10 xxs:px-4 xxs:pt-14 md:pb-0 lg:py-14 relative z-1 text-center bg-gray-150 block'>
                <div className='mb-8 flex items-baseline justify-between'>
                    <h2 className='text-2xl font-medium md:text-3xl uppercase'>
                        Vini
                    </h2>
                    <a
                        className='hidden md:flex items-center font-medium text-xl'
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
                <div className='flex flex-row gap-5'>
                    {data?.products.map((product) => (
                        <ProductCard
                            key={product._id}
                            name={product.name}
                            price={product.price}
                            images={product.images}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductsSection;
