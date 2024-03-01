import { useGetReservations } from "../../store/react-query/hooks/useQueries";
import TableLoader from "../common/TableLoader";
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
import { format, parseISO } from "date-fns";

const BookingTable = ({ id }) => {
    const { data: reservations, isLoading } = useGetReservations(id);
    if (isLoading) return <div>Loading...</div>;
    console.log(reservations.data);
    return (
        <>
            {isLoading ? (
                <TableLoader />
            ) : (
                <Table className='mt-6'>
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell>Giorno</TableHeaderCell>
                            <TableHeaderCell>Nome</TableHeaderCell>
                            <TableHeaderCell>Email</TableHeaderCell>
                            <TableHeaderCell>Telefono</TableHeaderCell>
                            <TableHeaderCell>Persone</TableHeaderCell>
                            <TableHeaderCell>Orario</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reservations.data.map((day) =>
                            day.tables?.map(
                                (table, i) =>
                                    table.isAvailable === false && (
                                        <TableRow key={i}>
                                            <TableCell className='p-0 lg:p-4'>
                                                {format(
                                                    parseISO(day.date),
                                                    "dd/MM/yyyy"
                                                )}
                                            </TableCell>
                                            <TableCell className='p-0 lg:p-4'>
                                                {table.reservation.firstName}
                                            </TableCell>
                                            <TableCell className='p-0 lg:p-4'>
                                                {table.reservation.email}
                                            </TableCell>
                                            <TableCell className='p-0 lg:p-4'>
                                                {table.reservation.phoneNumber}
                                            </TableCell>
                                            <TableCell className='p-0 lg:p-4'>
                                                {table.reservation.size}
                                            </TableCell>
                                            <TableCell className='p-0 lg:p-4'>
                                                {format(
                                                    table.reservation.time,
                                                    "HH:mm"
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    )
                            )
                        )}
                    </TableBody>
                </Table>
            )}
        </>
    );
};

export default BookingTable;
