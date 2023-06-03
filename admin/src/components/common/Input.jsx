import PropTypes from "prop-types";

const Input = ({ name, available, onChange, index }) => {
    return (
        <div className='flex'>
            <label className='relative inline-flex cursor-pointer'>
                <input
                    id={name}
                    type='checkbox'
                    name={name}
                    checked={available}
                    onChange={onChange}
                    data-action={index}
                    className='sr-only peer'
                />
                <div className="w-11 h-6 bg-gray peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
        </div>
    );
};

export default Input;

Input.propTypes = {
    name: PropTypes.string,
    available: PropTypes.bool,
    onChange: PropTypes.func,
    index: PropTypes.number,
};
