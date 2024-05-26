import { useEffect, useState } from 'react';
import Navbar from "../Components/Navbar.tsx";
import { useParams } from "react-router-dom";
import useOptions from "../hooks/Options.tsx";
import { Bestelling } from "../types/Bestelling.ts";
import TableView from "../Components/TableView.tsx";
import CalculateTotal from "../Components/CalculateTotal.tsx";
import { Material } from "../types/Materiaalsoort.ts";
import "../Styles/berekenblad.css";
import MakeQuote from "../hooks/MakeQuote.ts";

function BerekenBlad() {
    const params = useParams<{ id: string }>();
    const [bestelling, setBestelling] = useState<Bestelling>();
    const material: Material = useOptions(params.id ?? "");

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
            bootgaten_prijs_totaal: 0,
            WCD: false,
            WCD_prijs: material.wcdPrijs,
            achterwand: false,
            acherwand_m2: 0,
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
            achterwand_prijs_totaal: bestelling.acherwand_m2 * bestelling.achterwand_prijs_per_m2,
            vensterbank_prijs_totaal: bestelling.vensterbank_m * bestelling.vensterbank_prijs_per_m,
            bootgaten_prijs_totaal: bestelling.boorgaten_stuk * bestelling.boorgaten_prijs_per_stuk
        };

        setBestelling(updatedBestelling);
    }, [bestelling?.aantal_m2, bestelling?.randafwerking_m, bestelling?.acherwand_m2, bestelling?.spatrand_m, bestelling?.acherwand_m2, bestelling?.vensterbank_m, bestelling?.spoelbak,
    bestelling?.kraangat, bestelling?.zeepdispenser, bestelling?.boorgaten_stuk, bestelling?.WCD]);

    const updateBestellingAttribute = <K extends keyof Bestelling>(key: K, value: Bestelling[K]) => {
        setBestelling(prevState => {
            if (!prevState) return undefined;
            return { ...prevState, [key]: value };
        });
    };

    const handleBestelling = (e: React.FormEvent) => {
        e.preventDefault();

        if(bestelling !== undefined)
            MakeQuote(bestelling);
        else
            alert('Bestelling bestaat niet');
    }

    return (
        <>
            <Navbar />
            <div className={"container"}>
                <div className="row">
                    <div className={"col-sm"}>
                        <h1>Bereken uw keukenblad</h1>
                        <form onSubmit={handleBestelling}>
                            <label>Materiaal: {bestelling?.name}</label>
                            <label>
                                Voer het aantal vierkante meters in:
                                <input
                                    type="number"
                                    value={bestelling?.aantal_m2}
                                    onChange={(e) => updateBestellingAttribute("aantal_m2", parseFloat(e.target.value))}
                                    min="0"
                                    step="0.01"
                                />
                            </label>
                            {bestelling?.randafwerking && (
                                <label>
                                    Voer het aantal meters randafwerking in:
                                    <input
                                        type="number"
                                        value={bestelling?.randafwerking_m}
                                        onChange={(e) => updateBestellingAttribute("randafwerking_m", parseFloat(e.target.value))}
                                        min="0"
                                        step="0.01"
                                    />
                                </label>
                            )}
                            {bestelling?.randafwerking && (
                                <label>
                                    Voer de hoogte van de randafwerking in (mm):
                                    <input
                                        type="number"
                                        value={bestelling?.randafwerking_hoogte_mm}
                                        onChange={(e) => updateBestellingAttribute("randafwerking_hoogte_mm", parseFloat(e.target.value))}
                                        min="0"
                                        step="1"
                                    />
                                </label>
                            )}
                            <label>
                                Voer het aantal meters spatrand in:
                                <input
                                    type="number"
                                    value={bestelling?.spatrand_m}
                                    onChange={(e) => updateBestellingAttribute("spatrand_m", parseFloat(e.target.value))}
                                    min="0"
                                    step="0.01"
                                />
                            </label>
                            <label>
                                Voer de hoogte van de spatrand in (mm) (tussen 0 en 150):
                                <input
                                    type="number"
                                    value={bestelling?.spatrand_hoogte_mm}
                                    onChange={(e) => updateBestellingAttribute("spatrand_hoogte_mm", parseFloat(e.target.value))}
                                    min="0"
                                    max="150"
                                    step="1"
                                />
                            </label>
                            <label>
                                Voer het aantal meters vensterbank in:
                                <input
                                    type="number"
                                    value={bestelling?.vensterbank_m}
                                    onChange={(e) => updateBestellingAttribute("vensterbank_m", parseFloat(e.target.value))}
                                    min="0"
                                    step="0.01"
                                />
                            </label>
                            <label>
                                Voer de breedte van de vensterbank in (mm):
                                <input
                                    type="number"
                                    value={bestelling?.vensterbank_breedte_mm}
                                    onChange={(e) => updateBestellingAttribute("vensterbank_breedte_mm", parseFloat(e.target.value))}
                                    min="0"
                                    step="1"
                                />
                            </label>
                            <label>
                                Wilt u een spoelbak?
                                <select
                                    value={bestelling?.spoelbak ? "ja" : "nee"}
                                    onChange={(e) => updateBestellingAttribute("spoelbak", e.target.value === "ja")}
                                >
                                    <option value="ja">Ja</option>
                                    <option value="nee">Nee</option>
                                </select>
                            </label>
                            <label>
                                Wilt u een kraangat?
                                <select
                                    value={bestelling?.kraangat ? "ja" : "nee"}
                                    onChange={(e) => updateBestellingAttribute("kraangat", e.target.value === "ja")}
                                >
                                    <option value="ja">Ja</option>
                                    <option value="nee">Nee</option>
                                </select>
                            </label>
                            <label>
                                Wilt u een zeepdispenser?
                                <select
                                    value={bestelling?.zeepdispenser ? "ja" : "nee"}
                                    onChange={(e) => updateBestellingAttribute("zeepdispenser", e.target.value === "ja")}
                                >
                                    <option value="ja">Ja</option>
                                    <option value="nee">Nee</option>
                                </select>
                            </label>
                            {bestelling?.boorgaten && (
                                <>
                                    <label>
                                        Voer het aantal boorgaten in:
                                        <input
                                            type="number"
                                            value={bestelling?.boorgaten_stuk}
                                            onChange={(e) => updateBestellingAttribute("boorgaten_stuk", parseFloat(e.target.value))}
                                            min="0"
                                            step="1"
                                        />
                                    </label>
                                    <label>
                                        Voer de diameter van de boorgaten in (mm):
                                        <input
                                            type="number"
                                            value={bestelling?.boorgaten_mm}
                                            onChange={(e) => updateBestellingAttribute("boorgaten_mm", parseFloat(e.target.value))}
                                            min="0"
                                            step="1"
                                        />
                                    </label>
                                </>
                            )}
                            {material?.wcd && (
                                <label>
                                    Wilt u een contactdoos?
                                    <select
                                        value={bestelling?.WCD ? "ja" : "nee"}
                                        onChange={(e) => updateBestellingAttribute("WCD", e.target.value === "ja")}
                                    >
                                        <option value="ja">Ja</option>
                                        <option value="nee">Nee</option>
                                    </select>
                                </label>
                            )}
                            <label>
                                Voer het aantal vierkante meters achterwand in:
                                <input
                                    type="number"
                                    value={bestelling?.acherwand_m2}
                                    onChange={(e) => updateBestellingAttribute("acherwand_m2", parseFloat(e.target.value))}
                                    min="0"
                                    step="0.01"
                                />
                            </label>
                            <button type={"submit"}>Vraag aan</button>
                        </form>
                    </div>
                    <div className={"col-sm"}>
                        <TableView viewObject={bestelling}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BerekenBlad;