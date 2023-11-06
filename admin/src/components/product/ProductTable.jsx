import {
    Avatar,
    Badge,
    TableBody,
    TableCell,
    TableRow,
} from "@windmill/react-ui";
import { FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";

//internal import

import CheckBox from "@/components/form/CheckBox";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import ShowHideButton from "@/components/table/ShowHideButton";
import Tooltip from "@/components/tooltip/Tooltip";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import ProductDrawer from "../drawer/ProductDrawer";
import MainDrawer from "../drawer/MainDrawer";

//internal import

const ProductTable = ({ products, isCheck, setIsCheck }) => {
    const { title, serviceId, handleModalOpen, handleUpdate } =
        useToggleDrawer();

    const handleClick = (e) => {
        const { id, checked } = e.target;
        // console.log("id", id, checked);

        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== id));
        }
    };

    return (
        <>
            {isCheck?.length < 2 && (
                <MainDrawer>
                    <ProductDrawer id={serviceId} />
                </MainDrawer>
            )}

            <TableBody>
                {products?.map((product, i) => (
                    <TableRow key={i + 1}>
                        <TableCell>
                            <CheckBox
                                type='checkbox'
                                name={product?.name}
                                id={product._id}
                                handleClick={handleClick}
                                isChecked={isCheck?.includes(product._id)}
                            />
                        </TableCell>

                        <TableCell>
                            <div className='flex items-center'>
                                {product?.images[0] ? (
                                    <Avatar
                                        className='hidden p-1 mr-2 md:block bg-gray-50 shadow-none'
                                        src={product?.images[0]}
                                        alt='product'
                                    />
                                ) : (
                                    <Avatar
                                        src={`https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png`}
                                        alt='product'
                                    />
                                )}
                                <div>
                                    <h2 className='text-sm font-semibold'>
                                        {product?.name.substring(0, 28)}
                                    </h2>
                                </div>
                            </div>
                        </TableCell>

                        <TableCell>
                            <span className='text-sm'>
                                {product?.category?.name}
                            </span>
                        </TableCell>

                        <TableCell>
                            <span className='text-sm font-semibold'>
                                €{product.price}
                            </span>
                        </TableCell>

                        <TableCell>
                            <span className='text-sm font-semibold'>
                                €{product.price}
                            </span>
                        </TableCell>

                        <TableCell>
                            <span className='text-sm'>{product.stock}</span>
                        </TableCell>
                        <TableCell>
                            {product.stock > 0 ? (
                                <Badge className='font-semibold' type='success'>
                                    {"In vendita"}
                                </Badge>
                            ) : (
                                <Badge className='font-semibold' type='danger'>
                                    {"Terminato"}
                                </Badge>
                            )}
                        </TableCell>
                        <TableCell>
                            <Link
                                to={`/products/${product._id}`}
                                className='flex justify-center text-gray-400 hover:text-green-600'
                            >
                                <Tooltip
                                    id='view'
                                    Icon={FiZoomIn}
                                    title={"DetailsTbl"}
                                    bgColor='#10B981'
                                />
                            </Link>
                        </TableCell>
                        <TableCell className='text-center'>
                            <ShowHideButton
                                id={product._id}
                                status={product.status}
                            />
                            {/* {product.status} */}
                        </TableCell>
                        <TableCell>
                            <EditDeleteButton
                                id={product._id}
                                product={product}
                                isCheck={isCheck}
                                handleUpdate={handleUpdate}
                                handleModalOpen={handleModalOpen}
                                title={product?.name}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </>
    );
};

export default ProductTable;
