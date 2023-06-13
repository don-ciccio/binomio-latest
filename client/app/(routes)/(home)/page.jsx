import { getCategories, getContent } from "@/app/lib/api";
import HeroSection from "./layouts/HeroSection";

export default async function Home() {
    const initialCategories = await getCategories("");
    const initialContent = await getContent();

    return (
        <div
            className='
            flex 
            min-h-screen 
            flex-col
            '
        >
            <HeroSection
                categories={initialCategories}
                message={initialContent.data?.content.topbar}
                herotitle={initialContent.data?.content.heroTitle}
                herodescription={initialContent.data?.content.heroDescription}
            />
        </div>
    );
}
