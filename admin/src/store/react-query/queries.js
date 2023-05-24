import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API_URL;

// Products queries
export const getProducts = async (
    page = 1,
    sort = {},
    filterCategory = [],
    status = "All",
    search = ""
) => {
    const url = `${API_URL}/api/products?page=${page}&sort=${sort.sort},${
        sort.order
    }&category=${filterCategory.toString()}&status=${status}&search=${search}`;

    const { data } = await axios.get(url);
    console.log(data);
    return data;
};

export const getProduct = async (id) => {
    return await axios.get(`${API_URL}/api/product/${id}`);
};

export const changeProductStatus = async (id, status) => {
    return await axios.put(`${API_URL}/api/admin/product/status/${id}`, {
        status,
    });
};

export const updateProduct = async (data, id) => {
    return await axios.put(`${API_URL}/api/admin/product`, { ...data, id });
};

export const getCategories = async () => {
    const { data } = await axios.get(`${API_URL}/api/categories`);
    return data;
};
