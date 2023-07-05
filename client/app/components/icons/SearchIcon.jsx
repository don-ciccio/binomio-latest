const SearchIcon = ({ className = "" }) => {
    return (
        <svg
            className={`${className} inline-block h-5 w-5`}
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                fill='currentColor'
                fillRule='evenodd'
                d='M15.096 14.182l3.484 3.483a1 1 0 0 1-1.415 1.415l-3.546-3.547a8 8 0 1 1 1.477-1.352zm-1.853-.94a6 6 0 1 0-8.486-8.485 6 6 0 0 0 8.486 8.486z'
            />
        </svg>
    );
};

export default SearchIcon;
