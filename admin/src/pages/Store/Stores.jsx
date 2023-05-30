import Breadcrumb from "@/components/common/BreadCrumb";
import AddButton from "@/components/common/AddButton";

const Stores = () => {
    return (
        <>
            <Breadcrumb pageName='Sedi' />
            <AddButton link={"/stores/add"} label={"Aggiungi Sede"} />
        </>
    );
};

export default Stores;
