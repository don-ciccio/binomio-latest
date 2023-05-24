import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { SnackbarProvider } from "notistack";

import { Provider } from "react-redux";
import { store } from "@/store/redux/store";

import App from "./App.jsx";
import "./index.css";
import "./satoshi.css";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: 1000 * 60 * 60 * 24, // 24 hours
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <SnackbarProvider preventDuplicate autoHideDuration={2000}>
            <Provider store={store}>
                <Router>
                    <QueryClientProvider client={queryClient}>
                        <App />
                        <ReactQueryDevtools initialIsOpen />
                    </QueryClientProvider>
                </Router>
            </Provider>
        </SnackbarProvider>
    </React.StrictMode>
);
