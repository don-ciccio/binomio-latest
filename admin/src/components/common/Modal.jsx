import PropTypes from "prop-types";

const Modal = ({ show, close, children }) => {
    return (
        <>
            {show ? (
                <div className='fixed top-0 left-0 z-99999 h-screen w-full justify-center overflow-y-scroll bg-black/30 py-5 px-4 block'>
                    <div className='relative m-auto w-full max-w-180 rounded-sm border border-stroke bg-gray p-4 shadow-default dark:border-strokedark dark:bg-meta-4 sm:p-8 xl:p-10'>
                        <button
                            onClick={() => close()}
                            className='absolute right-1 top-1 sm:right-5 sm:top-5'
                        >
                            <svg
                                className='fill-current'
                                width='20'
                                height='20'
                                viewBox='0 0 20 20'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M11.8913 9.99599L19.5043 2.38635C20.032 1.85888 20.032 1.02306 19.5043 0.495589C18.9768 -0.0317329 18.141 -0.0317329 17.6135 0.495589L10.0001 8.10559L2.38673 0.495589C1.85917 -0.0317329 1.02343 -0.0317329 0.495873 0.495589C-0.0318274 1.02306 -0.0318274 1.85888 0.495873 2.38635L8.10887 9.99599L0.495873 17.6056C-0.0318274 18.1331 -0.0318274 18.9689 0.495873 19.4964C0.717307 19.7177 1.05898 19.9001 1.4413 19.9001C1.75372 19.9001 2.13282 19.7971 2.40606 19.4771L10.0001 11.8864L17.6135 19.4964C17.8349 19.7177 18.1766 19.9001 18.5589 19.9001C18.8724 19.9001 19.2531 19.7964 19.5265 19.4737C20.0319 18.9452 20.0245 18.1256 19.5043 17.6056L11.8913 9.99599Z'
                                    fill=''
                                ></path>
                            </svg>
                        </button>
                        {children}
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Modal;

Modal.propTypes = {
    show: PropTypes.bool,
    close: PropTypes.func,
    children: PropTypes.node,
};
