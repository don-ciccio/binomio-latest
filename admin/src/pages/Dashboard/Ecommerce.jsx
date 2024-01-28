import PropTypes from "prop-types";

import DefaultLayout from "@/layout/DefaultLayout";

const Ecommerce = ({ data }) => {
    return <DefaultLayout>{data}</DefaultLayout>;
};

export default Ecommerce;

Ecommerce.propTypes = {
    data: PropTypes.string,
};
