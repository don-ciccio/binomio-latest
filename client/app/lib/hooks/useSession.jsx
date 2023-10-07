import { useEffect } from "react";
import { getUser } from "../api";
import { useAuthStore } from "../store";

export default function useSession() {
    const store = useAuthStore();

    async function fetchUser() {
        try {
            const user = await getUser();

            store.setAuthUser(user);
        } catch (error) {
            store.reset();
        }
    }

    useEffect(() => {
        if (!store.authUser) {
            fetchUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return store.authUser;
}
