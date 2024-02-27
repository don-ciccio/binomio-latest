import "@/app/styles/globals.css";
import Providers from "./providers";
import Toast from "@/app/components/ui/Toast";
import Footer from "./components/Footer/Footer";
import { Bricolage_Grotesque } from "next/font/google";
import StickyBottom from "./components/Footer/StickyBottom";

const Bricolage = Bricolage_Grotesque({
    subsets: ["latin"],
});

export const metadata = {
    title: "NextJs Ecommerce Template",
    description: "Template for NextJs  Ecommerce",
};

export default async function RootLayout({ children }) {
    return (
        <html lang='it'>
            <body className={Bricolage.className}>
                <div className='flex min-h-screen flex-col bg-gray-150'>
                    <div
                        id='maincontent'
                        className='block flex-basis-1 relative z-2'
                    >
                        <Providers>
                            {children}

                            <Footer />

                            <Toast />
                            <StickyBottom />
                        </Providers>
                    </div>
                </div>
            </body>
        </html>
    );
}
