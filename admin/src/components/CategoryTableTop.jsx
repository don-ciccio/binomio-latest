import PropTypes from "prop-types";
const CategoryTableTop = ({
    categories,
    filterCategory,
    setFilterCategory,
}) => {
    const onChange = ({ currentTarget: input }) => {
        if (input.checked) {
            const state = [...filterCategory, input.value];
            setFilterCategory(state);
        } else {
            const state = filterCategory.filter((val) => val !== input.value);
            setFilterCategory(state);
        }
    };

    return (
        <div className='rounded-sm border-b border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
            <div className='p-4 sm:p-6 xl:p-10'>
                <div className='flex flex-wrap items-center gap-2 sm:gap-4.5 font-medium'>
                    {categories?.map(({ _id, name }) => (
                        <div
                            className='flex flex-wrap items-center gap-1 sm:gap-2'
                            key={_id}
                        >
                            <input
                                type='checkbox'
                                value={_id}
                                onChange={onChange}
                            />
                            <p>{name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryTableTop;

CategoryTableTop.propTypes = {
    categories: PropTypes.array,
    filterCategory: PropTypes.array,
    setFilterCategory: PropTypes.func,
};
