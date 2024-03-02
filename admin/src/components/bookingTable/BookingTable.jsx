import { useGetReservations } from "../../store/react-query/hooks/useQueries";
import TableLoader from "../common/TableLoader";
import {
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableBody,
} from "@tremor/react";
import { format, parseISO } from "date-fns";

const BookingTable = ({ id, date }) => {
    const { data: reservations, isLoading } = useGetReservations({ id, date });
    console.log(reservations);
    return (
        <>
            {isLoading ? (
                <TableLoader />
            ) : reservations.data.length > 0 ? (
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
            ) : (
                <div className='flex items-center justify-center mt-8 '>
                    <span className='text-[#6B7280] font-semibold'>
                        Non ci sono prenotazioni per oggi.
                    </span>
                </div>
            )}
        </>
    );
};

export default BookingTable;
