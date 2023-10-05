import Header from "@/app/components/header/Header";
import SVGLogo from "@/app/components/icons/SVGLogo";
import Breadcrumb from "@/app/components/ui/Breadcrumb";
import { getCategories, getContent } from "@/app/lib/api";
import StepperSection from "./layouts/StepperSection";

export default async function Checkout() {
    const initialCategories = await getCategories("");
    const initialContent = await getContent();
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
                <div className='px-6 sm:px-14 relative z-1'>
                    <Breadcrumb />
                </div>

                <div className='xs:px-5 px-3'>
                    <StepperSection />
                </div>
            </div>
        </div>
    );
}
