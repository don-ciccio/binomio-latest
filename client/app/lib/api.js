import { useQuery } from "@tanstack/react-query";
import axios from "axios";

axios.defaults.withCredentials = true;

export const getCategories = async (search) => {
    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories?search=${search}`
    );
    return data;
};

export const useGetCategories = ({ search, categories }) => {
    return useQuery(
        ["categories", "list", { search }],
        () => getCategories(search),
        {
            initialData: categories,
        }
    );
};
