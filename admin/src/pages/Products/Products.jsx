import { useContext, useState } from "react";

import { useGetProducts } from "@/store/react-query/hooks/useQueries";

import ProductTable from "@/components/product/ProductTable";
import NotFound from "@/components/table/NotFound";

import MainDrawer from "@/components/drawer/MainDrawer";
import ProductDrawer from "@/components/drawer/ProductDrawer";

import { SidebarContext } from "@/context/SidebarContext";
import SelectCategory from "@/components/form/SelectCategory";
import CheckBox from "@/components/form/CheckBox";

import {
    Table,
    TableHeader,
    TableCell,
    TableFooter,
    TableContainer,
    Select,
    Input,
    Button,
    Card,
    CardBody,
    Pagination,
} from "@windmill/react-ui";
import { FiPlus } from "react-icons/fi";
import { FiEdit, FiTrash2 } from "react-icons/fi";

import { useGetCategories } from "../../store/react-query/hooks/useQueries";
import PageTitle from "../../components/typography/PageTitle";
import UploadManyTwo from "../../components/common/UploadManyTwo";
import TableLoading from "../../components/preloader/TableLoading";
import useToggleDrawer from "@/hooks/useToggleDrawer";

const Products = () => {
    const [sort, setSort] = useState({ sort: "name", order: "asc" });

    const { title, allId, serviceId, handleDeleteMany, handleUpdateMany } =
        useToggleDrawer();

    const {
        toggleDrawer,
        searchRef,
        handleSubmitForAll,
        searchText,
        handleChangePage,
        currentPage,
        setCategory,
        category,
    } = useContext(SidebarContext);

    const { data: categories } = useGetCategories({ searchText });
    const {
        data: products,
        isLoading: fetchingProducts,
        isError: error,
    } = useGetProducts({
        page: currentPage,
        sort,
        filterCategory: category,
        status,
        search: searchText,
    });

    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);

    const handleSelectAll = () => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(products?.products.map((li) => li._id));
        if (isCheckAll) {
            setIsCheck([]);
        }
    };

    return (
        <>
            <PageTitle>{"Prodotti"}</PageTitle>
            <MainDrawer>
                <ProductDrawer id={serviceId} />
            </MainDrawer>
            <Card className='min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5'>
                <CardBody className=''>
                    <form className='py-3 md:pb-0 grid gap-4 lg:gap-6 xl:gap-6  xl:flex'>
                        <div className='flex justify-start xl:w-1/2  md:w-full'>
                            <UploadManyTwo title='Products' />
                        </div>
                        <div className='lg:flex  md:flex xl:justify-end xl:w-1/2  md:w-full md:justify-start flex-grow-0'>
                            <div className='w-full md:w-40 lg:w-40 xl:w-40 mr-3 mb-3 lg:mb-0'>
                                <Button
                                    disabled={isCheck.length < 1}
                                    className='w-full rounded-md h-12 btn-gray text-gray-600 sm:mb-3'
                                >
                                    <span className='mr-2'>
                                        <FiEdit />
                                    </span>
                                    {"BulkAction"}
                                </Button>
                            </div>

                            <div className='w-full md:w-32 lg:w-32 xl:w-32 mr-3 mb-3 lg:mb-0'>
                                <Button
                                    disabled={isCheck?.length < 1}
                                    className='w-full rounded-md h-12 bg-red-300 disabled btn-red'
                                >
                                    <span className='mr-2'>
                                        <FiTrash2 />
                                    </span>

                                    {"Delete"}
                                </Button>
                            </div>
                            <div className='w-full md:w-48 lg:w-48 xl:w-48'>
                                <Button
                                    onClick={toggleDrawer}
                                    className='w-full rounded-md h-12'
                                >
                                    <span className='mr-2'>
                                        <FiPlus />
                                    </span>
                                    {"AddProduct"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardBody>
            </Card>
            <Card className='min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4'>
                <CardBody>
                    <form
                        onSubmit={handleSubmitForAll}
                        className='py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex'
                    >
                        <div className='flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow'>
                            <Input
                                ref={searchRef}
                                className='border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white'
                                type='search'
                                name='search'
                                placeholder='Search Product'
                            />
                            <button
                                type='submit'
                                className='absolute right-0 top-0 mt-5 mr-1'
                            ></button>
                        </div>

                        <div className='flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow'>
                            <SelectCategory
                                data={categories}
                                setCategory={setCategory}
                            />
                        </div>

                        <div className='flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow'>
                            <Select
                                onChange={(e) =>
                                    setSort({
                                        sort: e.target.value.split(",")[0],
                                        order: e.target.value.split(",")[1],
                                    })
                                }
                                className='border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white'
                            >
                                <option value='All' defaultValue hidden>
                                    {"Ordina"}
                                </option>
                                <option value='price,asc'>Prezzo (asc)</option>
                                <option value='price,desc'>
                                    Prezzo (desc)
                                </option>
                                <option value='name,asc'>Nome (asc)</option>
                                <option value='name,desc'>Nome (desc)</option>
                                <option value='stock,status-selling'>
                                    In vendita
                                </option>
                                <option value='stock,status-out-of-stock'>
                                    Terminato
                                </option>
                                <option value='status,Attivo'>Attivo</option>
                                <option value='status,Bozza'>Bozza</option>
                            </Select>
                        </div>
                    </form>
                </CardBody>
            </Card>

            {fetchingProducts ? (
                <TableLoading row={12} col={7} width={160} height={20} />
            ) : error ? (
                <span className='text-center mx-auto text-red-500'>
                    {error}
                </span>
            ) : products?.length !== 0 ? (
                <TableContainer className='mb-8 rounded-b-lg'>
                    <Table>
                        <TableHeader>
                            <tr>
                                <TableCell>
                                    <CheckBox
                                        type='checkbox'
                                        name='selectAll'
                                        id='selectAll'
                                        isChecked={isCheckAll}
                                        handleClick={handleSelectAll}
                                    />
                                </TableCell>
                                <TableCell>{"Nome"}</TableCell>
                                <TableCell>{"Categoria"}</TableCell>
                                <TableCell>{"Prezzo"}</TableCell>
                                <TableCell>Sconto</TableCell>
                                <TableCell>{"Stock"}</TableCell>
                                <TableCell>{"Status"}</TableCell>
                                <TableCell className='text-center'>
                                    {"Dettagli"}
                                </TableCell>
                                <TableCell className='text-center'>
                                    {"Pubblicato"}
                                </TableCell>
                                <TableCell className='text-right'>
                                    {"Azioni"}
                                </TableCell>
                            </tr>
                        </TableHeader>
                        <ProductTable
                            isCheck={isCheck}
                            products={products?.products}
                            setIsCheck={setIsCheck}
                        />
                    </Table>
                    <TableFooter>
                        <Pagination
                            totalResults={products?.total}
                            resultsPerPage={products?.limit}
                            onChange={handleChangePage}
                            label='Product Page Navigation'
                        />
                    </TableFooter>
                </TableContainer>
            ) : (
                <NotFound title='Product' />
            )}
        </>
    );
};

export default Products;
