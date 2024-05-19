

import './App.css';
import Navbar from './navbar';

function App() {
    
    return (
        <>
           <Navbar />
            <h1>Blis Digital</h1>
           
            
            <li>
                <a href={`/chatbot`}>Chat bot</a>
            </li>
            <li>
                <a href={`/catalog`}>catalog</a>
            </li>
            <li>
                <a href={`/pricelist`}>Price list</a>
            </li>
            
           
            
            
        </>
    );
}

export default App;
