import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router-dom";
import App from './Pages/App.tsx'
import ErrorPage from "./Pages/error-page.tsx"
import Chatbot from './Pages/chatbot.tsx';
import Catalog from './Pages/catalog.tsx';
import Winkelwagen from './Pages/winkelwagen.tsx';
import LogIn from './Pages/login.tsx';
import BerekenBlad from "./Pages/Berekenblad.tsx";
import AdminSeeMaterials from './Pages/admin-see-materials.tsx';
import AdminPage from './Pages/admin.tsx';
import AdminSeeOffertes from './Pages/admin-see-offertes.tsx';
import AdminSeeAccounts from './Pages/admin-see-accounts.tsx';
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route errorElement={<ErrorPage />}>
            <Route index element={<App />}></Route>
            <Route path={"chatbot"} element={<Chatbot />}></Route>
            <Route path={"catalog"} element={<Catalog />}></Route>
            <Route path={"winkelwagen"} element={<Winkelwagen />}></Route>
            <Route path={"login"} element={<LogIn />}></Route>
            <Route path={"berekenblad/:id"} element={<BerekenBlad />}></Route>
            <Route path={"beheerder"}>
                <Route index element={<AdminPage />}></Route>
                <Route path={"materials"} element={<AdminSeeMaterials />}></Route>
                <Route path={"offertes"} element={<AdminSeeOffertes />}></Route>
                <Route path={"accounts"} element={<AdminSeeAccounts />}></Route>
            </Route>
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
)
