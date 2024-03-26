import { useGetOrders } from "../../store/react-query/hooks/useQueries";
import {
    Card,
    Flex,
    Icon,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableBody,
    Badge,
} from "@tremor/react";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { CustomDatePicker } from "../../components/common/CustomDatePicker";
import { useState } from "react";
import TableLoader from "../../components/common/TableLoader";
import { format, parseISO } from "date-fns";
import { formatCurrency } from "../../utils";

const Orders = () => {
    const { data, isLoading } = useGetOrders();
    const [startDate, setStartDate] = useState(new Date());
    const handleDay = (date) => {
        setStartDate(new Date(date.setHours(0, 0, 0, 0)));
    };
    console.log(data?.data);
    return (
        <div className='h-full w-full bg-gray-50 px-3 xl:px-20 py-12'>
            <Flex
                className='w-full justify-between'
                justifyContent='start'
                alignItems='center'
            >
                <div className='flex items-center'>
                    <h3 className='text-xl font-semibold text-gray-900'>
                        Ordini
                    </h3>
                    <Icon
                        icon={InformationCircleIcon}
                        variant='simple'
                        tooltip='Mostra ordini'
                    />
                </div>
            </Flex>
            <Card shadow={"false"} className='mt-6'>
                <CustomDatePicker
                    selected={startDate}
                    onChange={(date) => handleDay(date)}
                    minDate={new Date()}
                />

                <div className='mt-14'>
                    {isLoading ? (
                        <TableLoader />
                    ) : data.data.orders.length > 0 ? (
                        <Table className='mt-6'>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderCell>Ordine</TableHeaderCell>
                                    <TableHeaderCell>Data</TableHeaderCell>
                                    <TableHeaderCell>Cliente</TableHeaderCell>
                                    <TableHeaderCell>Totale</TableHeaderCell>
                                    <TableHeaderCell>
                                        Stato del pagamento
                                    </TableHeaderCell>
                                    <TableHeaderCell>Articoli</TableHeaderCell>
                                    <TableHeaderCell>
                                        Stato della consegna
                                    </TableHeaderCell>
                                    <TableHeaderCell>
                                        Orario consegna
                                    </TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.data.orders.map((order, i) => (
                                    <TableRow key={i}>
                                        <TableCell className='p-0 lg:p-4'>
                                            #{order.orderId}
                                        </TableCell>
                                        <TableCell className='p-0 lg:p-4'>
                                            {format(
                                                parseISO(order.paidAt),
                                                "dd/MM/yyyy"
                                            )}
                                        </TableCell>
                                        <TableCell className='p-0 lg:p-4'>
                                            {order.user.name}
                                        </TableCell>
                                        <TableCell className='p-0 lg:p-4'>
                                            {formatCurrency(order.totalPrice)}
                                        </TableCell>
                                        <TableCell className='p-0 lg:p-4'>
                                            <Badge
                                                color={
                                                    order.isPaid === true
                                                        ? "green"
                                                        : "red"
                                                }
                                            >
                                                {order.isPaid === true
                                                    ? "Pagato"
                                                    : "Annullato"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className='p-0 lg:p-4'>
                                            {order.orderItems.length}
                                        </TableCell>
                                        <TableCell className='p-0 lg:p-4'>
                                            {order.orderStatus}
                                        </TableCell>
                                        <TableCell className='p-0 lg:p-4'>
                                            {format(
                                                order.shippingInfo.time,
                                                "HH:mm"
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        data.data.orders.length === 0 && (
                            <div className='flex items-center justify-center mt-8 '>
                                <span className='text-[#6B7280] font-semibold'>
                                    Non ci sono ordini.
                                </span>
                            </div>
                        )
                    )}
                </div>
            </Card>
        </div>
    );
};

export default Orders;
