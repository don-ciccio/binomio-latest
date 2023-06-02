import Breadcrumb from "@/components/common/BreadCrumb";
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
        <>
            <Breadcrumb pageName='Modifica Sede' />
            <AddStoreForm {...store?.data} />
        </>
    );
};

export { Edit as EditStore };
