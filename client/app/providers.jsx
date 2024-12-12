"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { getQueryClient } from "./get-query-client";

export default function Providers({ children }) {
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <GoogleOAuthProvider
                clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
            >
                {children}
            </GoogleOAuthProvider>
        </QueryClientProvider>
    );
}
