import { useQuery } from "@tanstack/react-query";
import {
    getProducts,
    getCategories,
    getProduct,
    getCategory,
    getStores,
    getStore,
} from "../queries";

export const useGetProducts = ({
    page,
    sort,
    filterCategory,
    status,
    search,
}) => {
    return useQuery(
        ["products", "list", { page, sort, filterCategory, status, search }],
        () => getProducts(page, sort, filterCategory, status, search),
        {
            keepPreviousData: true,
            staleTime: 5000,
            cacheTime: 1000 * 60 * 60 * 24,
        }
    );
};

export const useGetProductById = (id) => {
    return useQuery(["products", "details", id], () => getProduct(id));
};

export const useGetCategoryById = (id) => {
    return useQuery(["categories", "details", id], () => getCategory(id));
};

export const useGetStoreById = (id) => {
    return useQuery(["stores", "details", id], () => getStore(id));
};

export const useGetCategories = ({ search }) => {
    return useQuery(
        ["categories", "list", { search }],
        () => getCategories(search),
        {
            keepPreviousData: true,
            staleTime: 5000,
            cacheTime: 1000 * 60 * 60 * 24,
        }
    );
};

export const useGetStores = () => {
    return useQuery(["stores", "list"], () => getStores(), {
        keepPreviousData: true,
        staleTime: 5000,
        cacheTime: 1000 * 60 * 60 * 24,
    });
};
