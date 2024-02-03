import { Metric } from "@tremor/react";
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
        <div className='h-full w-full bg-gray-50 px-3 py-5 xl:px-20 xl:py-12'>
            <div className='flex p-1 mb-2'>
                <Metric>{category?.data.name}</Metric>
            </div>

            <AddCategoryForm {...category?.data} />
        </div>
    );
};

export { Edit as EditCategory };
