import { getCategories, getContent, getProducts, getUser } from "@/app/lib/api";
import HeroSection from "./layouts/HeroSection";
import ProductsSection from "./layouts/ProductsSection";

export default async function Home() {
    /* const { cookies } = await import("next/headers");
    const token = cookies().get("token")?.value;
    const user = await getUser(token);
    console.log(user); */
    const initialCategories = await getCategories("");
    const initialContent = await getContent();
    const initialProducts = await getProducts();

    return (
        <div className='overflow-hidden block'>
            <HeroSection
                categories={initialCategories}
                message={initialContent.data?.content.topbar}
                herotitle={initialContent.data?.content.heroTitle}
                herodescription={initialContent.data?.content.heroDescription}
            />
            <ProductsSection initialData={initialProducts} />
        </div>
    );
}
