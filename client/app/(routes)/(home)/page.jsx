import { getCategories } from "@/app/lib/api";
import HeroSection from "./layouts/HeroSection";

export default async function Home() {
    const initialData = await getCategories("");

    return (
        <div
            className='
            flex 
            min-h-screen 
            flex-col
            '
        >
            <HeroSection categories={initialData} />
        </div>
    );
}
