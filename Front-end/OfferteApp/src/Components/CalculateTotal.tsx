import {Bestelling} from "../interfaces/Bestelling.ts";


function CalculateTotal(bestelling: Bestelling): number {
    const prijsM2Totaal = bestelling.aantal_m2 * bestelling.prijs_per_m2;
    const randafwerkingPrijsTotaal = bestelling.randafwerking_m * bestelling.randafwerking_prijs_per_m;
    const spatrandPrijsTotaal = bestelling.spatrand_m * bestelling.spatrand_prijs_per_m;
    const vensterbankPrijsTotaal = bestelling.vensterbank_m * bestelling.vensterbank_prijs_per_m;
    const boorgatenPrijsTotaal = bestelling.boorgaten_stuk * bestelling.boorgaten_prijs_per_stuk;
    const achterwandPrijsTotaal = bestelling.achterwand_m2 * bestelling.achterwand_prijs_per_m2;

    return prijsM2Totaal +
        randafwerkingPrijsTotaal +
        spatrandPrijsTotaal +
        vensterbankPrijsTotaal +
        (bestelling.spoelbak ? bestelling.spoelbak_prijs : 0) +
        (bestelling.kraangat ? bestelling.kraangat_prijs : 0) +
        (bestelling.zeepdispenser ? bestelling.zeepdispenser_prijs : 0) +
        boorgatenPrijsTotaal +
        (bestelling.wcd ? bestelling.wcd_prijs : 0) +
        achterwandPrijsTotaal;
}

export default CalculateTotal;