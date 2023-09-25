const SkeletonCategory = ({ number }) => {
    return Array(number)
        .fill(0)
        .map((el, index) => (
            <div key={index} className='flex flex-col gap-3 w-full'>
                <div className='animate-pulse rounded-3xl overflow-hidden bg-zinc-300 w-full h-80'></div>

                <div className='flex justify-between gap-1'>
                    <div className='animate-pulse bg-zinc-300 w-2/3 h-6 items-start rounded-3xl'></div>
                    <div className='animate-pulse bg-zinc-300 w-1/5 h-6 items-start rounded-3xl'></div>
                </div>
            </div>
        ));
};

export default SkeletonCategory;
