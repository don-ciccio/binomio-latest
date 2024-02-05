import AddProductForm from "@/components/AddProductForm";
import Loader from "@/components/common/Loader";
import { Metric } from "@tremor/react";
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
            <div className='flex p-1 mb-4'>
                <Metric>{product.data.product.name}</Metric>
            </div>
            <AddProductForm {...product.data.product} />
        </div>
    );
};

export { Edit as EditProduct };
