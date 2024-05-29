import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router-dom";
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
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ToastContainer />
        <BrowserRouter>
            <Routes>
                <Route index element={<App />}></Route>
                <Route path={"*"} element={<ErrorPage />}></Route>
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
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)
