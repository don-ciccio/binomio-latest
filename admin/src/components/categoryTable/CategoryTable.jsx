import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableBody,
    Icon,
} from "@tremor/react";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";

import axios from "axios";
import TableLoader from "../common/TableLoader";
import DangerModal from "../common/DangerModal";
axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API_URL;
const CategoryTable = ({ isLoading, categories }) => {
    const [modal, setModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({});
    const queryClient = useQueryClient();

    const toggle = useCallback(
        (id) => () => {
            setModal(!modal);
            const view = categories?.find(({ _id }) => {
                return _id === id;
            });

            setSelectedCategory(view);
        },
        [categories, modal]
    );
    console.log(categories);

    const deleteCategory = async (id) => {
        await axios.delete(`${API_URL}/api/admin/category/delete?_id=${id}`);
        queryClient.invalidateQueries(["categories"], { type: "all" });
    };

    return (
        <>
            {isLoading ? (
                <TableLoader />
            ) : (
                <Table className='mt-6'>
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell></TableHeaderCell>
                            <TableHeaderCell>Categoria</TableHeaderCell>
                            <TableHeaderCell>Collezione</TableHeaderCell>
                            <TableHeaderCell>Prodotti</TableHeaderCell>
                            <TableHeaderCell>Azione</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category, index) => (
                            <TableRow key={index}>
                                <>
                                    <TableCell className='p-0 lg:p-4'>
                                        {category.images?.length > 0 && (
                                            <img
                                                src={category.images[0]}
                                                alt={category.name}
                                                className='w-8 md:w-14 md:rounded-lg md:border'
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>
                                        {category?.parent?.name}
                                    </TableCell>
                                    <TableCell>
                                        {category?.number_of_product}
                                    </TableCell>

                                    <TableCell>
                                        <div className='flex gap-1.5 items-center'>
                                            <Link to={`${category._id}`}>
                                                <Icon
                                                    icon={PencilSquareIcon}
                                                    variant='outlined'
                                                    tooltip='Modifica'
                                                    size='sm'
                                                />
                                            </Link>
                                            <Link
                                                onClick={toggle(category._id)}
                                            >
                                                <Icon
                                                    icon={TrashIcon}
                                                    variant='outlined'
                                                    tooltip='Elimina'
                                                    size='sm'
                                                    color='red'
                                                />
                                            </Link>
                                            {selectedCategory.number_of_product >
                                            0 ? (
                                                <DangerModal
                                                    show={modal}
                                                    close={() =>
                                                        setModal(!modal)
                                                    }
                                                    cancel={false}
                                                    onClick={() =>
                                                        setModal(!modal)
                                                    }
                                                    title={`Impossibile Eliminare ${selectedCategory.name}`}
                                                    text={
                                                        "Non è possibile eliminare questa categoria perché contiene dei prodotti."
                                                    }
                                                />
                                            ) : (
                                                <DangerModal
                                                    cancel={true}
                                                    show={modal}
                                                    close={() =>
                                                        setModal(!modal)
                                                    }
                                                    onClick={() => {
                                                        deleteCategory(
                                                            selectedCategory._id
                                                        );
                                                        setModal(!modal);
                                                    }}
                                                    title={`Elimina ${selectedCategory.name}`}
                                                    text={
                                                        "Sei sicuro di voler eliminare questa categoria?"
                                                    }
                                                />
                                            )}
                                        </div>
                                    </TableCell>
                                </>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </>
    );
};

export default CategoryTable;

CategoryTable.propTypes = {
    isLoading: PropTypes.bool,
    categories: PropTypes.array,
};
