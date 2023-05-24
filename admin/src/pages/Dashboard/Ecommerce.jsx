import PropTypes from "prop-types";

import DefaultLayout from "@/layout/DefaultLayout";

const Ecommerce = ({ data }) => {
    return (
        <DefaultLayout>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
                <p>{data}</p>
            </div>
        </DefaultLayout>
    );
};

export default Ecommerce;

Ecommerce.propTypes = {
    data: PropTypes.string,
};
