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
import { InformationCircleIcon, EyeIcon } from "@heroicons/react/20/solid";
import { useGetAllUsers } from "../../store/react-query/hooks/useQueries";

const Customers = () => {
    const { data, isLoading } = useGetAllUsers();
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
                clienti
            </Card>
        </div>
    );
};

export default Customers;
