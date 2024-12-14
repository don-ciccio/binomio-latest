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
} from "@tremor/react";
import { format, parseISO } from "date-fns";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { useGetAllUsers } from "../../store/react-query/hooks/useQueries";
import TableLoader from "../../components/common/TableLoader";
import { Link } from "react-router-dom";

const Customers = () => {
    const { data, isLoading } = useGetAllUsers();

    return (
        <div className='h-full w-full bg-gray-50 px-3 xl:px-20 py-12'>
            <Flex
                className='w-full justify-between'
                justifyContent='start'
                alignItems='center'
            >
                <div className='flex items-center'>
                    <h3 className='text-xl font-semibold text-gray-900'>
                        Clienti
                    </h3>
                    <Icon
                        icon={InformationCircleIcon}
                        variant='simple'
                        tooltip='Mostra clienti'
                    />
                </div>
            </Flex>
            <Card shadow={"false"} className='mt-6'>
                {isLoading ? (
                    <TableLoader />
                ) : data.data.users.length > 0 ? (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell>Email</TableHeaderCell>
                                <TableHeaderCell>Nome</TableHeaderCell>
                                <TableHeaderCell>Account</TableHeaderCell>
                                <TableHeaderCell>Creato</TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.data.users.map((user, i) => (
                                <TableRow key={i}>
                                    <TableCell className='p-0 lg:p-4'>
                                        {user.email}
                                    </TableCell>
                                    <TableCell className='p-0 lg:p-4'>
                                        <Link
                                            to={`/customers/${user._id}`}
                                            className='font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline'
                                        >
                                            {user.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell className='p-0 lg:p-4'>
                                        {user.role}
                                    </TableCell>
                                    <TableCell className='p-0 lg:p-4'>
                                        {format(
                                            parseISO(user.created_at),
                                            "dd/MM/yyyy"
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    data.data.users.length === 0 && (
                        <div className='flex items-center justify-center mt-8 '>
                            <span className='text-[#6B7280] font-semibold'>
                                Non ci sono clienti.
                            </span>
                        </div>
                    )
                )}
            </Card>
        </div>
    );
};

export default Customers;
