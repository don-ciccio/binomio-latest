import PropTypes from "prop-types";
import {
    MultiSelect,
    MultiSelectItem,
    Select,
    SelectItem,
} from "@tremor/react";

const CategoryTableTop = ({
    categories,
    filterCategory,
    setFilterCategory,
    setSelectedStatus,
}) => {
    return (
        <>
            <MultiSelect
                value={filterCategory}
                onValueChange={(value) => setFilterCategory(value)}
                placeholder='Scegli categoria...'
            >
                {categories?.map(
                    ({ _id, name, number_of_product }) =>
                        number_of_product > 0 && (
                            <MultiSelectItem key={_id} value={_id}>
                                {name}
                            </MultiSelectItem>
                        )
                )}
            </MultiSelect>
            <Select
                className='max-w-full sm:max-w-xs'
                defaultValue='All'
                onValueChange={setSelectedStatus}
            >
                <SelectItem value='All'>Tutti</SelectItem>
                <SelectItem value='Attivo'>Attivo</SelectItem>
                <SelectItem value='Bozza'>Bozza</SelectItem>
            </Select>
        </>
    );
};

export default CategoryTableTop;

CategoryTableTop.propTypes = {
    categories: PropTypes.array,
    filterCategory: PropTypes.array,
    setSelectedStatus: PropTypes.func,
    setFilterCategory: PropTypes.func,
};
