"use client";
import { useGetCategories } from "@/app/lib/api";
import { useToggleBooking } from "@/app/lib/store";
import Link from "next/link";

import { useState } from "react";

const Links = () => {
    const [search, setSearch] = useState("");
    const { data } = useGetCategories({ search });
    const open = useToggleBooking((state) => state.open);
    const setOpen = useToggleBooking((state) => state.setOpen);
    return (
        <nav className='lg:block hidden'>
            <div className='relative h-full items-center'>
                <div className='md:block rounded-3xl shadow-md shadow-zinc-400/25 bg-white -z-1 absolute left-0 top-0 w-full h-12 transition ease-in-out duration-300'></div>
                <ul className=' flex text-base font-medium items-center h-3 py-6 px-2 relative'>
                    {data?.menu?.map(
                        (category, index) =>
                            category.slug !== "menu" && (
                                <Link
                                    href={`/categorie/${category.slug}`}
                                    key={index}
                                    className='cursor-pointer hover:bg-gray-150 lg:px-2 text-lg block rounded-3xl transition ease-in-out duration-300 bg-left-top py-2.5'
                                >
                                    <span>{category.name}</span>
                                </Link>
                            )
                    )}

                    <button
                        onClick={() => setOpen(!open)}
                        className='cursor-pointer hover:bg-gray-150 lg:px-2 text-lg block rounded-3xl transition ease-in-out duration-300 bg-left-top py-2.5 last-of-type:text-orange-600'
                    >
                        <span>Prenota</span>
                    </button>
                </ul>
            </div>
        </nav>
    );
};

export default Links;
