import Header from "@/app/components/header/Header";
import SVGLogo from "@/app/components/icons/SVGLogo";
import { getCategories, getContent } from "@/app/lib/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/app/get-query-client";
import Breadcrumb from "@/app/components/ui/Breadcrumb";
import CategoriesList from "./layouts/CategoriesList";

export default async function CategoriesPage() {
    const queryClient = getQueryClient();

    queryClient.prefetchQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });
    queryClient.prefetchQuery({
        queryKey: ["content"],
        queryFn: getContent,
    });

    return (
        <div className='pb-24'>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Header
                    className={`origin-[center_center_0px] align-middle w-20 h-20 block rounded-full`}
                >
                    <SVGLogo className='overflow-hidden align-middle h-full w-full' />
                </Header>

                <div
                    id='maincontent'
                    className='mt-36 flex-basis-1 relative z-2'
                >
                    <div className='px-6 sm:px-14 relative z-1'>
                        <Breadcrumb />
                    </div>

                    <div className='px-6 sm:px-14 mt-8'>
                        <CategoriesList />
                    </div>
                </div>
            </HydrationBoundary>
        </div>
    );
}
