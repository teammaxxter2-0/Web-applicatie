import {Bestelling} from "../interfaces/Bestelling.ts";
import jsPDF from "jspdf";

function GeneratePDF(bestelling: Bestelling) {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text("Offerte van [GEBRUIKER]", 10, 20);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const marginLeft = 10;
    let marginTop = 30;

    const addText = (label: string, value: string) => {
        doc.text(`${label}: ${value}`, marginLeft, marginTop);
        marginTop += 8;
    };

    addText("Naam", bestelling.name);
    addText("Aantal m2", bestelling.aantal_m2.toString());
    addText("Prijs per m2", `€${bestelling.prijs_per_m2}`);
    addText("Prijs m2 Totaal", `€${bestelling.prijs_m2_totaal}`);
    addText("Randafwerking", bestelling.randafwerking ? 'Ja' : 'Nee');
    addText("Randafwerking m", bestelling.randafwerking_m.toString());
    addText("Randafwerking Prijs per m", `€${bestelling.randafwerking_prijs_per_m}`);
    addText("Randafwerking Hoogte (mm)", bestelling.randafwerking_hoogte_mm.toString());
    addText("Randafwerking Prijs Totaal", `€${bestelling.randafwerking_prijs_totaal}`);
    addText("Spatrand m", bestelling.spatrand_m.toString());
    addText("Spatrand Prijs per m", `€${bestelling.spatrand_prijs_per_m}`);
    addText("Spatrand Hoogte (mm)", bestelling.spatrand_hoogte_mm.toString());
    addText("Spatrand Prijs Totaal", `€${bestelling.spatrand_prijs_totaal}`);
    addText("Vensterbank m", bestelling.vensterbank_m.toString());
    addText("Vensterbank Prijs per m", `€${bestelling.vensterbank_prijs_per_m}`);
    addText("Vensterbank Breedte (mm)", bestelling.vensterbank_breedte_mm.toString());
    addText("Vensterbank Prijs Totaal", `€${bestelling.vensterbank_prijs_totaal}`);
    addText("Spoelbak", bestelling.spoelbak ? 'Ja' : 'Nee');
    addText("Uitsparing Spoelbak", bestelling.uitsparing_spoelbak);
    addText("Spoelbak Prijs", `€${bestelling.spoelbak_prijs}`);
    addText("Kraangat", bestelling.kraangat ? 'Ja' : 'Nee');
    addText("Kraangat Prijs", `€${bestelling.kraangat_prijs}`);
    addText("Zeepdispenser", bestelling.zeepdispenser ? 'Ja' : 'Nee');
    addText("Zeepdispenser Prijs", `€${bestelling.zeepdispenser_prijs}`);
    addText("Boorgaten", bestelling.boorgaten ? 'Ja' : 'Nee');
    addText("Boorgaten Stuk", bestelling.boorgaten_stuk.toString());
    addText("Boorgaten mm", bestelling.boorgaten_mm.toString());
    addText("Boorgaten Prijs per Stuk", `€${bestelling.boorgaten_prijs_per_stuk}`);
    addText("Boorgaten Prijs Totaal", `€${bestelling.boorgaten_prijs_totaal}`);
    if (bestelling.wcd) {
        addText("WCD", bestelling.wcd ? 'Ja' : 'Nee');
        addText("WCD Prijs", `€${bestelling.wcd_prijs}`);
    }
    addText("Achterwand", bestelling.achterwand ? 'Ja' : 'Nee');
    addText("Achterwand m2", bestelling.achterwand_m2.toString());
    addText("Achterwand Prijs per m2", `€${bestelling.achterwand_prijs_per_m2}`);
    addText("Achterwand Prijs Totaal", `€${bestelling.achterwand_prijs_totaal}`);
    addText("Offerte Prijs Totaal", `€${bestelling.offerte_prijs_totaal}`);

    doc.save("Offerte.pdf");
}

export default GeneratePDF;