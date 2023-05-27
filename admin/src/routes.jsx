import Ecommerce from "@/pages/Dashboard/Ecommerce";
import AdminLogin from "@/pages/Authentication/AdminLogin";

import { Navigate } from "react-router-dom";
import Products from "@/pages/Products/Products";
import Add from "@/pages/Products/Add";
import Edit from "@/pages/Products/Edit";
import Categories from "@/pages/Categories/Categories";

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
            { path: "products/add", element: <Add /> },
            { path: "products/:id", element: <Edit /> },
            {
                path: "categories",
                element: <Categories />,
            },
        ],
    },
    {
        path: "login",
        element: isAuthenticated ? <Navigate replace to='/' /> : <AdminLogin />,
    },
];

export default routes;
