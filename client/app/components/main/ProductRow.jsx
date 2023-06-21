"use client";
import ProductCard from "@/app/components/main/Cards/ProductCard";
import { useGetProducts } from "@/app/lib/api";
import { useState } from "react";

const ProductRow = ({ filterCategory }) => {
    const [sort, setSort] = useState({ sort: "price", order: "asc" });
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
    );
};

export default ProductRow;
