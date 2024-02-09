import PropTypes from "prop-types";
import { Icon as TremorIcon, Badge } from "@tremor/react";

import { TrashIcon, CalendarDaysIcon } from "@heroicons/react/20/solid";
const AddedElement = ({ value, deleteHandler }) => {
    return (
        <div className='cursor-pointer hover:bg-bodydark1/50 px-2 py-2 border-t border-bodydark2/50 justify-between flex gap-3 flex-row items-center'>
            <div className='flex  h-full'>
                <Badge icon={CalendarDaysIcon} size='md'>
                    {value}
                </Badge>
            </div>
            <div className=' flex justify-center items-center '>
                <button
                    className='justify-center rounded bg-danger py-1 px-1.5  text-gray hover:bg-opacity-95'
                    type='button'
                    onClick={deleteHandler}
                >
                    <TremorIcon
                        icon={TrashIcon}
                        variant='simple'
                        tooltip='Elimina'
                        size='sm'
                        color='red'
                    />
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
