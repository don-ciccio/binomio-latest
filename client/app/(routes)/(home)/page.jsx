import { getCategories, getContent, getProducts } from "@/app/lib/api";
import HeroSection from "./layouts/HeroSection";
import ProductsSection from "./layouts/ProductsSection";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/app/get-query-client";

export default async function Home() {
    const queryClient = getQueryClient();

    queryClient.prefetchQuery({
        queryKey: ["categories", "list"],
        queryFn: getCategories,
    });
    queryClient.prefetchQuery({
        queryKey: ["content"],
        queryFn: getContent,
    });
    queryClient.prefetchQuery({
        queryKey: ["products", "list"],
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
