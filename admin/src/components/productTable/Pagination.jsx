import PropTypes from "prop-types";
import { Text } from "@tremor/react";
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
        <div className='flex justify-between mt-5 items-center'>
            <nav>
                <ul className='list-style-none flex'>
                    <li>
                        <a
                            className=' cursor-pointer relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white'
                            onClick={() => handlePrevious()}
                        >
                            ‹
                        </a>
                    </li>
                    {totalPages > 0 &&
                        [...Array(totalPages)].map((val, index) => (
                            <li
                                className={
                                    page === index + 1
                                        ? "cursor-pointer relative block rounded bg-blue-500 px-3 py-1.5 text-sm font-medium text-white transition-all duration-300"
                                        : "cursor-pointer relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                                }
                                key={index}
                            >
                                <a onClick={() => onClick(index)}>
                                    {index + 1}
                                </a>
                            </li>
                        ))}
                    <li>
                        <a
                            className='cursor-pointer relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white'
                            onClick={() => handleNext()}
                        >
                            ›
                        </a>
                    </li>
                </ul>
            </nav>
            <Text className='mr-5'>
                Pagina {page} di {pageCount}
            </Text>
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
