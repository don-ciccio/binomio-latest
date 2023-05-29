import Breadcrumb from "@/components/common/BreadCrumb";
import AddCategoryForm from "@/components/AddCategoryForm";

const Add = () => {
    return (
        <>
            <Breadcrumb pageName='Aggiungi Categoria' />
            <AddCategoryForm />
        </>
    );
};

export { Add as AddCategory };
