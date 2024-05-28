import React from 'react'

import ReactDOM from 'react-dom/client'
import App from './Pages/App.tsx'
import ErrorPage from "./Pages/error-page.tsx"

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
//import './index.css'
import Chatbot from './Pages/chatbot.tsx';
import Catalog from './Pages/catalog.tsx';
import Winkelwagen from './Pages/winkelwagen.tsx';
import LogIn from './Pages/login.tsx';
import BerekenBlad from "./Pages/Berekenblad.tsx";
import AdminSeeMaterials from './admin-see-materials.tsx';
import AdminPage from './admin.tsx';
import AdminSeeOffertes from './admin-see-offertes.tsx';
import AdminSeeAccounts from './admin-see-accounts.tsx';

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
        path: "/berekenblad/:id",
        element: <BerekenBlad />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/adminpage",
        element: <AdminPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/seematerials",
        element: <AdminSeeMaterials/>,
        errorElement: <ErrorPage />,
    },
    {
        path: "/seeoffertes",
        element: <AdminSeeOffertes/>,
        errorElement: <ErrorPage />,
    },
    {
        path: "/accounts",
        element: <AdminSeeAccounts/>,
        errorElement: <ErrorPage />,
    },


]);
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />

    </React.StrictMode>,
)
