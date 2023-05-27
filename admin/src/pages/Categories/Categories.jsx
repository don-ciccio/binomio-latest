import Breadcrumb from "@/components/common/BreadCrumb";
import AddButton from "@/components/common/AddButton";

const Categories = () => {
    return (
        <>
            <Breadcrumb pageName='Categorie' />
            <AddButton link={"/categories/add"} label={"Aggiungi Categoria"} />
        </>
    );
};

export default Categories;
