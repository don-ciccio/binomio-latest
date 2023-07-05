"use client";
import ProductCard from "@/app/components/main/Cards/ProductCard";
import { useGetProducts } from "@/app/lib/api";
import { useState } from "react";

const ProductRow = ({ filterCategory }) => {
    const [sort, setSort] = useState({ sort: "price", order: "asc" });
    const [status, setStatus] = useState("All");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(4);
    const [search, setSearch] = useState("");
    const { data } = useGetProducts({
        page,
        sort,
        filterCategory,
        status,
        search,
        limit,
    });

    return (
        <div className='flex flex-row gap-5'>
            {data?.products.map((product, index) => (
                <div
                    key={index}
                    className='mb-5 last:hidden xxs:last:flex xxs:even:hidden sm:last:hidden sm:even:flex md:last:hidden lg:last:flex'
                >
                    <ProductCard
                        id={product._id}
                        name={product.name}
                        price={product.price}
                        images={product.images}
                    />
                </div>
            ))}
        </div>
    );
};

export default ProductRow;
