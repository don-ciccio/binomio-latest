import { useGetProducts } from "@/store/react-query/hooks/useQueries";

import ProductsTable from "@/components/productTable/ProductsTable";

import { useState } from "react";

import { Card, Flex, Icon, TextInput } from "@tremor/react";
import {
    InformationCircleIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

import CategoryTableTop from "@/components/productTable/CategoryTableTop";
import Pagination from "@/components/productTable/Pagination";
import { useGetCategories } from "../../store/react-query/hooks/useQueries";
import { Link } from "react-router-dom";

const Products = () => {
    const [sort, setSort] = useState({ sort: "price", order: "asc" });
    const [filterCategory, setFilterCategory] = useState([]);
    const [status, setStatus] = useState("All");
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const { data: categories } = useGetCategories({ search });
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

    return (
        <div className='h-full w-full bg-gray-50 px-3 py-5 xl:px-20 xl:py-12'>
            <Flex
                className='w-full justify-between'
                justifyContent='start'
                alignItems='center'
            >
                <div className='flex items-center'>
                    <h3 className='text-xl font-semibold text-gray-900'>
                        Prodotti
                    </h3>
                    <Icon
                        icon={InformationCircleIcon}
                        variant='simple'
                        tooltip='Mostra prodotti'
                    />
                </div>

                <div>
                    <Link
                        className='hidden p-2 rounded border border-gray-300 bg-white px-8 text-base font-medium text-gray-700 transition-all hover:border-blue-500 hover:bg-blue-500 hover:text-white sm:block'
                        to={"add"}
                    >
                        Aggiungi prodotto
                    </Link>
                </div>
            </Flex>

            <Card shadow={"false"} className='mt-6'>
                <div className='flex flex-col md:flex-row md:space-x-2 gap-2'>
                    <TextInput
                        onValueChange={(search) => setSearch(search)}
                        icon={MagnifyingGlassIcon}
                        placeholder='Cerca...'
                    />

                    <CategoryTableTop
                        categories={categories}
                        filterCategory={filterCategory}
                        setFilterCategory={(filterCategory) =>
                            setFilterCategory(filterCategory)
                        }
                        setSelectedStatus={(status) => setStatus(status)}
                    />
                </div>

                <div>
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
                    pageCount={products?.pageCount ? products.pageCount : 1}
                    setPage={(page) => setPage(page)}
                    handlePrevious={handlePrevious}
                    handleNext={handleNext}
                />
            </Card>
        </div>
    );
};

export default Products;
