import PropTypes from "prop-types";

import Loader from "@/components/common/Loader";
import {
    Metric,
    LineChart,
    Card,
    Grid,
    CategoryBar,
    Legend,
} from "@tremor/react";
import { useGetSessions } from "../../store/react-query/hooks/useQueries";
import { format, parseISO } from "date-fns";
let times = [
    { time: "01:00", Sessioni: 0 },
    { time: "02:00", Sessioni: 0 },
    { time: "03:00", Sessioni: 0 },
    { time: "04:00", Sessioni: 0 },
    { time: "05:00", Sessioni: 0 },
    { time: "06:00", Sessioni: 0 },
    { time: "07:00", Sessioni: 0 },
    { time: "08:00", Sessioni: 0 },
    { time: "09:00", Sessioni: 0 },
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
    { time: "00:00", Sessioni: 0 },
];

const Ecommerce = () => {
    const { data: dashboard, isLoading } = useGetSessions();

    const normalizeData = () => {
        const array = dashboard?.data.sessions.map((data) => ({
            lastModified: format(parseISO(data.lastModified), "HH:00"),
        }));

        return array;
    };
    const array = normalizeData();

    const sessionsArray = times.map(({ time }) => ({
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

    if (isLoading)
        return (
            <div className='flex items-center justify-center h-screen'>
                <Loader />
            </div>
        );
    return (
        <div className='h-full w-full bg-gray-50 px-3 py-12 xl:px-20'>
            <Metric>Dashboard</Metric>
            <Grid numItemsMd={2} numItemsLg={3} className='my-5 gap-5'>
                <Card className='mx-auto max-w-md'>
                    <p className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>
                        Prodotti
                    </p>
                    <p className='text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold'>
                        {dashboard?.data.totalProducts}
                    </p>
                    <CategoryBar
                        className='mt-4'
                        values={[
                            dashboard?.data.activeProducts,
                            dashboard?.data.inactiveProducts,
                        ]}
                        colors={["emerald", "red"]}
                    />
                    <Legend
                        className='mt-3'
                        categories={["Attivi", "Bozza"]}
                        colors={["emerald", "red"]}
                    />
                </Card>

                <Card className='mx-auto max-w-md'></Card>

                <Card></Card>
            </Grid>
            <LineChart
                className='mt-6'
                data={sessionsArray}
                index='time'
                categories={["Sessioni"]}
                colors={["emerald"]}
                yAxisWidth={30}
                customTooltip={customTooltip}
                showAnimation={true}
                curveType={"monotone"}
            />
        </div>
    );
};

export default Ecommerce;

Ecommerce.propTypes = {
    data: PropTypes.string,
};
