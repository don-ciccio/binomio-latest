"use client";
import { Icon } from "@iconify/react";
import { useState } from "react";

import { useCartStore, useWishlistStore, useToastStore } from "@/app/lib/store";

import { formatCurrency, slugify } from "@/app/lib/utils/utilFuncs";
import { useRouter } from "next/navigation";
import HeartIcon from "../../icons/HeartIcon";

const ProductListCard = ({ name, price, images, id, description }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const { cart, addToCart } = useCartStore();
    const { wishlist, toggleWishlist } = useWishlistStore();
    const { setToast } = useToastStore();
    const router = useRouter();

    async function handleClick(e) {
        e.stopPropagation();
        const alreadyAdded = cart.find((item) => item.id === id);
        if (alreadyAdded) {
            setToast({
                status: "info",
                message: "Il prodotto è già stato aggiunto!",
            });
        } else {
            addToCart({ id, quantity: 1 });
            setToast({
                status: "successo",
                message: "Il prodotto è stato aggiunto al carrello!",
            });
        }

        setIsFlipped(!isFlipped);
        await delay(800);
        setIsFlipped((prev) => !prev);
    }

    const hasWished = wishlist.some((item) => item.id === id);
    const handleAddToWishlist = (e) => {
        e.stopPropagation();
        setToast({
            status: hasWished ? "info" : "successo",
            message: `Il prodotto è stato ${
                hasWished ? "rimosso dalla" : "aggiunto alla"
            } wishlist`,
        });
        toggleWishlist(id);
    };

    const handleClickRoute = () => {
        router.push(`/prodotti/${slugify(name)}`);
    };
    return (
        <div
            onClick={handleClickRoute}
            className={
                "cursor-pointer w-full p-2 bg-white-200 hover:shadow-md hover:shadow-zinc-400/25 hover:bg-white from-gray-200 to-white/40 rounded-3xl flex flex-row mx-auto h-full md:h-40"
            }
        >
            <div
                className={
                    "group flex flex-basis-100 md:flex-basis-140 h-full items-center"
                }
            >
                <div className='relative overflow-hidden'>
                    <img
                        src={images[0]}
                        alt={name}
                        className={`block rounded-3xl relative overflow-hidden py-2 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-400 via-zinc-300 to-zinc-200  shadow-sm h-[6.5rem] md:h-36`}
                    />
                </div>
            </div>

            <div className={"flex flex-auto h-full items-center"}>
                <div className='flex gap-2 md:gap-4 flex-auto items-center mt-2'>
                    <div className='flex flex-col  gap-3'>
                        <div
                            className={
                                "text-left flex text-lg md:text-xl font-semibold"
                            }
                        >
                            {name}
                        </div>
                        <div className={"text-left font-light hidden md:flex"}>
                            {description}
                        </div>
                    </div>

                    <div
                        className={
                            "flex h-full flex-col flex-basis-20 items-center"
                        }
                    >
                        <div className='flex flex-col gap-3 items-center'>
                            <div className='flex text-xl font-medium justify-center'>
                                {formatCurrency(price)}
                            </div>
                            <div className='hidden lg:flex'>
                                <button
                                    onClick={handleClick}
                                    className='h-11 font-medium items-center justify-center flex w-full  bg-zinc-800 hover:bg-zinc-800/75 relative overflow-hidden text-center rounded-full px-5 py-4 cursor-pointer  text-zinc-200 hover:text-white'
                                >
                                    Aggiungi al carrello
                                </button>
                            </div>

                            <div className='hidden lg:flex'>
                                <button
                                    onClick={handleAddToWishlist}
                                    className='h-11 font-light items-center justify-center flex w-full relative overflow-hidden text-center rounded-full  pb-4 cursor-pointer hover:text-orange-600'
                                >
                                    Aggiungi alla wishlist
                                </button>
                            </div>
                            <div className='flex flex-row lg:hidden'>
                                <div className='flex lg:hidden'>
                                    <button
                                        onClick={handleClick}
                                        className='block bg-zinc-800 rounded-full  text-zinc-800 items-center justify-center p-2'
                                    >
                                        <Icon
                                            className='w-5 h-5 text-gray-200'
                                            icon='el:shopping-cart'
                                        />
                                    </button>
                                </div>
                                <div className='flex lg:hidden'>
                                    <button
                                        onClick={handleAddToWishlist}
                                        className='p-2'
                                    >
                                        <HeartIcon
                                            className={`${
                                                hasWished
                                                    ? "fill-skin-dark !stroke-skin-dark"
                                                    : "!stroke-skin-dark"
                                            } h-5 w-5`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListCard;

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
