import  { useState } from 'react';
import { Collapse, CardBody, Card, Button, Input } from 'reactstrap';
import { BsCaretDownSquareFill } from "react-icons/bs";
import { FaXmark } from "react-icons/fa6";
import { GiCheckMark } from "react-icons/gi";
import { Link } from 'react-router-dom';
import Navbar from './navbar';

import image1 from './assets/Material Images/noble_concrete_grey_verzoet.png';
import image2 from './assets/Material Images/noble_desiree_grey.png';
import image3 from './assets/Material Images/Taurus_terrazzo_black.png';
import image4 from './assets/Material Images/taurus_terrazzo_white._verzoet.png';
import image5 from './assets/Material Images/glencoe.png';

interface Rectangle {
    id: number;
    material: string;
    price: any;
    content: string;
    bool1: boolean;
    bool2: boolean;
    bool3: boolean;
    image: any;
}

const rectanglesData: Rectangle[] = [
    { id: 1, material: 'Noble Concrete Grey Verzoet', price: 43.99, content: 'Verrijk uw keuken met de tijdloze elegantie van Noble Concrete Grey Verzoet. Vervaardigd tot in de perfectie, deze luxueuze werkblad straalt verfijning en duurzaamheid uit. De strakke afwerking voegt een vleugje moderniteit toe aan elke culinaire ruimte, waardoor het de perfecte blikvanger is voor uw keuken.', bool1: true, bool2: false, bool3: true, image: image1 },
    { id: 2, material: 'Noble Desire Grey', price: 23.99, content: 'Laat u verwennen door de ingetogen schoonheid van Noble Desire Grey werkbladen. Ontworpen voor zowel stijl als functionaliteit, deze werkbladen passen naadloos in elke keukenesthetiek. Met hun gladde oppervlak en rijke tint transformeren ze uw kookruimte in een toevluchtsoord van culinaire creativiteit.', bool1: false, bool2: true, bool3: false, image: image2 },
    { id: 3, material: 'Taurus Terrazzo Black', price: 53.99, content: 'Ervaar het toppunt van luxe met Taurus Terrazzo Black werkbladen. Vervaardigd met nauwgezette aandacht voor detail, deze werkbladen stralen verfijning en klasse uit. Hun opvallende zwarte tinten en ingewikkelde patronen verheffen uw keuken, waardoor het een culinair meesterwerk wordt.', bool1: true, bool2: false, bool3: true, image: image3 },
    { id: 4, material: 'Taurus Terazzo White Verzoet', price: 43.99, content: 'Omarm de tijdloze charme van Taurus Terazzo White Verzoet werkbladen. Met hun smetteloze witte oppervlak en delicate aders voegen deze werkbladen een vleugje elegantie toe aan elke keuken. Ontworpen voor duurzaamheid en stijl, zijn ze de perfecte keuze voor veeleisende huiseigenaren die zowel schoonheid als functionaliteit zoeken.', bool1: false, bool2: true, bool3: false, image: image4 },
    { id: 5, material: 'Glencoe', content: 'Transformeer uw keuken met de rustieke charme van Glencoe werkbladen., wSje ambiance ontstaat voor familie en vrienden.', price: 43.99, bool1: true, bool2: true, bool3: true, image: image5 }
];


function Catalog() {
    const [openRectangles, setOpenRectangles] = useState<number[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const toggleRectangle = (id: number) => {
        if (openRectangles.includes(id)) {
            setOpenRectangles(openRectangles.filter(rectangleId => rectangleId !== id));
        } else {
            setOpenRectangles([...openRectangles, id]);
        }
    };

    const filteredRectangles = rectanglesData.filter(rectangle =>
        rectangle.material.toLowerCase().includes(searchQuery.toLowerCase())
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
                                <img src={rectangle.image} width="200" height="200" className="rounded" />
                            </div>
                            <div className="col-md-9">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4>{rectangle.material}</h4>
                                        <p>€{rectangle.price} per m² </p>
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
                                                            {rectangle.bool1 ? <GiCheckMark style={{ color: 'green' }} /> : <FaXmark style={{ color: 'red' }} />}
                                                            <span className={rectangle.bool1 ? 'green-text' : 'red-text'}> Boorgaten per stuk: </span>
                                                            {rectangle.bool1 ? 'Mogelijk' : 'Niet Mogelijk'}
                                                        </div>
                                                        <div className="bool">
                                                            {rectangle.bool2 ? <GiCheckMark style={{ color: 'green' }} /> : <FaXmark style={{ color: 'red' }} />}
                                                            <span className={rectangle.bool2 ? 'green-text' : 'red-text'}> Wandcontactdoos: </span>
                                                            {rectangle.bool2 ? 'Mogelijk' : 'Niet Mogelijk'}
                                                        </div>
                                                        <div className="bool">
                                                            {rectangle.bool3 ? <GiCheckMark style={{ color: 'green' }} /> : <FaXmark style={{ color: 'red' }} />}
                                                            <span className={rectangle.bool3 ? 'green-text' : 'red-text'}> Randafwerking: </span>
                                                            {rectangle.bool3 ? 'Mogelijk' : 'Niet Mogelijk'}
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="col">{rectangle.content}</div>
                                                <div className="w-100"></div>
                                                <div className="mt-2 d-flex justify-content-end">
                                                    <Link to="/new">
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
