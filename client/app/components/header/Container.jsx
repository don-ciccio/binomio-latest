const Container = ({ children }) => {
    return (
        <header
            className='
            fixed 
            inset-x-0 
            top-0 
            z-15
            '
        >
            <div
                className='
                transition 
                ease-in-out 
                duration-300
                '
            >
                <div className='relative z-10'>{children}</div>
            </div>
        </header>
    );
};

export default Container;
