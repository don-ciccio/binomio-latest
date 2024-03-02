import { Flex, Icon, Card } from "@tremor/react";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { useGetStores } from "@/store/react-query/hooks/useQueries";
import { Link } from "react-router-dom";
import TableLoader from "@/components/common/TableLoader";
import BookingTable from "../../components/bookingTable/BookingTable";
import { CustomDatePicker } from "../../components/common/CustomDatePicker";
import { useState } from "react";

const Booking = () => {
    const [startDate, setStartDate] = useState(new Date());
    const { data: stores, isLoading } = useGetStores();
    const handleDay = (date) => {
        setStartDate(new Date(date.setHours(0, 0, 0, 0)));
    };

    return (
        <>
            {isLoading ? (
                <TableLoader />
            ) : (
                <>
                    {stores?.map((store, index) => (
                        <div
                            key={index}
                            className='h-full w-full bg-gray-50 px-3 xl:px-20 py-12'
                        >
                            <Flex
                                className='w-full justify-between'
                                justifyContent='start'
                                alignItems='center'
                            >
                                <div className='flex items-center'>
                                    <h3 className='text-xl font-semibold text-gray-900'>
                                        {store.name}
                                    </h3>
                                    <Icon
                                        icon={InformationCircleIcon}
                                        variant='simple'
                                        tooltip={store.name}
                                    />
                                </div>

                                <div>
                                    <Link
                                        className='hidden p-2 rounded border border-gray-300 bg-white px-8 text-base font-medium text-gray-700 transition-all hover:border-blue-500 hover:bg-blue-500 hover:text-white sm:block'
                                        to={`${store._id}`}
                                    >
                                        Gestisci
                                    </Link>
                                </div>
                            </Flex>

                            <Card shadow={"false"} className='mt-6'>
                                <div className='border-b border-gray-200 pb-4 px-4 flex items-center justify-between'>
                                    <span className='text-xl font-medium'>
                                        Prenotazioni
                                    </span>
                                </div>
                                <div className='mt-5 flex flex-col md:flex-row md:space-x-2 gap-2'>
                                    <CustomDatePicker
                                        selected={startDate}
                                        onChange={(date) => handleDay(date)}
                                        minDate={new Date()}
                                    />
                                </div>
                                <div className='flex flex-col px-6 pt-6'>
                                    <BookingTable
                                        date={startDate}
                                        id={store._id}
                                    />
                                </div>
                            </Card>
                        </div>
                    ))}
                </>
            )}
        </>
    );
};

export default Booking;
