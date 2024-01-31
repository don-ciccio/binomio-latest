import {
    BadgeDelta,
    Card,
    Flex,
    Grid,
    Metric,
    ProgressBar,
    Text,
} from "@tremor/react";

const Widgets = () => {
    return (
        <Grid numItemsMd={2} numItemsLg={3} className='my-5 gap-5'>
            <Card>
                <Flex alignItems='start'>
                    <div>
                        <Text>Daily Revenue</Text>
                        <Metric>$ 7,712</Metric>
                    </div>
                    <BadgeDelta deltaType={"moderateIncrease"}>4%</BadgeDelta>
                </Flex>

                <Flex>
                    <Text>$ 7,712 &bull; 63%</Text>
                    <Text>$ 10,000</Text>
                </Flex>
                <ProgressBar value={63} color='blue' className='mt-3' />
            </Card>

            <Card>
                <Flex alignItems='start'>
                    <div>
                        <Text>YTD Revenue</Text>
                        <Metric>$ 854,830</Metric>
                    </div>
                    <BadgeDelta deltaType={"increase"}>11%</BadgeDelta>
                </Flex>

                <Flex>
                    <Text>$ 854,830 &bull; 85%</Text>
                    <Text>$ 1,000,000</Text>
                </Flex>
                <ProgressBar value={85} color='blue' className='mt-3' />
            </Card>

            <Card>
                <Flex alignItems='start'>
                    <div>
                        <Text>Customers</Text>
                        <Metric>58,829</Metric>
                    </div>
                    <BadgeDelta deltaType={"moderateIncrease"}>4%</BadgeDelta>
                </Flex>

                <Flex>
                    <Text>58,829 &bull; 93%</Text>
                    <Text>65,000</Text>
                </Flex>
                <ProgressBar value={93} color='blue' className='mt-3' />
            </Card>
        </Grid>
    );
};

export default Widgets;
