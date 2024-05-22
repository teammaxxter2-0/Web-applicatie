import {useEffect, useState} from 'react';
import Navbar from "../Components/Navbar.tsx";
import { useParams } from "react-router-dom";
import useOptions from "../hooks/Options.tsx";
import { Bestelling } from "../types/Bestelling.ts";
import TableView from "../Components/TableView.tsx";
import CalculateTotal from "../Components/CalculateTotal.tsx";

function BerekenBlad() {
    const params = useParams();
    const options = useOptions();
    const [bestelling, setBestelling] = useState<Bestelling>();

    useEffect(() => {
        if (params === undefined || params.id === undefined) return;

        const material = options.find(o => o.id === parseInt(params.id as string));
        if (material === undefined) return;

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
            spoelbak_prijs: 0,
            kraangat: material.kraangat,
            kraangat_prijs: 0,
            zeepdispenser: false,
            zeepdispenser_prijs: 0,
            boorgaten: material.boorgatenPerStuk,
            boorgaten_stuk: 0,
            boorgaten_mm: 0,
            boorgaten_prijs_per_stuk: 0,
            bootgaten_prijs_totaal: 0,
            WCD: material.wcd,
            WCD_prijs: material.wcdPrijs,
            achterwand: false,
            acherwand_m2: 0,
            achterwand_prijs_per_m2: material.achterwandPerM,
            achterwand_prijs_totaal: 0,
            offerte_prijs_totaal: 0
        });
    }, [params, options]);

    useEffect(() => {
        if (!bestelling) return;

        const updatedBestelling: Bestelling = {
            ...bestelling,
            prijs_m2_totaal: bestelling.aantal_m2 * bestelling.prijs_per_m2,
            randafwerking_prijs_totaal: bestelling.randafwerking_m * bestelling.randafwerking_prijs_per_m,
            spatrand_prijs_totaal: bestelling.spatrand_m * bestelling.spatrand_prijs_per_m,
            offerte_prijs_totaal: CalculateTotal(bestelling),
            achterwand_prijs_totaal: bestelling.acherwand_m2 * bestelling.achterwand_prijs_per_m2,
            vensterbank_prijs_totaal: bestelling.vensterbank_m * bestelling.vensterbank_prijs_per_m
        };

        setBestelling(updatedBestelling);
    }, [bestelling?.aantal_m2, bestelling?.randafwerking_m, bestelling?.spatrand_m, bestelling?.acherwand_m2, bestelling?.vensterbank_m]);

    const updateBestellingAttribute = <K extends keyof Bestelling>(key: K, value: Bestelling[K]) => {
        setBestelling(prevState => {
            if (!prevState) return undefined;
            return { ...prevState, [key]: value };
        });
    };

    const handleBestelling = (e: React.FormEvent) => {
        e.preventDefault();

        console.log('Bestelling:', bestelling);
    }

    return (
        <>
            <Navbar />
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
                <p>Prijs per m²: €{bestelling?.prijs_per_m2.toFixed(2)}</p>
                <p>Totaalprijs voor {bestelling?.aantal_m2.toFixed(2)} m²: €{bestelling?.prijs_m2_totaal.toFixed(2)}</p>
                {bestelling?.randafwerking && (
                    <>
                        <p>Randafwerking prijs per m: €{bestelling?.randafwerking_prijs_per_m.toFixed(2)}</p>
                        <p>Randafwerking totale prijs: €{bestelling?.randafwerking_prijs_totaal.toFixed(2)}</p>
                    </>
                )}
                <p>Spatrand prijs per m: €{bestelling?.spatrand_prijs_per_m.toFixed(2)}</p>
                <p>Spatrand totale prijs: €{bestelling?.spatrand_prijs_totaal.toFixed(2)}</p>
                <p>Offerte totale prijs:
                    €{(bestelling?.offerte_prijs_totaal.toFixed(2))}</p>
                <button type={"submit"}>Bestelling plaatsen</button>
            </form>
            <TableView viewObject={bestelling}/>
        </>
    );
}

export default BerekenBlad;
