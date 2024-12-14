import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

api.interceptors.request.use(async (config) => {
    if (typeof window === "undefined") {
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
    } else {
        const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
            "$1"
        );

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
    }

    return config;
});

export default api;
