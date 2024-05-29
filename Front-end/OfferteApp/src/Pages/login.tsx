import React, {useState} from 'react'
import '../Styles/App.css';
import Navbar from '../Components/Navbar.tsx';
import {useNavigate} from 'react-router-dom';
import {message} from "antd";

import blis from "../assets/blis.webp";

function LogIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        const notifyPos = (text: string) => message.success(text);
        const notifyNeg = (text: string) => message.error(text)
        event.preventDefault();
        if (username === "" || password === "") {
            notifyNeg("Vul alle velden in!");
        }
        else {
            try {
                const response = await fetch('api/User/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Username: username,
                        Password: password
                    })
                });
                if (response.ok) {
                    const data = await response.text();
                    localStorage.setItem("token", data);

                    navigate("/");
                    notifyPos("Je bent ingelogd!");
                } else {
                    notifyNeg("Email en password combinatie niet gevonden");
                }
            }
            catch (error) {
                console.error("Error:", error);
                notifyNeg("Er is iets foutgegaan");
            }
        }
    }

    return (
        <div>
            <Navbar />

            <div className='container py-5 h-100'>
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-13">
                        <div className="card">
                            <div className="row g-0">
                                <div className="col-md-8 col-lg-8">
                                    <img src={blis} className="img-fluid w-100"/>
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <div className="card-body p-4 p-lg-7 text-black">
                                        <form onSubmit={handleSubmit}>
                                            <h1 className="mb-4">Log in</h1>
                                            <div className="form-outline mb-4">
                                                <input type="username" className="form-control form-control-lg" onChange={(e) => setUsername(e.currentTarget.value)} />
                                                <label className="form-label">Gebruikersnaam</label>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input type="password" className="form-control form-control-lg" onChange={(e) => setPassword(e.currentTarget.value)} />
                                                <label className="form-label">Wachtwoord</label>
                                            </div>
                                            <div className="pt-1 mb-4">
                                                <button className="btn btn-dark btn-lg btn-block" type="submit">Inloggen</button>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LogIn;