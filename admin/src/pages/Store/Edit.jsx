import AddStoreForm from "@/components/AddStoreForm";
import Loader from "@/components/common/Loader";

import { useParams } from "react-router-dom";
import { useGetStoreById } from "@/store/react-query/hooks/useQueries";

const Edit = () => {
    const { id } = useParams();

    const { data: store, isLoading } = useGetStoreById(id);

    if (isLoading)
        return (
            <div className='flex items-center justify-center h-screen'>
                <Loader />
            </div>
        );

    return (
        <div className='h-full w-full bg-gray-50 px-3 py-5 xl:px-20 xl:py-12'>
            <AddStoreForm {...store?.data} />
        </div>
    );
};

export { Edit as EditStore };
