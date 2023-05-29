import Breadcrumb from "@/components/common/BreadCrumb";
import AddButton from "@/components/common/AddButton";
import TableTop from "@/components/categoryTable/TableTop";
import { useState } from "react";

import { useGetCategories } from "@/store/react-query/hooks/useQueries";
import CategoryTable from "@/components/categoryTable/CategoryTable";

const Categories = () => {
    const [search, setSearch] = useState("");
    const { data: categories, isLoading } = useGetCategories({ search });

    return (
        <>
            <Breadcrumb pageName='Categorie' />
            <AddButton link={"/categories/add"} label={"Aggiungi Categoria"} />
            <div className='flex flex-col gap-5 md:gap-7 2xl:gap-10'>
                <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                    <div className='data-table-common data-table-one max-w-full overflow-x-auto'>
                        <TableTop setSearch={(search) => setSearch(search)} />
                        <div className='datatable-container'>
                            <CategoryTable
                                isLoading={isLoading}
                                categories={categories}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Categories;
