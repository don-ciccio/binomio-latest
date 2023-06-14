import Breadcrumb from "@/components/common/BreadCrumb";
import TableLoader from "@/components/common/TableLoader";

import ContentForm from "@/components/ContentForm";
import { useGetContent } from "@/store/react-query/hooks/useQueries";

const Content = () => {
    const { data, isLoading } = useGetContent();

    if (isLoading)
        return (
            <div className='flex items-center justify-center h-screen'>
                <TableLoader />
            </div>
        );

    return (
        <>
            <Breadcrumb pageName='Tema' />
            <ContentForm {...data?.data.content} />
        </>
    );
};

export default Content;
