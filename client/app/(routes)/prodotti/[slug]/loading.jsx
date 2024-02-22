import Header from "@/app/components/header/Header";
import SVGLogo from "@/app/components/icons/SVGLogo";

import Breadcrumb from "@/app/components/ui/Breadcrumb";
import ProductSkeleton from "@/app/components/ui/ProductSkeleton";

export default async function Loading() {
    return (
        <div className='pb-24'>
            <Header
                className={`origin-[center_center_0px] align-middle w-20 h-20 block rounded-full`}
            >
                <SVGLogo className='overflow-hidden align-middle h-full w-full' />
            </Header>
            <div id='maincontent' className='mt-36 flex-basis-1 relative z-2'>
                <div className='md:px-6 px-3'>
                    <Breadcrumb />
                </div>

                <div className='xs:px-5 px-3'>
                    <ProductSkeleton />
                </div>
            </div>
        </div>
    );
}
