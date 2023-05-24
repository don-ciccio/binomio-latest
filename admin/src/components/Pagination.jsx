import PropTypes from "prop-types";

const Pagination = ({
    page,
    pageCount,
    total,
    limit,
    setPage,
    handlePrevious,
    handleNext,
}) => {
    const totalPages = Math.ceil(total / limit);

    const onClick = (newPage) => {
        setPage(newPage + 1);
    };
    return (
        <div className='datatable-bottom'>
            <div className='datatable-info'>
                Pagina {page} di {pageCount}
            </div>
            <nav className='datatable-pagination'>
                <ul>
                    <li>
                        <a onClick={() => handlePrevious()}>‹</a>
                    </li>
                    {totalPages > 0 &&
                        [...Array(totalPages)].map((val, index) => (
                            <li
                                className={
                                    page === index + 1 ? "datatable-active" : ""
                                }
                                key={index}
                            >
                                <a onClick={() => onClick(index)}>
                                    {index + 1}
                                </a>
                            </li>
                        ))}
                    <li>
                        <a onClick={() => handleNext()}>›</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;

Pagination.propTypes = {
    page: PropTypes.number,
    pageCount: PropTypes.number,
    total: PropTypes.number,
    limit: PropTypes.number,
    setPage: PropTypes.func,
    handlePrevious: PropTypes.func,
    handleNext: PropTypes.func,
};
