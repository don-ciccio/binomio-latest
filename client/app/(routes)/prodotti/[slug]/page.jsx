import Header from "@/app/components/header/Header";
import SVGLogo from "@/app/components/icons/SVGLogo";
import { getCategories, getContent, getProductsBySlug } from "@/app/lib/api";

import Breadcrumb from "@/app/components/ui/Breadcrumb";
import ProductDetails from "./layouts/ProductDetails";

export default async function Home({ params }) {
    const initialCategories = await getCategories("");
    const initialContent = await getContent();
    const initialProduct = await getProductsBySlug(params.slug);

    if (!initialProduct) {
        return null;
    }

    return (
        <div className='pb-24'>
            <Header
                categories={initialCategories}
                message={initialContent.data?.content.topbar}
                className={`origin-[center_center_0px] align-middle w-20 h-20 block rounded-full`}
            >
                <SVGLogo className='overflow-hidden align-middle h-full w-full' />
            </Header>
            <div id='maincontent' className='mt-36 flex-basis-1 relative z-2'>
                <div className='md:px-6 xxs:px-4 md:pb-0 relative z-1'>
                    <Breadcrumb />
                </div>

                <div className='xs:px-5 px-3'>
                    <ProductDetails initialProduct={initialProduct} />
                </div>
            </div>
        </div>
    );
}
