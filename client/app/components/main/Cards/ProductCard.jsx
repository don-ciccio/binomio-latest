import { Icon } from "@iconify/react";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";

const ProductCard = ({ name, price, images, id }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    async function handleClick(e) {
        e.preventDefault();
        setIsFlipped(!isFlipped);
        await delay(800);
        setIsFlipped((prev) => !prev);
    }
    return (
        <div
            key={id}
            className='mb-5 last:hidden xxs:last:flex xxs:even:hidden sm:last:hidden sm:even:flex md:last:hidden lg:last:flex'
        >
            <div className='group'>
                <div className='relative overflow-hidden'>
                    <img
                        src={images[0]}
                        alt={name}
                        className='block rounded-3xl relative overflow-hidden py-2 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-400 via-zinc-300 to-zinc-200  shadow-sm  w-50 h-50'
                    />
                    <div className='rounded-3xl absolute h-full w-full bg-zinc-900/80 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300'>
                        <ReactCardFlip
                            isFlipped={isFlipped}
                            flipDirection='horizontal'
                        >
                            <button
                                onClick={handleClick}
                                className='text-white items-center justify-center py-2 px-5'
                            >
                                <Icon
                                    className='w-9 h-9'
                                    icon='el:shopping-cart-sign'
                                />
                            </button>
                            <button
                                onClick={handleClick}
                                className='text-white items-center justify-center py-2 px-5'
                            >
                                <Icon className='w-9 h-9' icon='el:plus-sign' />
                            </button>
                        </ReactCardFlip>
                    </div>
                </div>
                <div className='mt-5'>
                    <div className='flex justify-between gap-1'>
                        <div className='items-start text-left flex-basis-66 w-2/3 '>
                            {name}
                        </div>
                        <div className='items-end flex-basis-33 w-1/3 pr-1.5'>
                            <div className='flex font-medium flex-row gap-2 items-center'>
                                <div className='flex flex-grow w-1/2 justify-end'>
                                    €{price}
                                </div>
                                <div className='flex'>
                                    <img
                                        className='cursor-pointer'
                                        src='./images/wish-off.svg'
                                        alt='wishList'
                                    />
                                </div>
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
