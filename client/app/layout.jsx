import Header from "@/app/components/header/Header";
import "@/app/styles/globals.css";
import { Fraunces } from "next/font/google";

export const metadata = {
    title: "NextJs Ecommerce Template",
    description: "Template for NextJs  Ecommerce",
};

const font = Fraunces({
    subsets: ["latin"],
});

export default function RootLayout({ children }) {
    return (
        <html lang='it'>
            <head />
            <body className={font.className}>
                <div className='flex min-h-screen flex-col'>
                    <Header />
                    {children}
                </div>
            </body>
        </html>
    );
}
