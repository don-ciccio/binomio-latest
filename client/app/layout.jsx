import "@/app/styles/globals.css";
import { Nunito } from "next/font/google";

export const metadata = {
    title: "NextJs Ecommerce Template",
    description: "Template for NextJs  Ecommerce",
};

const font = Nunito({
    subsets: ["latin"],
});

export default function RootLayout({ children }) {
    return (
        <html lang='it'>
            <body className={font.className}>{children}</body>
        </html>
    );
}
