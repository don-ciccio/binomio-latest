const ProductSkeleton = () => {
    return (
        <div className='mx-auto max-w-7xl'>
            <div className='w-full gap-5 p-2 mx-auto  select-none sm:p-4 sm:h-100 rounded-2xl sm:flex-row lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
                <div className='bg-zinc-200 sm:h-100 rounded-xl animate-pulse'></div>
                <div className='flex flex-col flex-1 gap-5 sm:p-2'>
                    <div className='flex flex-col flex-1 gap-3'>
                        <div className='w-full bg-zinc-200 animate-pulse h-32 rounded-2xl'></div>
                        <div className='w-full h-8 bg-zinc-200 animate-pulse rounded-2xl'></div>
                        <div className='w-full h-8 bg-zinc-200 animate-pulse rounded-2xl'></div>
                        <div className='w-full h-8 bg-zinc-200 animate-pulse rounded-2xl'></div>
                        <div className='w-full h-8 bg-zinc-200 animate-pulse rounded-2xl'></div>
                    </div>
                    <div className='flex gap-3 mt-auto'>
                        <div className='w-20 h-12 bg-zinc-200 rounded-full animate-pulse'></div>
                        <div className='w-20 h-12 bg-zinc-200 rounded-full animate-pulse'></div>
                        <div className='w-20 h-12 ml-auto bg-zinc-200 rounded-full animate-pulse'></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductSkeleton;
