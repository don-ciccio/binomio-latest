import Breadcrumb from "@/components/common/BreadCrumb";
import AddStoreForm from "@/components/AddStoreForm";

const Add = () => {
    return (
        <>
            <Breadcrumb pageName='Aggiungi Sede' />
            <AddStoreForm />
        </>
    );
};

export { Add as AddStore };
