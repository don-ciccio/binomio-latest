import Breadcrumb from "@/components/BreadCrumb";

import { useGetProducts } from "@/store/react-query/hooks/useQueries";

import ProductsTable from "@/components/ProductsTable";
import AddProductButton from "../../components/AddProductButton";

import { useState } from "react";

import ProductsTableTop from "@/components/ProductsTableTop";
import CategoryTableTop from "@/components/CategoryTableTop";
import Pagination from "@/components/Pagination";

const Products = () => {
    const [sort, setSort] = useState({ sort: "price", order: "asc" });
    const [filterCategory, setFilterCategory] = useState([]);
    const [status, setStatus] = useState("All");
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const { data: products, isLoading: fetchingProducts } = useGetProducts({
        page,
        sort,
        filterCategory,
        status,
        search,
    });

    const handlePrevious = () => {
        setPage(() => {
            if (page === 1) return page;
            return page - 1;
        });
    };

    // handle next btn
    const handleNext = () => {
        setPage(() => {
            if (page === products?.pageCount) return page;
            return page + 1;
        });
    };

    console.log(products);
    return (
        <>
            <Breadcrumb pageName='Prodotti' />
            <AddProductButton />
            <div className='flex flex-col gap-5 md:gap-7 2xl:gap-10'>
                <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                    <div className='data-table-common data-table-one max-w-full overflow-x-auto'>
                        <ProductsTableTop
                            setSearch={(search) => setSearch(search)}
                            setStatus={(status) => setStatus(status)}
                            status={status}
                        />
                        <CategoryTableTop
                            categories={
                                products?.category ? products.category : []
                            }
                            filterCategory={filterCategory}
                            setFilterCategory={(filterCategory) =>
                                setFilterCategory(filterCategory)
                            }
                        />
                        <div className='datatable-container'>
                            <ProductsTable
                                data={products}
                                isLoading={fetchingProducts}
                                setSort={(sort) => setSort(sort)}
                                sort={sort}
                            />
                        </div>
                        <Pagination
                            page={page}
                            limit={products?.limit ? products.limit : 0}
                            total={products?.total ? products.total : 0}
                            pageCount={
                                products?.pageCount ? products.pageCount : 1
                            }
                            setPage={(page) => setPage(page)}
                            handlePrevious={handlePrevious}
                            handleNext={handleNext}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Products;
