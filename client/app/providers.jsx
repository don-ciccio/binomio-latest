"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Providers({ children }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <GoogleOAuthProvider
                clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
            >
                {children}
            </GoogleOAuthProvider>

            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
