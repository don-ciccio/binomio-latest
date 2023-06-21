import { getCategories, getContent, getProducts } from "@/app/lib/api";
import HeroSection from "./layouts/HeroSection";
import ProductsSection from "./layouts/ProductsSection";

export default async function Home() {
    const initialCategories = await getCategories("");
    const initialContent = await getContent();
    const initialProducts = await getProducts();

    return (
        <div
            className='
            flex 
            min-h-screen 
            flex-col
            '
        >
            <div id='maincontent' className='block flex-basis-1 relative z-2'>
                <div className='overflow-hidden block'>
                    <HeroSection
                        categories={initialCategories}
                        message={initialContent.data?.content.topbar}
                        herotitle={initialContent.data?.content.heroTitle}
                        herodescription={
                            initialContent.data?.content.heroDescription
                        }
                    />
                    <ProductsSection initialData={initialProducts} />
                </div>
            </div>
        </div>
    );
}
