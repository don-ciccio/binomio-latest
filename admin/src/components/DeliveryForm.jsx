import { useWeekdaysStore } from "@/store/zustand/store";
import Loader from "@/components/common/Loader";
import Input from "./common/Input";

const DeliveryForm = () => {
    const weekdays = useWeekdaysStore((state) => state.data);
    const loading = useWeekdaysStore((state) => state.loading);
    const toggleAvailableState = useWeekdaysStore(
        (state) => state.toggleAvailableState
    );
    console.log(weekdays);
    return (
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
            <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                <h3 className='font-medium text-black dark:text-white'>
                    Disponibilità alla consegna
                </h3>
            </div>
            <div className='flex flex-col gap-5.5 p-6.5'>
                <div>
                    <label className='mb-5 block text-black dark:text-white'>
                        Seleziona i giorni di consegna:
                    </label>
                    {loading ? (
                        <Loader />
                    ) : (
                        weekdays?.map((day, index) => (
                            <li className='flex items-start mb-5' key={index}>
                                <div className='flex flex-row w-full'>
                                    <span className='span-text text-base w-1/6 font-medium text-black'>
                                        {day.name}
                                    </span>
                                    <Input
                                        id={day.name}
                                        name={day.name}
                                        available={day.available}
                                        onChange={() =>
                                            toggleAvailableState(day.weekday)
                                        }
                                        index={index}
                                    />
                                    <span className='span-text text-base items-center'>
                                        {day.available ? "Aperto" : "Chiuso"}
                                    </span>
                                </div>
                            </li>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeliveryForm;
