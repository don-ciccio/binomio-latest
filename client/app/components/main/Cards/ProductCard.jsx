import Image from "next/image";

const ProductCard = ({ name, price, images, id }) => {
    return (
        <div
            key={id}
            className='mb-5 last:hidden xxs:last:flex xxs:even:hidden sm:last:hidden sm:even:flex md:last:hidden lg:last:flex'
        >
            <div>
                <div className='text-center'>
                    <img
                        src={images[0]}
                        alt={name}
                        className='block rounded-3xl relative overflow-hidden py-2 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-400 via-zinc-300 to-zinc-200  hover:shadow-md  shadow-sm  w-50 h-50'
                    />
                </div>
                <div className='mt-5'>
                    <div className='flex justify-between'>
                        <div className='items-start text-left flex-basis-66 w-2/3 '>
                            {name}
                        </div>
                        <div className='items-end flex-basis-33 w-1/3'>
                            <div className='flex font-medium flex-row gap-1 items-center'>
                                <div className='flex flex-grow w-1/2 justify-end'>
                                    €{price}
                                </div>
                                <div className='flex'>
                                    <img
                                        style={{
                                            width: 20,
                                            height: 20,
                                        }}
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
