import { useQuery } from "@tanstack/react-query";
import { getProducts, getCategories, getProduct } from "../queries";

export const useGetProducts = ({
    page,
    sort,
    filterCategory,
    status,
    search,
}) => {
    return useQuery(
        [["products"], { page, sort, filterCategory, status, search }],
        () => getProducts(page, sort, filterCategory, status, search),
        {
            keepPreviousData: true,
            staleTime: 5000,
            cacheTime: 1000 * 60 * 60 * 24,
        }
    );
};

export const useGetProductById = (id) => {
    return useQuery(["product", id], () => getProduct(id));
};

export const useGetCategories = () => {
    return useQuery(["categories"], () => getCategories());
};
