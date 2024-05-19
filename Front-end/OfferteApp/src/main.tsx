import React from 'react'

import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import ErrorPage from "./error-page.tsx"

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
//import './index.css'
import Chatbot from './chatbot.tsx';
import Catalog from './catalog.tsx';
import PriceList from './pricelist.tsx';
import Winkelwagen from './winkelwagen.tsx';
import LogIn from './login.tsx';
import Register from './register.tsx';



const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/chatbot",
        element: <Chatbot />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/catalog",
        element: <Catalog />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/pricelist",
        element: <PriceList />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/winkelwagen",
        element: <Winkelwagen />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: <LogIn />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/register",
        element: <Register />,
        errorElement: <ErrorPage />,
    },


]);
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />

    </React.StrictMode>,
)
