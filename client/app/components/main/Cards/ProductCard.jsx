const ProductCard = ({ name, price, images, id }) => {
    return (
        <div key={id} className='mb-5 w-1/3'>
            <div>
                <div className='text-center'>
                    <img
                        src={images[0]}
                        alt={name}
                        className='block rounded-3xl relative overflow-hidden py-2 bg-gradient-to-r from-white/75 via-zinc-200/40  to-white/75 to-100% hover:shadow-md  shadow-sm  w-50 h-50'
                    />
                </div>
                <div className='flex mt-5'>
                    <div className='flex flex-wrap w-full'>
                        <div className='text-left flex-basis-50 max-w-1/2 '>
                            {name}
                        </div>
                        <div className='text-right flex-basis-50 max-w-1/2 '>
                            €{price}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
