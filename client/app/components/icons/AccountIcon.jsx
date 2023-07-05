const AccountIcon = ({ className = "" }) => {
    return (
        <svg
            className={`${className} inline-block h-6 w-6`}
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                fill='currentColor'
                fillRule='evenodd'
                d='M10 11a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0-2a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm-5 3h10a5 5 0 0 1 5 5v3H0v-3a5 5 0 0 1 5-5zm13 6v-1a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v1h16z'
            />
        </svg>
    );
};

export default AccountIcon;
