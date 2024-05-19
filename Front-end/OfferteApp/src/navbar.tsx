
import { Link } from 'react-router-dom';

function Navbar() {
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
                            <Link className="nav-link" to="/pricelist">Price List </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/chatbot">Chatbot </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/winkelwagen">Winkelwagen  </Link>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
