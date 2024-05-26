import  { useState } from 'react';
import { Collapse, CardBody, Card, Button, Input } from 'reactstrap';
import { BsCaretDownSquareFill } from "react-icons/bs";
import { FaXmark } from "react-icons/fa6";
import { GiCheckMark } from "react-icons/gi";
import Navbar from '../Components/Navbar.tsx';
import useOptions from "../hooks/Options.tsx";

import image1 from '../assets/Material Images/noble_carrara_verzoet.png';
import image2 from '../assets/Material Images/noble_desiree_grey_matt.png';
import image3 from '../assets/Material Images/taurus_terazzo_black.png';
import image4 from '../assets/Material Images/taurus_terazzo_white_verzoet.png';
import image5 from '../assets/Material Images/glencoe_verzoet.png';

import blisImage from '../assets/Material Images/blis.png';
import {Link} from "react-router-dom";

const imageMap: { [key: string]: string } = {
    "Noble Desiree Grey Matt": image2,
    "Noble Carrara Verzoet": image1,
    "Taurus Terazzo White Verzoet": image4,
    "Taurus Terazzo Black": image3,
    "Glencoe Verzoet": image5,
};

//[
// {"id":1,"name":"Noble Desiree Grey Matt","spatrand":"0-150 mm","vensterbank":"150 mm+","boorgatenPerStuk":true,"wcd":true,"randafwerking":false,"prijsPerM2":247.52,"randafwerkingPerM":87.00,"spatrandPerM":35.00,"vensterbankPerM":309.40,"uitsparingOnderbouw":151.50,"uitsparingInleg":97.50,"uitsparingRuw":70.00,"kraangat":10.70,"zeepdispenser":10.70,"boorgatenPerStukPrijs":5.00,"wcdPrijs":13.50,"achterwandPerM":309.40,"randafwerkingPerMPrice":28.00},
// {"id":2,"name":"Noble Carrara Verzoet","spatrand":"150 mm+","vensterbank":"0-150 mm","boorgatenPerStuk":true,"wcd":true,"randafwerking":true,"prijsPerM2":258.40,"randafwerkingPerM":87.00,"spatrandPerM":309.40,"vensterbankPerM":35.00,"uitsparingOnderbouw":151.50,"uitsparingInleg":97.50,"uitsparingRuw":70.00,"kraangat":10.70,"zeepdispenser":10.70,"boorgatenPerStukPrijs":5.00,"wcdPrijs":13.50,"achterwandPerM":315.60,"randafwerkingPerMPrice":28.00},
// {"id":3,"name":"Taurus Terazzo White Verzoet","spatrand":"0-150 mm","vensterbank":"0-150 mm","boorgatenPerStuk":false,"wcd":false,"randafwerking":true,"prijsPerM2":239.40,"randafwerkingPerM":79.00,"spatrandPerM":35.00,"vensterbankPerM":35.00,"uitsparingOnderbouw":151.50,"uitsparingInleg":97.50,"uitsparingRuw":70.00,"kraangat":10.70,"zeepdispenser":10.70,"boorgatenPerStukPrijs":5.00,"wcdPrijs":13.50,"achterwandPerM":298.50,"randafwerkingPerMPrice":28.00},
// {"id":4,"name":"Taurus Terazzo Black","spatrand":"150 mm+","vensterbank":"150 mm+","boorgatenPerStuk":true,"wcd":true,"randafwerking":true,"prijsPerM2":228.50,"randafwerkingPerM":79.00,"spatrandPerM":309.40,"vensterbankPerM":309.40,"uitsparingOnderbouw":151.50,"uitsparingInleg":97.50,"uitsparingRuw":70.00,"kraangat":10.70,"zeepdispenser":10.70,"boorgatenPerStukPrijs":5.00,"wcdPrijs":13.50,"achterwandPerM":289.50,"randafwerkingPerMPrice":28.00},
// {"id":5,"name":"Glencoe Verzoet","spatrand":"0-150; 150 mm+","vensterbank":"150 mm+","boorgatenPerStuk":false,"wcd":false,"randafwerking":true,"prijsPerM2":305.50,"randafwerkingPerM":95.00,"spatrandPerM":40.00,"vensterbankPerM":340.50,"uitsparingOnderbouw":151.50,"uitsparingInleg":97.50,"uitsparingRuw":70.00,"kraangat":10.70,"zeepdispenser":10.70,"boorgatenPerStukPrijs":5.00,"wcdPrijs":13.50,"achterwandPerM":315.60,"randafwerkingPerMPrice":28.00}
// ]

