import { Outlet } from "react-router-dom";

import Sidebar from "@/components/Sidebar";

const DefaultLayout = () => {
    return (
        <div className='flex'>
            <aside className='max-w-[64px] xl:w-full xl:max-w-[280px]'>
                <Sidebar />
            </aside>

            <div className='relative flex-1 overflow-auto'>
                <Outlet />
            </div>
        </div>
    );
};

export default DefaultLayout;
