import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API_URL;

export const useCreateStore = () => {
    const queryClient = useQueryClient();
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    return useMutation(
        (store) => {
            return axios.post(`${API_URL}/api/admin/store/new`, store, config);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["stores"]);
            },
        }
    );
};
