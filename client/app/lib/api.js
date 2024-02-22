import { useQuery, keepPreviousData } from "@tanstack/react-query";
import api from "./utils/axiosInterceptor";
import qs from "query-string";
import axios from "axios";
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

    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    return data;
};

export const getCategories = async (search) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories?search=${search}`,
        { method: "GET" }
    );

    const data = await response.json();
    return data;
};

export const getProductsByCategory = async (cat, query) => {
    const url = qs.stringifyUrl({
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/product/${cat}`,
        query: query,
    });
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    return data;
};

export const getProductsBySlug = async (slug) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/product/single/${slug}`,
        { method: "GET" }
    );
    const data = await response.json();
    return data;
};

export const getMenuBySlug = async (slug) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/menu/${slug}`,
        { method: "GET" }
    );
    const data = await response.json();
    return data;
};

export const getContent = async () => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/content`,
        { method: "GET" }
    );
    const data = await response.json();
    return data;
};

export const getProductsByIds = async (ids) => {
    const idArray = ids.length < 1 ? null : ids;
    const query = qs.stringify({ filterBy: idArray });

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/cart?${query}`,
        { method: "GET" }
    );
    const data = await response.json();
    return data;
};

export const useProductsByCategory = ({ cat, query }) => {
    return useQuery({
        queryKey: ["products", "category", { cat, query }],
        queryFn: () => getProductsByCategory(cat, query),
        ...{ placeholderData: keepPreviousData },
    });
};

export const useGetProducts = ({
    page,
    sort,
    filterCategory,
    status,
    search,
    limit,
}) => {
    return useQuery({
        queryKey: [
            "products",
            "list",
            { page, sort, filterCategory, status, search, limit },
        ],
        queryFn: () =>
            getProducts(page, sort, filterCategory, status, search, limit),

        keepPreviousData: true,
    });
};

export const useGetCategories = ({ search }) => {
    return useQuery({
        queryKey: ["categories", "list", { search }],
        queryFn: () => getCategories(search),
    });
};

export const useGetProduct = ({ slug }) => {
    return useQuery({
        queryKey: ["products", "detail", { slug }],
        queryFn: () => getProductsBySlug(slug),
    });
};

export const useGetContent = () => {
    return useQuery({ queryKey: ["content"], queryFn: () => getContent() });
};

export const useGetContentHero = () => {
    return useQuery({ queryKey: ["content"], queryFn: () => getContent() });
};

export const getUser = async () => {
    try {
        const response = await api.get("/api/me");
        return response.data.user;
    } catch (err) {
        console.log(err.response.data);
        return null;
    }
};

export const getSession = async () => {
    try {
        return await api.post("/api/session");
    } catch (err) {
        console.log(err.response.data);
        return null;
    }
};

export const logOut = async () => {
    try {
        return await api.get("/api/logout");
    } catch (err) {
        console.log(err.res.data);
    }
};
