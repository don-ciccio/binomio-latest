import Header from "@/app/components/header/Header";
import SVGLogo from "@/app/components/icons/SVGLogo";
import {
    getCategories,
    getContent,
    getProductsByCategory,
} from "@/app/lib/api";
import ProductsByCatSection from "./layouts/ProductsByCatSection";
import Breadcrumb from "@/app/components/ui/Breadcrumb";

export default async function Home({ params, searchParams }) {
    const initialCategories = await getCategories("");
    const initialContent = await getContent();
    const initialProducts = await getProductsByCategory(
        params.category,
        searchParams
    );

    return (
        <div className='h-full w-full'>
            <Header
                categories={initialCategories}
                message={initialContent.data?.content.topbar}
                className={`origin-[center_center_0px] align-middle w-20 h-20 block rounded-full`}
            >
                <SVGLogo className='overflow-hidden align-middle h-full w-full' />
            </Header>
            <div id='maincontent' className='mt-36 flex-basis-1 relative z-2'>
                <div className='sm:px-11 px-3'>
                    <Breadcrumb />
                </div>

                <div className='xs:px-5 px-3'>
                    <ProductsByCatSection initialData={initialProducts} />
                </div>
            </div>
        </div>
    );
}
