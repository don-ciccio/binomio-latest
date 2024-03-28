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
    return data;
};

export const getProduct = async (id) => {
    return await axios.get(`${API_URL}/api/product/edit/${id}`);
};

export const getStores = async () => {
    const { data } = await axios.get(`${API_URL}/api/admin/store`);
    return data;
};

export const getCategory = async (id) => {
    return await axios.get(`${API_URL}/api/category/${id}`);
};

export const getStore = async (id) => {
    return await axios.get(`${API_URL}/api/stores/${id}`);
};

export const getReservations = async (id, date) => {
    return await axios.get(
        `${API_URL}/api/admin/booking/${id}/reservations?date=${date}`
    );
};

export const getContent = async () => {
    return await axios.get(`${API_URL}/api/admin/content`);
};

export const getSessions = async () => {
    return await axios.get(`${API_URL}/api/admin/session`);
};

export const getOrders = async () => {
    return await axios.get(`${API_URL}/api/admin/orders`);
};

export const getOrderById = async (id) => {
    return await axios.get(`${API_URL}/api/order/${id}`);
};

export const getUserById = async (id) => {
    return await axios.get(`${API_URL}/api/admin/user/${id}`);
};

export const getAllUsers = async () => {
    return await axios.get(`${API_URL}/api/admin/users`);
};

export const changeProductStatus = async (id, status) => {
    return await axios.put(`${API_URL}/api/admin/product/status/${id}`, {
        status,
    });
};

export const updateProduct = async (data, id) => {
    return await axios.put(`${API_URL}/api/admin/product`, { ...data, id });
};

export const updateStore = async (data, id) => {
    return await axios.put(`${API_URL}/api/admin/store`, { ...data, id });
};

export const getCategories = async (search = "") => {
    const { data } = await axios.get(
        `${API_URL}/api/categories?search=${search}`
    );
    return data?.admin;
};
