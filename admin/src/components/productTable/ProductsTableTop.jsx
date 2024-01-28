import PropTypes from "prop-types";
import Sort from "./Sort";

const ProductsTableTop = ({ setSearch, setStatus, status }) => {
    return (
        <>
            <Sort status={status} setStatus={(status) => setStatus(status)} />
            <div className='datatable-search'>
                <input
                    onChange={({ currentTarget: input }) =>
                        setSearch(input.value)
                    }
                    className='datatable-input'
                    placeholder='Cerca...'
                    type='search'
                    title='Cerca i prodotti'
                    aria-controls='dataTableOne'
                />
            </div>
        </>
    );
};

export default ProductsTableTop;

ProductsTableTop.propTypes = {
    setSearch: PropTypes.func,
    setStatus: PropTypes.func,
    status: PropTypes.string,
};
