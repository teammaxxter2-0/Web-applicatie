import { useEffect, useState } from 'react';
import Navbar from "../Components/Navbar.tsx";
import { useParams, useNavigate } from "react-router-dom";
import useOptions from "../hooks/Options.ts";
import { Bestelling } from "../interfaces/Bestelling.ts";
import TableView from "../Components/TableView.tsx";
import CalculateTotal from "../Components/CalculateTotal.tsx";
import { Material } from "../interfaces/Materiaalsoort.ts";
import "../Styles/berekenblad.css";
import MakeQuote from "../hooks/MakeQuote.ts";
import { Modal, Button, message, InputNumber, Select, Form, Row, Col, Divider} from 'antd';


const { Option } = Select;

function BerekenBlad() {
    const params = useParams<{ id: string }>();
    const [bestelling, setBestelling] = useState<Bestelling>();
    const material: Material = useOptions(params.id ?? "");
    const [isViewModalVisible, setIsViewModalVisible] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleViewModalClose = () => {
        setIsViewModalVisible(false);
    };

    const handleShowInfo = () => {
        setIsViewModalVisible(true);
    };

    useEffect(() => {
        if (params === undefined || params.id === undefined) return;

        setBestelling({
            name: material.name,
            aantal_m2: 0,
            prijs_per_m2: material.prijsPerM2,
            prijs_m2_totaal: 0,
            randafwerking: material.randafwerking,
            randafwerking_m: 0,
            randafwerking_prijs_per_m: material.randafwerkingPerM,
            randafwerking_hoogte_mm: 0,
            randafwerking_prijs_totaal: 0,
            spatrand_m: 0,
            spatrand_prijs_per_m: material.spatrandPerM,
            spatrand_hoogte_mm: 0,
            spatrand_prijs_totaal: 0,
            vensterbank_m: 0,
            vensterbank_prijs_per_m: material.vensterbankPerM,
            vensterbank_breedte_mm: 0,
            vensterbank_prijs_totaal: 0,
            spoelbak: false,
            uitsparing_spoelbak: "Ok",
            spoelbak_prijs: 12.6,
            kraangat: false,
            kraangat_prijs: material.kraangat,
            zeepdispenser: false,
            zeepdispenser_prijs: material.zeepdispenser,
            boorgaten: material.boorgatenPerStuk,
            boorgaten_stuk: 0,
            boorgaten_mm: 0,
            boorgaten_prijs_per_stuk: material.boorgatenPerStukPrijs,
            boorgaten_prijs_totaal: 0,
            wcd: false,
            wcd_prijs: material.wcdPrijs,
            achterwand: false,
            achterwand_m2: 0,
            achterwand_prijs_per_m2: material.achterwandPerM,
            achterwand_prijs_totaal: 0,
            offerte_prijs_totaal: 0
        });
    }, [params, material]);

    useEffect(() => {
        if (!bestelling) return;

        const updatedBestelling: Bestelling = {
            ...bestelling,
            prijs_m2_totaal: bestelling.aantal_m2 * bestelling.prijs_per_m2,
            randafwerking_prijs_totaal: bestelling.randafwerking_m * bestelling.randafwerking_prijs_per_m,
            spatrand_prijs_totaal: bestelling.spatrand_m * bestelling.spatrand_prijs_per_m,
            offerte_prijs_totaal: CalculateTotal(bestelling),
            achterwand_prijs_totaal: bestelling.achterwand_m2 * bestelling.achterwand_prijs_per_m2,
            vensterbank_prijs_totaal: bestelling.vensterbank_m * bestelling.vensterbank_prijs_per_m,
            boorgaten_prijs_totaal: bestelling.boorgaten_stuk * bestelling.boorgaten_prijs_per_stuk
        };

        setBestelling(updatedBestelling);
    }, [
        bestelling?.aantal_m2, bestelling?.randafwerking_m, bestelling?.achterwand_m2, 
        bestelling?.spatrand_m, bestelling?.vensterbank_m, bestelling?.spoelbak,
        bestelling?.kraangat, bestelling?.zeepdispenser, bestelling?.boorgaten_stuk, 
        bestelling?.wcd
    ]);

    const updateBestellingAttribute = <K extends keyof Bestelling>(key: K, value: Bestelling[K]) => {
        setBestelling(prevState => {
            if (!prevState) return undefined;
            return { ...prevState, [key]: value };
        });
    };

    const handleBestelling = (e: React.FormEvent) => {
        e.preventDefault();

        if (bestelling !== undefined)
            MakeQuote(bestelling);
        else
            alert('Bestelling bestaat niet');
    };

    const handleModalSubmit = () => {
        if (bestelling !== undefined) {
            MakeQuote(bestelling);
            message.success("Bestelling afgerond!");
            navigate("/");
        } else {
            message.error("Bestelling bestaat niet");
        }
    };

    return (
        <>
            <Navbar />
            <div className="container">
                
                <Row gutter={200}>
                    
                    <Col span={12}>
                        
                        <Form onSubmitCapture={handleBestelling} layout="vertical">
                            <h1 ></h1>
                            <Form.Item label="" style={{ marginTop: '50px'}}>
                                <h3>{bestelling?.name}</h3>
                                <Divider />
                            </Form.Item>
                            <Form.Item label="Voer het aantal vierkante meters in:">
                                <InputNumber
                                    value={bestelling?.aantal_m2}
                                    onChange={(value) => updateBestellingAttribute("aantal_m2", value || 0)}
                                    min={0}
                                    step={0.01}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                            {bestelling?.randafwerking && (
                                <>
                                    <Form.Item label="Voer het aantal meters randafwerking in:">
                                        <InputNumber
                                            value={bestelling?.randafwerking_m}
                                            onChange={(value) => updateBestellingAttribute("randafwerking_m", value || 0)}
                                            min={0}
                                            step={0.01}
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Voer de hoogte van de randafwerking in (mm):">
                                        <InputNumber
                                            value={bestelling?.randafwerking_hoogte_mm}
                                            onChange={(value) => updateBestellingAttribute("randafwerking_hoogte_mm", value || 0)}
                                            min={0}
                                            step={1}
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                </>
                            )}
                            <Form.Item label="Voer het aantal meters spatrand in:">
                                <InputNumber
                                    value={bestelling?.spatrand_m}
                                    onChange={(value) => updateBestellingAttribute("spatrand_m", value || 0)}
                                    min={0}
                                    step={0.01}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                            <Form.Item label="Voer de hoogte van de spatrand in (mm) (tussen 0 en 150):">
                                <InputNumber
                                    value={bestelling?.spatrand_hoogte_mm}
                                    onChange={(value) => updateBestellingAttribute("spatrand_hoogte_mm", value || 0)}
                                    min={0}
                                    max={150}
                                    step={1}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                            <Form.Item label="Voer het aantal meters vensterbank in:">
                                <InputNumber
                                    value={bestelling?.vensterbank_m}
                                    onChange={(value) => updateBestellingAttribute("vensterbank_m", value || 0)}
                                    min={0}
                                    step={0.01}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                            <Form.Item label="Voer de breedte van de vensterbank in (mm):">
                                <InputNumber
                                    value={bestelling?.vensterbank_breedte_mm}
                                    onChange={(value) => updateBestellingAttribute("vensterbank_breedte_mm", value || 0)}
                                    min={0}
                                    step={1}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                            <Form.Item label="Wilt u een spoelbak?">
                                <Select
                                    value={bestelling?.spoelbak ? "ja" : "nee"}
                                    onChange={(value) => updateBestellingAttribute("spoelbak", value === "ja")}
                                    style={{ width: '70%' }}
                                >
                                    <Option value="ja">Ja</Option>
                                    <Option value="nee">Nee</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Wilt u een kraangat?">
                                <Select
                                    value={bestelling?.kraangat ? "ja" : "nee"}
                                    onChange={(value) => updateBestellingAttribute("kraangat", value === "ja")}
                                    style={{ width: '70%' }}
                                >
                                    <Option value="ja">Ja</Option>
                                    <Option value="nee">Nee</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Wilt u een zeepdispenser?">
                                <Select
                                    value={bestelling?.zeepdispenser ? "ja" : "nee"}
                                    onChange={(value) => updateBestellingAttribute("zeepdispenser", value === "ja")}
                                    style={{ width: '70%' }}
                                >
                                    <Option value="ja">Ja</Option>
                                    <Option value="nee">Nee</Option>
                                </Select>
                            </Form.Item>
                            {bestelling?.boorgaten && (
                                <>
                                    <Form.Item label="Voer het aantal boorgaten in:">
                                        <InputNumber
                                            value={bestelling?.boorgaten_stuk}
                                            onChange={(value) => updateBestellingAttribute("boorgaten_stuk", value || 0)}
                                            min={0}
                                            step={1}
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Voer de diameter van de boorgaten in (mm):">
                                        <InputNumber
                                            value={bestelling?.boorgaten_mm}
                                            onChange={(value) => updateBestellingAttribute("boorgaten_mm", value || 0)}
                                            min={0}
                                            step={1}
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                </>
                            )}
                            {material?.wcd && (
                                <Form.Item label="Wilt u een contactdoos?">
                                    <Select
                                        value={bestelling?.wcd ? "ja" : "nee"}
                                        onChange={(value) => updateBestellingAttribute("wcd", value === "ja")}
                                        style={{ width: '100%' }}
                                    >
                                        <Option value="ja">Ja</Option>
                                        <Option value="nee">Nee</Option>
                                    </Select>
                                </Form.Item>
                            )}
                            {material?.randafwerking && (
                                <Form.Item label="Voer het aantal vierkante meters achterwand in:">
                                    <InputNumber
                                        value={bestelling?.achterwand_m2}
                                        onChange={(value) => updateBestellingAttribute("achterwand_m2", value || 0)}
                                        min={0}
                                        step={0.01}
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>
                            )}
                            <Form.Item>
                                <Button type="primary" onClick={handleShowInfo} block>
                                    Vraag aan
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={11} style={{ marginTop: '66px'}}>

                        <TableView viewObject={bestelling} />
                    </Col>
                  
                </Row>
                <Modal
                    title="Aanvraag"
                    open={isViewModalVisible}
                    onCancel={handleViewModalClose}
                    width={600}
                    footer={[
                        <Button key="final" type="primary" onClick={handleModalSubmit}>
                            Rond bestelling af
                        </Button>,
                        <Button key="close" onClick={handleViewModalClose}>
                            Terug
                        </Button>,
                    ]}
                >
                    <div>
                        <p><strong>Weet u zeker dat u uw bestelling wilt afronden?</strong></p>
                    </div>
                </Modal>
            </div>
        </>
    );
}

export default BerekenBlad;
