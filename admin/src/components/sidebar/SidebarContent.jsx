import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { Button, WindmillContext } from "@windmill/react-ui";
import { IoLogOutOutline } from "react-icons/io5";

//internal import
import sidebar from "@/routes/sidebar";

import SidebarSubMenu from "@/components/sidebar/SidebarSubMenu";

const SidebarContent = () => {
    const { mode } = useContext(WindmillContext);
    const location = useLocation();
    const { pathname } = location;
    const handleLogOut = () => {
        console.log("Logout");
    };

    return (
        <div className='py-4 text-gray-500 dark:text-gray-400'>
            <a className=' text-gray-900 dark:text-gray-200' href='/dashboard'>
                {mode === "dark" ? (
                    <span className='ml-6 text-lg font-bold text-gray-800 dark:text-gray-200'>
                        E-Commerce
                    </span>
                ) : (
                    <span className='ml-6 text-lg font-bold text-gray-800 dark:text-gray-200'>
                        E-Commerce
                    </span>
                )}
            </a>
            <ul className='mt-8'>
                {sidebar.map((route) =>
                    route.routes ? (
                        <SidebarSubMenu route={route} key={route.name} />
                    ) : (
                        <li className='relative' key={route.name}>
                            {route?.outside ? (
                                <a
                                    href={import.meta.env.VITE_APP_STORE_DOMAIN}
                                    target='_blank'
                                    className='px-6 py-4 inline-flex items-center cursor-pointer w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200'
                                    rel='noreferrer'
                                >
                                    <span
                                        className='absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg'
                                        aria-hidden='true'
                                    ></span>

                                    <route.icon
                                        className='w-5 h-5'
                                        aria-hidden='true'
                                    />
                                    <span className='ml-4'>
                                        {`${route.name}`}
                                    </span>
                                    {/* <span className="ml-4">{route.name}</span> */}
                                </a>
                            ) : (
                                <NavLink
                                    to={route.path}
                                    target={`${
                                        route?.outside ? "_blank" : "_self"
                                    }`}
                                    className='px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200'
                                >
                                    {pathname.includes(route.path) && (
                                        <span
                                            className='absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg'
                                            aria-hidden='true'
                                        ></span>
                                    )}

                                    <route.icon
                                        className='w-5 h-5'
                                        aria-hidden='true'
                                    />
                                    <span className='ml-4'>
                                        {`${route.name}`}
                                    </span>
                                </NavLink>
                            )}
                        </li>
                    )
                )}
            </ul>
            <span className='lg:fixed bottom-0 px-6 py-6 w-64 mx-auto relative mt-3 block'>
                <Button onClick={handleLogOut} size='large' className='w-full'>
                    <span className='flex items-center'>
                        <IoLogOutOutline className='mr-3 text-lg' />
                        <span className='text-sm'>{"LogOut"}</span>
                    </span>
                </Button>
            </span>
        </div>
    );
};

export default SidebarContent;
