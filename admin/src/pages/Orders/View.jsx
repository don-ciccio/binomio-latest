import { useParams } from "react-router-dom";
import { useGetOrderById } from "../../store/react-query/hooks/useQueries";
import Loader from "@/components/common/Loader";
import { Metric } from "@tremor/react";

const View = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetOrderById(id);

    if (isLoading)
        return (
            <div className='flex items-center justify-center h-screen'>
                <Loader />
            </div>
        );

    return (
        <div className='px-3 xl:px-20 py-12'>
            <div className='flex p-1 mb-4'>
                <Metric>#{data?.data.order.orderId}</Metric>
            </div>
        </div>
    );
};

export { View as ViewOrder };
