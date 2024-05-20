import {useState} from 'react'
import './App.css';
import Navbar from './navbar';
import 'ngx-toastr/toastr';
import {useNavigate} from 'react-router-dom';

function LogIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    async function hashPassword(password: string) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hash = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hash));
        return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    }

    async function handleSubmit() {
        setIsLoading(true);
        if (username === "" || password === "") {
            alert("Fill in all fields!");
            setIsLoading(false);
        }
        else {
            try {
                const hashedPassword = await hashPassword(password);
                console.log(hashedPassword);
                const response = await fetch('api/Auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password: hashPassword.toString() })
                });
                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem("Id", data.accountId);
                    localStorage.setItem("username", data.name);
                    localStorage.setItem("Token", data.Token);

                    navigate("..");
                    alert("Logged in successfully!");
                } else {
                    alert("Email and password combination not found");
                }
            }
            catch (error) {
                console.error("Error:", error);
                alert("Something went wrong");
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
                                    <img src="../blis.webp"
                                        alt="login picture" className="img-fluid w-100" />
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <div className="card-body p-4 p-lg-7 text-black">
                                        <form action="action_page.php" method="post">
                                            <h1 className="mb-4">Log in</h1>
                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input type="email" id="form2Example17" className="form-control form-control-lg" onChange={(e) => setUsername(e.currentTarget.value)} />
                                                <label className="form-label" htmlFor="form2Example17">Username</label>
                                            </div>
                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input type="password" id="form2Example27" className="form-control form-control-lg" onChange={(e) => setPassword(e.currentTarget.value)} />
                                                <label className="form-label" htmlFor="form2Example27">Password</label>
                                            </div>
                                            <div className="pt-1 mb-4">
                                                <button data-mdb-button-init data-mdb-ripple-init className="btn btn-dark btn-lg btn-block" type="button" onClick={handleSubmit}>Login</button>
                                            </div>
                                            <p className="mb-5 pb-lg-2" >Don't have an account? <a href="Register"
                                            >Register here</a></p>
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