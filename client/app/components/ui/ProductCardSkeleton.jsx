const ProductCardSkeleton = ({ number }) => {
    return Array(number)
        .fill(0)
        .map((el, index) => (
            <div
                key={index}
                className='flex flex-col gap-2 w-full last:hidden xxs:last:flex xxs:even:hidden sm:last:hidden sm:even:flex md:last:hidden lg:last:flex'
            >
                <div className='animate-pulse rounded-3xl overflow-hidden bg-zinc-300 w-full lg:h-64 xl:h-80 md:h-56 sm:h-52 xs:h-48 xxs:h-40'></div>

                <div className='flex justify-between gap-1'>
                    <div className='animate-pulse bg-zinc-300 w-2/3 h-6 items-start rounded-3xl'></div>
                    <div className='animate-pulse bg-zinc-300 w-1/5 h-6 items-start rounded-3xl'></div>
                </div>
            </div>
        ));
};

export default ProductCardSkeleton;
