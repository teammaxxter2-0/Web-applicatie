import '../Styles/App.css';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'antd';

function App() {
    const navigate = useNavigate();
    return (
        <>
            <Navbar />
            <div className="d-flex justify-content-center mt-5">
                <Card
                    title="Blis Digital"
                    bordered={true}
                    className="w-75"
                    style={{ maxWidth: '1000px' }}
                >
                    <h3> Welkom bij Blis Digital</h3>

                    <p>
                        Bij Blis Digital kunt u op twee verschillende manieren spullen bestellen: 
                    </p>
                    <p>
                        <strong>1. Via de Catalogus:</strong> Blader door onze uitgebreide catalogus om het materiaal van uw keuze te vinden en geef vervolgens de gewenste specificaties op.
                    </p>
                    <p>
                        <strong>2. Via de Chatbot:</strong> Praat met onze AI-chatbot om u te helpen bij het kiezen van de juiste producten en het plaatsen van uw bestelling.
                    </p>
                    <p>
                        Bovendien kunt u uw gekozen spullen bekijken in uw winkelwagen voordat u de bestelling plaatst. 
                    </p>
                    <p>
                        Beheerders kunnen gebruik maken van de beheerderfunctionaliteiten voor extra opties.
                    </p>
                    <div className="d-flex justify-content-between mb-5">
                        <Button style={{ width: '200px' }} onClick={() => navigate('/catalog')}>
                            Catalogus
                        </Button>
                        <Button style={{ width: '200px' }} onClick={() => navigate('/chatbot')}>
                            Chatbot
                        </Button>
                        <Button style={{ width: '200px' }} onClick={() => navigate('/winkelwagen')}>
                            Winkelwagen
                        </Button>
                        <Button style={{ width: '200px' }} onClick={() => navigate('/beheerder')}>
                            Beheer
                        </Button>
                    </div>
                </Card>
            </div>
        </>
    );
}

export default App;
