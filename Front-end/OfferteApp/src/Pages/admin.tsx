import Navbar from '../Components/Navbar.tsx';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'antd';
import useToken from "../hooks/Token.ts";

function AdminPage() {
    useToken();
    const navigate = useNavigate();
    return (
        <>
            <Navbar />
            <div className="d-flex justify-content-center mt-5">
                <Card
                    title="Welkom, Admin"
                    bordered={true}
                    className="w-75"
                    style={{ maxWidth: '600px' }}
                >
                    <div className="mb-5">
                        <Button  block onClick={() => navigate('/beheerder/materials')}>
                            Klik hier om naar <strong> materialen </strong> te gaan
                        </Button>
                    </div>
                    <div className="mb-5">
                        <Button  block onClick={() => navigate('/beheerder/accounts')}>
                            Klik hier om naar <strong> accounts </strong> te gaan
                        </Button>
                    </div>
                    <div className="mb-5">
                        <Button  block onClick={() => navigate('/beheerder/offertes')}>
                            Klik hier om naar <strong> offertes </strong> te gaan
                        </Button>
                    </div>
                </Card>
            </div>



        </>
    );
}

export default AdminPage;
