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
    DialogPanel,
    Title,
    Dialog,
    Button,
} from "@tremor/react";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";

import axios from "axios";
import TableLoader from "../common/TableLoader";
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

    const deleteCategory = async (id) => {
        await axios.delete(`${API_URL}/api/admin/category/delete?_id=${id}`);
        queryClient.invalidateQueries(["categories"], { type: "all" });
    };

    return (
        <>
            {selectedCategory.number_of_product > 0 ? (
                <Dialog
                    open={modal}
                    onClose={() => setModal(!modal)}
                    static={true}
                >
                    <DialogPanel>
                        <Title className='mb-3'>
                            {`Impossibile Eliminare ${selectedCategory.name}`}
                        </Title>
                        Non è possibile eliminare questa categoria perché
                        contiene dei prodotti.
                        <div className='mt-3'>
                            <Button
                                variant='light'
                                onClick={() => setModal(!modal)}
                            >
                                Ricevuto!
                            </Button>
                        </div>
                    </DialogPanel>
                </Dialog>
            ) : (
                <Dialog
                    open={modal}
                    onClose={() => setModal(!modal)}
                    static={true}
                >
                    <DialogPanel>
                        <Title className='mb-3'>
                            {`Elimina ${selectedCategory.name}`}
                        </Title>
                        Sei sicuro di voler eliminare questa categoria?
                        <div className='flex justify-between mt-3'>
                            <Button
                                variant='primary'
                                onClick={() => setModal(!modal)}
                            >
                                Annulla
                            </Button>
                            <Button
                                variant='primary'
                                color='red'
                                onClick={() => {
                                    deleteCategory(selectedCategory._id);
                                    setModal(!modal);
                                }}
                            >
                                Elimina
                            </Button>
                        </div>
                    </DialogPanel>
                </Dialog>
            )}
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
                                                    variant='light'
                                                    tooltip='Modifica'
                                                    size='sm'
                                                />
                                            </Link>
                                            <Link
                                                onClick={toggle(category._id)}
                                            >
                                                <Icon
                                                    icon={TrashIcon}
                                                    variant='light'
                                                    tooltip='Elimina'
                                                    size='sm'
                                                    color='red'
                                                />
                                            </Link>
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
