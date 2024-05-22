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
    const errorVal = <>Ongeldige materiaalsoort.</>;
    const [aantalM2, setAantalM2] = useState(0);
    const [aantalMSpatrand, setAantalMSpatrand] = useState(0);
    const [aantalMRandafwerking, setAantalMRandafwerking] = useState(0);
    const [randafwerkingHoogte, setRandafwerkingHoogte] = useState(0);
    const [spatrandHoogte, setSpatrandHoogte] = useState(0);
    const [bestelling, setBestelling] = useState<Bestelling>();
    let randafwerkingPrijsTotaal = 0;
    let spatrandPrijsTotaal = 0;

    useEffect(() => {
        if (!bestelling) return;

        const updatedBestelling: Bestelling = {
            ...bestelling,
            prijs_m2_totaal: aantalM2 * bestelling.prijs_per_m2,
            randafwerking_prijs_totaal: randafwerkingPrijsTotaal,
            spatrand_prijs_totaal: spatrandPrijsTotaal,
            offerte_prijs_totaal: CalculateTotal(bestelling),
            randafwerking_m: aantalMRandafwerking,
        };

        setBestelling(updatedBestelling);
    }, [bestelling, randafwerkingPrijsTotaal, spatrandPrijsTotaal, aantalM2, aantalMSpatrand, aantalMRandafwerking, randafwerkingHoogte, spatrandHoogte]);


    if (params === undefined || params.id === undefined) return errorVal;

    const material = options.find(o => o.id === parseInt(params.id as string));
    if (material === undefined) return errorVal;


    setBestelling({name: material.name,
        aantal_m2: 0,
        prijs_per_m2: material.prijsPerM2,
        prijs_m2_totaal: 0,
        randafwerking: material.randafwerking,
        randafwerking_m: 0,
        randafwerking_prijs_per_m: material.randafwerkingPerM,
        randafwerking_hoogte_mm: 0,
        randafwerking_prijs_totaal: 0,
        spatrand_m: material.spatrand,
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
        offerte_prijs_totaal: 0});

    if (material.randafwerking) {
        randafwerkingPrijsTotaal = aantalMRandafwerking * material.randafwerkingPerM * (randafwerkingHoogte/1000);
    }

    if (spatrandHoogte >= 0 && spatrandHoogte <= 150) {
        spatrandPrijsTotaal = aantalMSpatrand * material.spatrandPerM;
    }
    else if (spatrandHoogte > 150)
    {
        setSpatrandHoogte(150)
        spatrandPrijsTotaal = aantalMSpatrand * material.spatrandPerM;
    }

    const handleBestelling = (e: React.FormEvent) => {
        e.preventDefault();

        console.log('Bestelling:', bestelling);
    }

    return (
        <>
            <Navbar />
            <h1>Bereken uw keukenblad</h1>
            <form onSubmit={handleBestelling}>
                <label>Materiaal: {material.name}</label>
                <label>
                    Voer het aantal vierkante meters in:
                    <input
                        type="number"
                        value={aantalM2}
                        onChange={(e) => setAantalM2(parseFloat(e.target.value))}
                        min="0"
                        step="0.01"
                    />
                </label>
                {material.randafwerking && (
                    <label>
                        Voer het aantal meters randafwerking in:
                        <input
                            type="number"
                            value={aantalMRandafwerking}
                            onChange={(e) => setAantalMRandafwerking(parseFloat(e.target.value))}
                            min="0"
                            step="0.01"
                        />
                    </label>
                )}
                {material.randafwerking && (
                    <label>
                        Voer de hoogte van de randafwerking in (mm):
                        <input
                            type="number"
                            value={randafwerkingHoogte}
                            onChange={(e) => setRandafwerkingHoogte(parseFloat(e.target.value))}
                            min="0"
                            step="1"
                        />
                    </label>
                )}
                <label>
                    Voer het aantal meters spatrand in:
                    <input
                        type="number"
                        value={aantalMRandafwerking}
                        onChange={(e) => setAantalMSpatrand(parseFloat(e.target.value))}
                        min="0"
                        step="0.01"
                    />
                </label>
                <label>
                    Voer de hoogte van de spatrand in (mm) (tussen 0 en 150):
                    <input
                        type="number"
                        value={spatrandHoogte}
                        onChange={(e) => setSpatrandHoogte(parseFloat(e.target.value))}
                        min="0"
                        max="150"
                        step="1"
                    />
                </label>
                <p>Prijs per m²: €{material.prijsPerM2.toFixed(2)}</p>
                <p>Totaalprijs voor {aantalM2} m²: €{bestelling?.prijs_m2_totaal.toFixed(2)}</p>
                {material.randafwerking && (
                    <>
                        <p>Randafwerking prijs per m: €{material.randafwerkingPerM.toFixed(2)}</p>
                        <p>Randafwerking totale prijs: €{randafwerkingPrijsTotaal.toFixed(2)}</p>
                    </>
                )}
                <p>Spatrand prijs per m: €{material.spatrandPerM.toFixed(2)}</p>
                <p>Spatrand totale prijs: €{spatrandPrijsTotaal.toFixed(2)}</p>
                <p>Offerte totale prijs:
                    €{(bestelling?.offerte_prijs_totaal)}</p>
                <button type={"submit"}>Bestelling plaatsen</button>
            </form>
            <TableView viewObject={bestelling}/>
        </>
    );
}

export default BerekenBlad;
