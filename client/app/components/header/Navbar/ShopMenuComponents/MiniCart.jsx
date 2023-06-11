const MiniCart = () => {
    return (
        <div className='block'>
            <div className='px-5'>
                <h4 className='uppercase'>Cart</h4>
            </div>
            <div className='relative'>
                <div className='px-5 relative overflow-hidden'>
                    <div className='h-full'>
                        <p>The cart is empty.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MiniCart;
