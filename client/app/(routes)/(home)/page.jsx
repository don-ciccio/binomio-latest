import { getCategories, getContent, getProducts } from "@/app/lib/api";
import HeroSection from "./layouts/HeroSection";
import ProductsSection from "./layouts/ProductsSection";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";

export default async function Home() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });
    await queryClient.prefetchQuery({
        queryKey: ["content"],
        queryFn: getContent,
    });
    await queryClient.prefetchQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });

    return (
        <div className='overflow-hidden block'>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <HeroSection />
                <ProductsSection />
            </HydrationBoundary>
        </div>
    );
}
