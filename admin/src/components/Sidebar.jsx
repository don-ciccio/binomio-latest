import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import Logo from "@/images/logo/logo.svg";
import { Icon } from "@iconify/react";

import { NavLink, useLocation } from "react-router-dom";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const location = useLocation();
    const { pathname } = location;

    const trigger = useRef(null);
    const sidebar = useRef(null);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!sidebar.current || !trigger.current) return;
            if (
                !sidebarOpen ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setSidebarOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    return (
        <aside
            ref={sidebar}
            className={`absolute left-0 top-0 z-9999 flex h-screen w-64 flex-col overflow-y-hidden bg-[#1C2434] duration-300 ease-linear dark:bg-[#1A222C] lg:static lg:translate-x-0 ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            {/* <!-- SIDEBAR HEADER --> */}
            <div className='flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5'>
                <NavLink to='/'>
                    <img src={Logo} alt='Logo' />
                </NavLink>

                <button
                    ref={trigger}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-controls='sidebar'
                    aria-expanded={sidebarOpen}
                    className='block lg:hidden'
                >
                    <svg
                        className='fill-current'
                        width='20'
                        height='18'
                        viewBox='0 0 20 18'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z'
                            fill=''
                        />
                    </svg>
                </button>
            </div>
            {/* <!-- SIDEBAR HEADER --> */}
            <div className='no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear'>
                {/* <!-- Sidebar Menu --> */}
                <nav className='mt-5 py-4 px-4 lg:mt-9 lg:px-6'>
                    <div>
                        <h3 className='mb-4 ml-4 text-sm font-semibold text-[#8A99AF]'>
                            MENU
                        </h3>
                        <ul className='mb-6 flex flex-col gap-1 5'>
                            {/* <!-- Menu Item Dashboard --> */}

                            <li>
                                <NavLink
                                    to='/'
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                        (pathname === "/" ||
                                            pathname.includes("dashboard")) &&
                                        "bg-graydark dark:bg-meta-4"
                                    }`}
                                >
                                    <Icon
                                        className='w-5 h-5'
                                        icon={"material-symbols:team-dashboard"}
                                    />
                                    Dashboard
                                </NavLink>
                            </li>
                            {/* <!-- Menu Item Dashboard --> */}
                            {/* <!-- Menu Item Products --> */}
                            <li>
                                <NavLink
                                    to='/products'
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                        pathname.includes("products") &&
                                        "bg-graydark dark:bg-meta-4"
                                    }`}
                                >
                                    <Icon
                                        className='w-5 h-5'
                                        icon={"ph:pizza-bold"}
                                    />
                                    Prodotti
                                </NavLink>
                            </li>
                            {/* <!-- Menu Item Products --> */}
                            <li>
                                <NavLink
                                    to='/categories'
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                        pathname.includes("categories") &&
                                        "bg-graydark dark:bg-meta-4"
                                    }`}
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='h-5 w-5'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
                                        />
                                    </svg>
                                    Categorie
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/stores'
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                        pathname.includes("stores") &&
                                        "bg-graydark dark:bg-meta-4"
                                    }`}
                                >
                                    <Icon
                                        className='w-5 h-5'
                                        icon={"bx:store"}
                                    />
                                    Negozio
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;

Sidebar.propTypes = {
    sidebarOpen: PropTypes.bool,
    setSidebarOpen: PropTypes.func,
};
