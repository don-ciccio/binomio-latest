import PropTypes from "prop-types";
import { Icon } from "@iconify/react";

const AddedElement = ({ value, deleteHandler }) => {
    return (
        <div className='cursor-pointer hover:bg-bodydark1/50 px-2 py-2 border-t border-bodydark2/50 justify-between flex gap-3 flex-row items-center'>
            <div className='flex  text-black h-full'>{value}</div>
            <div className=' flex justify-center items-center '>
                <button
                    className='justify-center rounded bg-danger py-1 px-1.5  text-gray hover:bg-opacity-95'
                    type='button'
                    onClick={deleteHandler}
                >
                    <Icon className='w-5 h-5' icon={"ion:trash-sharp"} />
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
