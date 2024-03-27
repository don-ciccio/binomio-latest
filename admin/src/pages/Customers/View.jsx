import { useParams } from "react-router-dom";
import { useGetUserById } from "../../store/react-query/hooks/useQueries";
import Loader from "@/components/common/Loader";
import { Metric, Badge } from "@tremor/react";

const View = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetUserById(id);

    console.log(data?.data);
    if (isLoading)
        return (
            <div className='flex items-center justify-center h-screen'>
                <Loader />
            </div>
        );

    return (
        <div className='px-3 xl:px-20 py-12'>
            <div className='flex p-1 mb-4'>
                <Metric>{data?.data.user.name}</Metric>
            </div>
        </div>
    );
};

export { View as ViewCustomer };
