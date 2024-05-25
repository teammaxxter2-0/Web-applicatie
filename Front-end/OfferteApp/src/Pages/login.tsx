import React, {useState} from 'react'
import '../Styles/App.css';
import Navbar from '../Components/Navbar.tsx';
import 'ngx-toastr/toastr';
import {useNavigate} from 'react-router-dom';

function LogIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        if (username === "" || password === "") {
            alert("Vul alle velden in!");
            setIsLoading(false);
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
                    localStorage.setItem("Token", data);

                    navigate("/");
                    alert("Je bent ingelogd!");
                } else {
                    alert("Email en password combinatie niet gevonden");
                }
            }
            catch (error) {
                console.error("Error:", error);
                alert("Er is iets foutgegaan");
            }
            finally {
                setIsLoading(false);
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
                                    <img src="../assets/blis.webp"
                                        alt="login picture" className="img-fluid w-100" />
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <div className="card-body p-4 p-lg-7 text-black">
                                        <form onSubmit={handleSubmit}>
                                            <h1 className="mb-4">Log in</h1>
                                            <div className="form-outline mb-4">
                                                <input type="email" id="form2Example17" className="form-control form-control-lg" onChange={(e) => setUsername(e.currentTarget.value)} />
                                                <label className="form-label" htmlFor="form2Example17">Gebruikersnaam</label>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input type="password" id="form2Example27" className="form-control form-control-lg" onChange={(e) => setPassword(e.currentTarget.value)} />
                                                <label className="form-label" htmlFor="form2Example27">Wachtwoord</label>
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