"use client";
import { Icon } from "@iconify/react";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { useCartStore, useWishlistStore, useToastStore } from "@/app/lib/store";
import HeartIcon from "../../icons/HeartIcon";
import Link from "next/link";
import { formatCurrency, slugify } from "@/app/lib/utils/utilFuncs";
import { useRouter } from "next/navigation";

const ProductCard = ({ name, price, images, id }) => {
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
        <div onClick={handleClickRoute} className={"cursor-pointer"}>
            <div className={"group"}>
                <div className='relative overflow-hidden'>
                    <img
                        src={images[0]}
                        alt={name}
                        className={`block rounded-3xl relative overflow-hidden py-2 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-400 via-zinc-300 to-zinc-200  shadow-sm`}
                    />

                    <div className='rounded-3xl absolute h-full w-full bg-white/50 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300'>
                        <ReactCardFlip
                            isFlipped={isFlipped}
                            flipDirection='horizontal'
                        >
                            <button
                                onClick={handleClick}
                                className='block bg-zinc-800 rounded-full  text-zinc-800 items-center justify-center p-2'
                            >
                                <Icon
                                    className='w-6 h-6 text-gray-200'
                                    icon='el:shopping-cart'
                                />
                            </button>
                            <button
                                onClick={handleClick}
                                className='block bg-zinc-800 rounded-full  text-zinc-800 items-center justify-center p-2'
                            >
                                <Icon
                                    className='w-6 h-6 text-gray-200'
                                    icon='el:plus'
                                />
                            </button>
                        </ReactCardFlip>
                    </div>
                </div>
            </div>

            <div className={"mt-5"}>
                <div className='flex gap-1 flex-auto'>
                    <div
                        className={
                            "items-start text-left flex-basis-66 max-w-2/3"
                        }
                    >
                        {name}
                    </div>
                    <div className={"items-end flex-basis-33 max-w-1/3 pr-1.5"}>
                        <div className='flex font-medium flex-row gap-1 items-center justify-end'>
                            <div className='flex  max-w-2/3 justify-end'>
                                {formatCurrency(price)}
                            </div>
                            <div className='flex max-w-1/3 justify-end'>
                                <button
                                    type='button'
                                    className='cursor-pointer'
                                    title='Aggiungi alla Wishlist'
                                    onClick={handleAddToWishlist}
                                >
                                    <HeartIcon
                                        className={`${
                                            hasWished
                                                ? "fill-skin-dark !stroke-skin-dark"
                                                : "!stroke-skin-dark"
                                        }`}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
