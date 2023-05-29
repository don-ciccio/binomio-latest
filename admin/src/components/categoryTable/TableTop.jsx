import PropTypes from "prop-types";

const TableTop = ({ setSearch }) => {
    return (
        <div className='datatable-top'>
            <div className='datatable-search'>
                <input
                    onChange={({ currentTarget: input }) =>
                        setSearch(input.value)
                    }
                    className='datatable-input'
                    placeholder='Cerca...'
                    type='search'
                    title='Cerca tra le categorie'
                    aria-controls='dataTableOne'
                />
            </div>
        </div>
    );
};

export default TableTop;

TableTop.propTypes = {
    setSearch: PropTypes.func,
};
