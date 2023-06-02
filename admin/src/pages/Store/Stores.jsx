import Breadcrumb from "@/components/common/BreadCrumb";
import AddButton from "@/components/common/AddButton";
import StoresTable from "@/components/storesTable/StoresTable";
import { useGetStores } from "@/store/react-query/hooks/useQueries";

const Stores = () => {
    const { data: stores, isLoading } = useGetStores();

    return (
        <>
            <Breadcrumb pageName='Sedi' />
            <AddButton link={"/stores/add"} label={"Aggiungi Sede"} />
            <div className='flex flex-col gap-5 md:gap-7 2xl:gap-10'>
                <StoresTable data={stores} isLoading={isLoading} />
            </div>
        </>
    );
};

export default Stores;
