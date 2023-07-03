import Header from "@/app/components/header/Header";
import SVGLogo from "@/app/components/icons/SVGLogo";
import { getCategories, getContent } from "@/app/lib/api";

export default async function Home() {
    const initialCategories = await getCategories();
    const initialContent = await getContent();

    return (
        <div
            className='
            flex 
            min-h-screen bg-gray-150
            '
        >
            <Header
                categories={initialCategories}
                message={initialContent.data?.content.topbar}
                className={`origin-[center_center_0px] align-middle w-20 h-20 block rounded-full`}
            >
                <SVGLogo className='overflow-hidden align-middle h-full w-full' />
            </Header>
            <div id='maincontent' className='mt-36 flex-basis-1 relative z-2'>
                <div className='xs:px-5 px-3'>
                    <p>content</p>
                </div>
            </div>
        </div>
    );
}
