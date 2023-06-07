import PropTypes from "prop-types";

const AddedElement = ({ value, deleteHandler }) => {
    return (
        <div className='ml-5 badge badge-primary badge-outline p-5 flex flex-row items-center mb-3 w-36'>
            <div className='relative font-semibold text-base-content'>
                {value}
            </div>
            <div className='ml-5 relative justify-items-center mt-0.5'>
                <button type='button' onClick={deleteHandler}>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-4 h-4 text-red-600'
                        fill='none'
                        viewBox='0 0 21 21'
                        stroke='currentColor'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default AddedElement;

AddedElement.propTypes = {
    value: PropTypes.string,
    deleteHandler: PropTypes.func,
};
