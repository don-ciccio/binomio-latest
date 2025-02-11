import Ecommerce from "@/pages/Dashboard/Ecommerce";
import AdminLogin from "@/pages/Authentication/AdminLogin";

import { Navigate } from "react-router-dom";
import Products from "@/pages/Products/Products";

import { AddProduct } from "@/pages/Products/Add";
import { AddCategory } from "@/pages/Categories/Add";

import { EditProduct } from "@/pages/Products/Edit";
import { EditCategory } from "@/pages/Categories/Edit";
import { EditStore } from "@/pages/Store/Edit";

import Categories from "@/pages/Categories/Categories";
import Stores from "@/pages/Store/Stores";
import { AddStore } from "@/pages/Store/Add";

import Delivery from "@/pages/Delivery/Delivery";
import DeliverySettings from "@/pages/Delivery/DeliverySettings";
import Content from "@/pages/Theme/Content";
import DefaultLayout from "./layout/DefaultLayout";
import Booking from "@/pages/Booking/Booking";
import BookingSettings from "./pages/Booking/BookingSettings";
import Orders from "@/pages/Orders/Orders";
import { ViewOrder } from "@/pages/Orders/View";
import Customers from "@/pages/Customers/Customers";
import { ViewCustomer } from "@/pages/Customers/View";

const routes = (isAuthenticated) => [
    {
        path: "/",
        element: isAuthenticated ? (
            <DefaultLayout>
                <Navigate replace to='/dashboard' />
            </DefaultLayout>
        ) : (
            <Navigate replace to='/login' />
        ),
        children: [
            {
                path: "dashboard",
                element: <Ecommerce />,
            },
            {
                path: "orders",
                element: <Orders />,
            },
            { path: "orders/:id", element: <ViewOrder /> },
            {
                path: "products",
                element: <Products />,
            },
            { path: "products/add", element: <AddProduct /> },
            { path: "products/:id", element: <EditProduct /> },
            {
                path: "categories",
                element: <Categories />,
            },
            { path: "categories/add", element: <AddCategory /> },
            { path: "categories/:id", element: <EditCategory /> },
            {
                path: "customers",
                element: <Customers />,
            },
            { path: "customers/:id", element: <ViewCustomer /> },
            {
                path: "stores",
                element: <Stores />,
            },
            { path: "stores/add", element: <AddStore /> },
            { path: "stores/:id", element: <EditStore /> },
            {
                path: "delivery",
                element: <Delivery />,
            },
            { path: "delivery/:id", element: <DeliverySettings /> },
            {
                path: "booking",
                element: <Booking />,
            },
            {
                path: "booking/:id",
                element: <BookingSettings />,
            },
            {
                path: "theme",
                element: <Content />,
            },
        ],
    },
    {
        path: "login",
        element: isAuthenticated ? (
            <Navigate replace to='/dashboard' />
        ) : (
            <AdminLogin />
        ),
    },
];

export default routes;
