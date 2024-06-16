import { Link , useNavigate } from 'react-router-dom';
import {Button} from "reactstrap";
import {useState} from "react";
import {message} from "antd";


function Navbar() {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') !== null);
    const logout = () => {
        setLoggedIn(false);
        localStorage.clear();
        
        message.success("Logged out successfully");
        navigate("/")
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/catalog">Catalog </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/chatbot">Chatbot </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/winkelwagen">Winkelwagen </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/beheerder">Beheer </Link>
                        </li>
                        {loggedIn &&
                          <li className="nav-item">
                            <Button className="nav-link" onClick={logout}>Logout</Button>
                          </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
