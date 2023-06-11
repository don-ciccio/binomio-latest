import HeroSection from "./layouts/HeroSection";

export default async function Home() {
    return (
        <div
            className='
            flex 
            min-h-screen 
            flex-col
            '
        >
            <HeroSection />
        </div>
    );
}
