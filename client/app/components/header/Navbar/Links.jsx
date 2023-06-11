const Links = () => {
    return (
        <nav className='lg:block hidden'>
            <div className='relative h-full items-center'>
                <div className='md:block rounded-3xl shadow-md shadow-zinc-400/25 bg-white -z-1 absolute left-0 top-0 w-full h-12 transition ease-in-out duration-300'></div>
                <ul className=' flex text-sm font-medium items-center h-3 py-6 px-2 relative'>
                    <li className='cursor-pointer hover:bg-gray-150 lg:px-2 uppercase block rounded-3xl transition ease-in-out duration-300 bg-left-top py-2.5'>
                        <span>Vini</span>
                    </li>
                    <li className='cursor-pointer hover:bg-gray-150 lg:px-2 uppercase block rounded-3xl transition ease-in-out duration-300 bg-left-top py-2.5'>
                        <span>Birre</span>
                    </li>
                    <li className='cursor-pointer hover:bg-gray-150 lg:px-2 uppercase block rounded-3xl transition ease-in-out duration-300 bg-left-top py-2.5'>
                        <span>Analcolici</span>
                    </li>
                    <li className='cursor-pointer hover:bg-gray-150 lg:px-2 uppercase block rounded-3xl transition ease-in-out duration-300 bg-left-top py-2.5'>
                        <span>Cocktail</span>
                    </li>
                    <li className='cursor-pointer hover:bg-gray-150 lg:px-2 uppercase block rounded-3xl transition ease-in-out duration-300 bg-left-top py-2.5 text-orange-400'>
                        <span>Food Menu</span>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Links;
