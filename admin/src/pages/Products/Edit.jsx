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
        <div className='h-full w-full bg-gray-50 px-3 py-5 xl:px-20 xl:py-12'>
            <AddProductForm {...product.data.product} />
        </div>
    );
};

export { Edit as EditProduct };
