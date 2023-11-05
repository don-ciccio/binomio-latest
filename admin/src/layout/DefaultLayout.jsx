import { SidebarContext } from "@/context/SidebarContext";
import { Outlet, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import Main from "./Main";
const DefaultLayout = () => {
    const { isSidebarOpen, closeSidebar, navBar } = useContext(SidebarContext);

    let location = useLocation();

    const isOnline = navigator.onLine;

    // console.log('routes',routes)

    useEffect(() => {
        closeSidebar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <>
            {!isOnline && (
                <div className='flex justify-center bg-red-600 text-white'>
                    You are in offline mode!{" "}
                </div>
            )}
            <div
                className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
                    isSidebarOpen && "overflow-hidden"
                }`}
            >
                {navBar && <Sidebar />}

                <div className='flex flex-col flex-1 w-full'>
                    <Header />
                    <Main>
                        <Outlet />
                    </Main>
                </div>
            </div>
        </>
    );
};

export default DefaultLayout;
