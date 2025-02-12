"use client";

import { useGetCategories } from "@/app/lib/api";
import Link from "next/link";

const CategoriesList = () => {
    const { data } = useGetCategories({ search: "" });

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {data?.menu?.map(
                (category) =>
                    category.slug !== "menu" && (
                        <Link
                            href={`/categorie/${category.slug}`}
                            key={category._id}
                            className='group relative overflow-hidden rounded-xl hover:shadow-lg transition duration-300'
                        >
                            <div className='relative h-[300px] w-full'>
                                <img
                                    src={category.images?.[0]}
                                    alt={category.name}
                                    className='absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition duration-500'
                                />
                                <div className='absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300' />
                                <div className='absolute bottom-0 left-0 right-0 p-6'>
                                    <h2 className='text-white text-2xl font-semibold'>
                                        {category.name}
                                    </h2>
                                    <p className='text-gray-200 mt-2'>
                                        {category.number_of_product} prodotti
                                    </p>
                                </div>
                            </div>
                        </Link>
                    )
            )}
        </div>
    );
};

export default CategoriesList;
