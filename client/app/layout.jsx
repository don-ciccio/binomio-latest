import "@/app/styles/globals.css";
import Providers from "./providers";
import Toast from "@/app/components/ui/Toast";
import localFont from "next/font/local";
import Footer from "./components/Footer/Footer";

const bauziet = localFont({
    src: [
        {
            path: "../public/fonts/Bauziet-Light.ttf",
            weight: "300",
        },
        {
            path: "../public/fonts/Bauziet-Regular.ttf",
            weight: "400",
        },
        {
            path: "../public/fonts/Bauziet-Medium.ttf",
            weight: "500",
        },
        {
            path: "../public/fonts/Bauziet-SemiBold.ttf",
            weight: "600",
        },
        {
            path: "../public/fonts/Bauziet-Bold.ttf",
            weight: "700",
        },
        {
            path: "../public/fonts/Bauziet-ExtraBold.ttf",
            weight: "800",
        },
    ],
    variable: "--font-bauziet",
});

export const metadata = {
    title: "NextJs Ecommerce Template",
    description: "Template for NextJs  Ecommerce",
};

export default function RootLayout({ children }) {
    return (
        <html lang='it'>
            <body className={`${bauziet.variable} font-sans`}>
                <div className='flex min-h-screen flex-col bg-gray-150'>
                    <div
                        id='maincontent'
                        className='block flex-basis-1 relative z-2'
                    >
                        <Providers>
                            {children}
                            <Footer />
                            <Toast />
                        </Providers>
                    </div>
                </div>
            </body>
        </html>
    );
}
