import PropTypes from "prop-types";
import { Icon } from "@iconify/react";

const AddedElement = ({ value, deleteHandler }) => {
    return (
        <div className='ml-2  py-5 flex gap-3 flex-row items-center'>
            <div className='flex font-medium text-black'>{value}</div>
            <div className='ml-5 flex justify-items-center mt-0.5'>
                <button
                    className='justify-center rounded bg-danger py-1 px-1.5 font-medium text-gray hover:bg-opacity-95'
                    type='button'
                    onClick={deleteHandler}
                >
                    <Icon className='w-4 h-4' icon={"ion:trash-sharp"} />
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
