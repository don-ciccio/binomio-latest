import PropTypes from "prop-types";
import {
    HomeIcon,
    QueueListIcon,
    BuildingStorefrontIcon,
    ShoppingCartIcon,
    TruckIcon,
    Cog6ToothIcon,
} from "@heroicons/react/24/outline";

import { NavLink } from "react-router-dom";

const sidebarLinks = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: HomeIcon,
    },
    {
        name: "Prodotti",
        href: "/products",
        icon: ShoppingCartIcon,
    },
    {
        name: "Categorie",
        href: "/categories",
        icon: QueueListIcon,
    },
    {
        name: "Negozio",
        href: "/stores",
        icon: BuildingStorefrontIcon,
    },
    {
        name: "Delivery",
        href: "/delivery",
        icon: TruckIcon,
    },
    {
        name: "Tema",
        href: "/theme",
        icon: Cog6ToothIcon,
    },
];

const Sidebar = () => {
    return (
        <div
            className={`sticky top-0 flex h-screen w-full flex-col justify-between border-r border-gray-200 bg-white px-1 py-16 xl:py-16 xl:px-2`}
        >
            {/* <!-- SIDEBAR HEADER --> */}
            <div className='ie-logo px-3 py-0 text-center xl:text-left'>
                <NavLink to='/'>
                    <div className='text-xl font-medium text-gray-900 xl:px-3 xl:text-2xl'>
                        <span className='block xl:hidden'>AD</span>
                        <span className='hidden xl:block'>Admin</span>
                    </div>
                </NavLink>
            </div>
            {/* <!-- SIDEBAR HEADER --> */}
            <div className='ie-menu mt-8 h-full'>
                {/* <!-- Sidebar Menu --> */}
                <div className='flex flex-col items-center gap-3 p-1 xl:items-stretch xl:px-3'>
                    {sidebarLinks.map((item) => {
                        return (
                            <NavLink
                                to={item.href}
                                key={item.name}
                                className='group'
                            >
                                {({ isActive }) => {
                                    return (
                                        <span
                                            className={`flex items-center gap-3 rounded-md px-3 py-2 transition-all ${
                                                isActive
                                                    ? "bg-gray-100"
                                                    : "group-hover:bg-gray-50"
                                            }`}
                                        >
                                            <item.icon
                                                className={`h-5 stroke-2 ${
                                                    isActive
                                                        ? "stroke-blue-700"
                                                        : "stroke-gray-500 group-hover:stroke-blue-700"
                                                }`}
                                            />
                                            <span
                                                className={`hidden text-base font-semibold xl:block ${
                                                    isActive
                                                        ? "text-gray-900"
                                                        : "text-gray-500 group-hover:text-gray-900"
                                                }`}
                                            >
                                                {item.name}
                                            </span>
                                        </span>
                                    );
                                }}
                            </NavLink>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

Sidebar.propTypes = {
    sidebarOpen: PropTypes.bool,
    setSidebarOpen: PropTypes.func,
};
