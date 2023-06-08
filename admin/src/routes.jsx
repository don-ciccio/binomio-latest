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

const routes = (isAuthenticated) => [
    {
        path: "/",
        element: isAuthenticated ? (
            <Ecommerce />
        ) : (
            <Navigate replace to='/login' />
        ),
        children: [
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
        ],
    },
    {
        path: "login",
        element: isAuthenticated ? <Navigate replace to='/' /> : <AdminLogin />,
    },
];

export default routes;
