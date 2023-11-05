import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { SnackbarProvider } from "notistack";
import { SidebarProvider } from "@/context/SidebarContext";
import { Provider } from "react-redux";
import { store } from "@/store/redux/store";
import { Windmill } from "@windmill/react-ui";
import myTheme from "@/assets/theme/myTheme";

import App from "./App.jsx";
import "@/assets/css/custom.css";
import "@/assets/css/tailwind.css";

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
            <SidebarProvider>
                <Provider store={store}>
                    <Router>
                        <QueryClientProvider client={queryClient}>
                            <Windmill usePreferences theme={myTheme}>
                                <App />
                            </Windmill>
                            <ReactQueryDevtools initialIsOpen />
                        </QueryClientProvider>
                    </Router>
                </Provider>
            </SidebarProvider>
        </SnackbarProvider>
    </React.StrictMode>
);
