import "@/app/styles/globals.css";
import { Karla } from "next/font/google";
import Providers from "./providers";
import Toast from "@/app/components/ui/Toast";

export const metadata = {
    title: "NextJs Ecommerce Template",
    description: "Template for NextJs  Ecommerce",
};

const font = Karla({
    subsets: ["latin"],
});

export default function RootLayout({ children }) {
    return (
        <html lang='it'>
            <body className={font.className}>
                <Providers>
                    {children}
                    <Toast />
                </Providers>
            </body>
        </html>
    );
}
