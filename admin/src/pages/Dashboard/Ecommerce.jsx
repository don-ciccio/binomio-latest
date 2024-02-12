import PropTypes from "prop-types";

import { Metric } from "@tremor/react";
import Widgets from "../../components/ui/Widgets";

const Ecommerce = () => {
    return (
        <div className='h-full w-full bg-gray-50 px-3 py-12 xl:px-20'>
            <Metric>Dashboard</Metric>
            <Widgets />
        </div>
    );
};

export default Ecommerce;

Ecommerce.propTypes = {
    data: PropTypes.string,
};
