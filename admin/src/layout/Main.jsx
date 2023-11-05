import PropTypes from "prop-types";

const Main = ({ children }) => {
    return (
        <main className='h-full overflow-y-auto'>
            <div className='container grid px-6 mx-auto'>{children}</div>
        </main>
    );
};

export default Main;

Main.propTypes = {
    children: PropTypes.node,
};
