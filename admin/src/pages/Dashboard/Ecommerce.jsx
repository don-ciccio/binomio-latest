import PropTypes from "prop-types";

import { Metric, LineChart } from "@tremor/react";
import Widgets from "../../components/ui/Widgets";
import { useGetSessions } from "../../store/react-query/hooks/useQueries";
import { format, parseISO } from "date-fns";
let times = [
    { time: "1:00", Sessioni: 0 },
    { time: "2:00", Sessioni: 0 },
    { time: "3:00", Sessioni: 0 },
    { time: "4:00", Sessioni: 0 },
    { time: "5:00", Sessioni: 0 },
    { time: "6:00", Sessioni: 0 },
    { time: "7:00", Sessioni: 0 },
    { time: "8:00", Sessioni: 0 },
    { time: "9:00", Sessioni: 0 },
    { time: "10:00", Sessioni: 0 },
    { time: "11:00", Sessioni: 0 },
    { time: "12:00", Sessioni: 0 },
    { time: "13:00", Sessioni: 0 },
    { time: "14:00", Sessioni: 0 },
    { time: "15:00", Sessioni: 0 },
    { time: "16:00", Sessioni: 0 },
    { time: "17:00", Sessioni: 0 },
    { time: "18:00", Sessioni: 0 },
    { time: "19:00", Sessioni: 0 },
    { time: "20:00", Sessioni: 0 },
    { time: "21:00", Sessioni: 0 },
    { time: "22:00", Sessioni: 0 },
    { time: "23:00", Sessioni: 0 },
    { time: "24:00", Sessioni: 0 },
];

const Ecommerce = () => {
    const { data, isLoading } = useGetSessions();

    const normalizeData = () => {
        const array = data?.data.data.map((data) => ({
            lastModified: format(parseISO(data.lastModified), "HH:00"),
            id: data._id,
        }));

        return array;
    };
    const array = normalizeData();

    let def = times.map(({ time }) => ({
        time: time,
        Sessioni: array?.reduce(
            (acc, cur) => (cur.lastModified === time ? ++acc : acc),
            0
        ),
    }));

    const customTooltip = (props) => {
        const { payload, active } = props;
        if (!active || !payload) return null;
        return (
            <div className='w-56 rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown'>
                {payload.map((category, idx) => (
                    <div key={idx} className='flex flex-1 space-x-2.5'>
                        <div
                            className={`flex w-1 flex-col bg-${category.color}-500 rounded`}
                        />
                        <div className='space-y-1'>
                            <p className='text-tremor-content'>
                                {category.dataKey}
                            </p>
                            <p className='font-medium text-tremor-content-emphasis'>
                                {category.value} access
                                {category.value === 1 ? "o" : "i"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className='h-full w-full bg-gray-50 px-3 py-12 xl:px-20'>
            <Metric>Dashboard</Metric>
            <Widgets />
            <LineChart
                className='mt-6'
                data={def}
                index='time'
                categories={["Sessioni"]}
                colors={["blue"]}
                yAxisWidth={30}
                customTooltip={customTooltip}
            />
        </div>
    );
};

export default Ecommerce;

Ecommerce.propTypes = {
    data: PropTypes.string,
};
