import Breadcrumb from "@/components/common/BreadCrumb";
import AddCategoryForm from "@/components/AddCategoryForm";
import Loader from "@/components/common/Loader";

import { useGetCategoryById } from "@/store/react-query/hooks/useQueries";
import { useParams } from "react-router-dom";

const Edit = () => {
    const { id } = useParams();

    const { data: category, isLoading } = useGetCategoryById(id);

    if (isLoading)
        return (
            <div className='flex items-center justify-center h-screen'>
                <Loader />
            </div>
        );

    return (
        <>
            <Breadcrumb pageName='Modifica Prodotto' />

            <AddCategoryForm {...category?.data} />
        </>
    );
};

export { Edit as EditCategory };
