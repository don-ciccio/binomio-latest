import PropTypes from "prop-types";
import { changeProductStatus } from "@/store/react-query/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../common/Modal";
import View from "@/pages/Products/View";
import {
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableBody,
    Icon,
    Switch,
} from "@tremor/react";
import { ArrowsUpDownIcon } from "@heroicons/react/20/solid";

const ProductsTable = ({ data, isLoading, sort, setSort }) => {
    const queryClient = useQueryClient();
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const [modal, setModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});

    const toggle = useCallback(
        (id) => () => {
            setModal(!modal);
            const view = data?.products.find(({ _id }) => {
                return _id === id;
            });

            setSelectedProduct(view);
        },
        [data?.products, modal]
    );

    const mutation = useMutation({
        mutationFn: ({ id, status }) => {
            return changeProductStatus(id, status);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["products"], { type: "all" });
        },
    });

    const handleSwitchChange = (id) => {
        setIsSwitchOn(!isSwitchOn);
        if (isSwitchOn) {
            mutation.mutate({ id: id, status: "Attivo" });
        } else {
            mutation.mutate({ id: id, status: "Bozza" });
        }
    };

    const onArrowPriceChange = () => {
        if (sort.order === "asc") {
            setSort({ sort: "price", order: "desc" });
        } else {
            setSort({ sort: "price", order: "asc" });
        }
    };

    const onArrowNameChange = () => {
        if (sort.order === "asc") {
            setSort({ sort: "name", order: "desc" });
        } else {
            setSort({ sort: "name", order: "asc" });
        }
    };

    const headings = ["Nome", "Prezzo", "Categoria", "Stato", "Azione"];

    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <Table className='mt-6'>
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell></TableHeaderCell>
                            <TableHeaderCell>
                                <a onClick={onArrowNameChange}>
                                    <div className='flex items-center justify-between gap-1.5'>
                                        <p>{headings[0]}</p>
                                        <div className='inline-flex flex-col space-y-[2px] cursor-pointer'>
                                            <Icon
                                                icon={ArrowsUpDownIcon}
                                                tooltip='Ordina'
                                            />
                                        </div>
                                    </div>
                                </a>
                            </TableHeaderCell>
                            <TableHeaderCell>
                                <a
                                    onClick={onArrowPriceChange}
                                    className='datatable-sorter'
                                >
                                    <div className='flex items-center justify-between gap-1.5'>
                                        <p>{headings[1]}</p>
                                        <div className='inline-flex flex-col space-y-[2px] cursor-pointer'>
                                            <Icon
                                                icon={ArrowsUpDownIcon}
                                                tooltip='Ordina'
                                            />
                                        </div>
                                    </div>
                                </a>
                            </TableHeaderCell>
                            <TableHeaderCell>Categoria</TableHeaderCell>
                            <TableHeaderCell>Stato</TableHeaderCell>
                            <TableHeaderCell>Azione</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.products.map((product, index) => (
                            <TableRow key={index}>
                                <>
                                    <TableCell className='p-0 lg:p-4'>
                                        <img
                                            src={product.images[0]}
                                            className='w-8 md:w-14 md:rounded-lg md:border md:p-1.5'
                                        />
                                    </TableCell>
                                    <TableCell className='items-start'>
                                        {product.name}
                                    </TableCell>
                                    <TableCell>
                                        <p>{product.price}€</p>
                                    </TableCell>
                                    <TableCell>
                                        <p>{product.category.name}</p>
                                    </TableCell>
                                    <TableCell>
                                        <Switch
                                            onChange={() =>
                                                handleSwitchChange(product._id)
                                            }
                                            checked={
                                                product.status === "Attivo"
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            to={`${product._id}`}
                                            className='rounded-full bg-green-200 py-[5px] px-3 text-xs text-green-900 transition-all hover:bg-green-100'
                                        >
                                            Modifica
                                        </Link>
                                        <Link
                                            onClick={toggle(product._id)}
                                            className='ml-3 rounded-full bg-orange-200 py-[5px] px-3 text-xs text-orange-900 transition-all hover:bg-orange-100'
                                        >
                                            Visualizza
                                        </Link>
                                        <Modal
                                            show={modal}
                                            close={() => setModal(!modal)}
                                        >
                                            <View data={selectedProduct} />
                                        </Modal>
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

export default ProductsTable;

ProductsTable.propTypes = {
    data: PropTypes.object,
    isLoading: PropTypes.bool,
    sort: PropTypes.object,
    setSort: PropTypes.func,
};
