import Breadcrumb from "@/components/common/BreadCrumb";
import AddProductForm from "@/components/AddProductForm";

const Add = () => {
    return (
        <>
            <Breadcrumb pageName='Aggiungi Prodotto' />
            <AddProductForm />
        </>
    );
};

export { Add as AddProduct };
