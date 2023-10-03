import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import qs from "query-string";

axios.defaults.withCredentials = true;

export const getProducts = async (
    page = 1,
    sort = { sort: "price", order: "asc" },
    filterCategory = [],
    status = "All",
    search = "",
    limit = 4
) => {
    const url = `${
        process.env.NEXT_PUBLIC_SERVER_URL
    }/api/products?page=${page}&sort=${sort.sort},${
        sort.order
    }&category=${filterCategory.toString()}&status=${status}&search=${search}&limit=${limit}`;

    const { data } = await axios.get(url);
    return data;
};

export const getCategories = async (search) => {
    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories?search=${search}`
    );
    return data;
};

export const getProductsByCategory = async (cat, query) => {
    const url = qs.stringifyUrl({
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/product/${cat}`,
        query: query,
    });
    const { data } = await axios.get(url);
    return data;
};

export const getProductsBySlug = async (slug) => {
    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/product/single/${slug}`
    );
    return data;
};

export const getContent = async () => {
    return await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/content`
    );
};

export const getProductsByIds = async (ids) => {
    const idArray = ids.length < 1 ? null : ids;
    const query = qs.stringify({ filterBy: idArray });

    return await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/cart?${query}`
    );
};

export const useProductsByCategory = ({ cat, query, initialData }) => {
    return useQuery(
        ["products", "category", { cat, query, initialData }],
        () => getProductsByCategory(cat, query),
        {
            initialData: initialData,
            keepPreviousData: true,
            staleTime: 5000,
            cacheTime: 1000 * 60 * 60 * 24,
        }
    );
};

export const useGetProducts = ({
    page,
    sort,
    filterCategory,
    status,
    search,
    limit,
}) => {
    return useQuery(
        [
            "products",
            "list",
            { page, sort, filterCategory, status, search, limit },
        ],
        () => getProducts(page, sort, filterCategory, status, search, limit),
        {
            keepPreviousData: true,
            staleTime: 5000,
            cacheTime: 1000 * 60 * 60 * 24,
        }
    );
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

export const useGetProduct = ({ slug, productInitial }) => {
    return useQuery(
        ["products", "detail", { slug }],
        () => getProductsBySlug(slug),
        {
            initialData: productInitial,
        }
    );
};

export const useGetContent = ({ message }) => {
    return useQuery(["content"], () => getContent(), {
        initialData: message,
    });
};

export const useGetContentHero = (props) => {
    return useQuery(["content"], () => getContent(), {
        initialData: props,
    });
};
