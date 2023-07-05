"use client";

import ProductCard from "@/app/components/main/Cards/ProductCard";
import { useProductsByCategory } from "@/app/lib/api";
import { useMounted } from "@/app/lib/hooks/useMounted";
import { useParams } from "next/navigation";

const ProductsByCatSection = ({ initialData }) => {
    const params = useParams();
    const mounted = useMounted();
    const { data, isLoading, isError } = useProductsByCategory({
        cat: params.category,
        initialData,
    });

    return (
        <div className='md:px-8 xxs:px-4 md:pb-0 lg:pb-14 pt-8 relative z-1 text-center bg-gray-150 block'>
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
