
import { Link } from 'react-router-dom';
import Navbar from './navbar';

function AdminPage() {
   
    return (
        <>
            <Navbar />
            <h1>Admin Page</h1>
            <p> miscchien winkelwagen hier idk</p>
             <Link className="nav-link" to="/seematerials">Click to see materials </Link>
            <p> <Link className="nav-link" to="/seeoffertes"> Click tosee offertes </Link></p>
        
                       
                                             
        </>
    );
}

export default AdminPage;
