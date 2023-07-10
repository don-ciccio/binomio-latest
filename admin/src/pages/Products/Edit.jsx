import Breadcrumb from "@/components/common/BreadCrumb";
import AddProductForm from "@/components/AddProductForm";
import Loader from "@/components/common/Loader";

import { useGetProductById } from "@/store/react-query/hooks/useQueries";
import { useParams } from "react-router-dom";

const Edit = () => {
    const { id } = useParams();

    const { data: product, isLoading } = useGetProductById(id);

    if (isLoading)
        return (
            <div className='flex items-center justify-center h-screen'>
                <Loader />
            </div>
        );

    return (
        <>
            <Breadcrumb pageName='Modifica Prodotto' />

            <AddProductForm {...product.data.product} />
        </>
    );
};

export { Edit as EditProduct };