function Catalog() {
    const materialsData = useOptions();
    const [openRectangles, setOpenRectangles] = useState<number[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const toggleRectangle = (id: number) => {
        if (openRectangles.includes(id)) {
            setOpenRectangles(openRectangles.filter(rectangleId => rectangleId !== id));
        } else {
            setOpenRectangles([...openRectangles, id]);
        }
    };

    const filteredRectangles = materialsData.filter(material =>
        material.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <Navbar />
        <div>
            <h1>Catalog Keukenbladen</h1>
            <Input
                    type="text"
                    placeholder="Zoek naar keukenbladen....."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="my-3 mx-auto w-50"
                />
            <div>
                {filteredRectangles.map(rectangle => (
                    <div className="card my-4 mx-5 " key={rectangle.id}>
                        <div className="row card-body align-items-center">
                            <div className="col-md-3">
                                <img src={imageMap[rectangle.name] || blisImage} width="200" height="200" className="rounded" alt={rectangle.name} />
                            </div>
                            <div className="col-md-9">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4>{rectangle.name}</h4>
                                        <p>€{rectangle.prijsPerM2} per m² </p>
                                    </div>
                                    <button
                                        className="btn btn"
                                        type="button"
                                        onClick={() => toggleRectangle(rectangle.id)}
                                        aria-expanded={openRectangles.includes(rectangle.id)}
                                        style={{ fontSize: '35px' }}
                                    >
                                        <BsCaretDownSquareFill />
                                    </button>
                                </div>
                                <Collapse isOpen={openRectangles.includes(rectangle.id)}>
                                    <Card>
                                        <CardBody>
                                        
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="bools">
                                                        <div className="bool">
                                                            {rectangle.boorgatenPerStuk ? <GiCheckMark style={{ color: 'green' }} /> : <FaXmark style={{ color: 'red' }} />}
                                                            <span className={rectangle.boorgatenPerStuk ? 'green-text' : 'red-text'}> Boorgaten per stuk: </span>
                                                            {rectangle.boorgatenPerStukPrijs ? 'Mogelijk' : 'Niet Mogelijk'}
                                                        </div>
                                                        <div className="bool">
                                                            {rectangle.wcd ? <GiCheckMark style={{ color: 'green' }} /> : <FaXmark style={{ color: 'red' }} />}
                                                            <span className={rectangle.wcd ? 'green-text' : 'red-text'}> Wandcontactdoos: </span>
                                                            {rectangle.wcdPrijs ? 'Mogelijk' : 'Niet Mogelijk'}
                                                        </div>
                                                        <div className="bool">
                                                            {rectangle.randafwerking ? <GiCheckMark style={{ color: 'green' }} /> : <FaXmark style={{ color: 'red' }} />}
                                                            <span className={rectangle.randafwerkingPerM ? 'green-text' : 'red-text'}> Randafwerking: </span>
                                                            {rectangle.randafwerkingPerMPrice ? 'Mogelijk' : 'Niet Mogelijk'}
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="col">{rectangle.name}</div>
                                                <div className="w-100"></div>
                                                <div className="mt-2 d-flex justify-content-end">
                                                    <Link to={`/berekenblad/${rectangle.id}`}>
                                                        <Button color="primary">Bereken jouw keukenblad</Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Collapse>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}

export default Catalog;
