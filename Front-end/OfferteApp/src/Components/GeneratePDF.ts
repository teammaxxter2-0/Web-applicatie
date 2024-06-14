import { Bestelling } from "../interfaces/Bestelling.ts";
import jsPDF from "jspdf";

function GeneratePDF(bestelling: Bestelling) {
    const doc = new jsPDF();
    const marginLeft = 20;
    let marginTop = 20;
    const pageHeight = doc.internal.pageSize.height;
    const bottomMargin = 20;

    const addText = (label: string, value: string) => {
        if (marginTop > pageHeight - bottomMargin) {
            doc.addPage();
            marginTop = 20;
        }
        doc.text(`${label}: ${value}`, marginLeft, marginTop);
        marginTop += 8;
    };

    const addSectionTitle = (title: string) => {
        if (marginTop > pageHeight - bottomMargin) {
            doc.addPage();
            marginTop = 20;
        }
        marginTop += 10;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.text(title, marginLeft, marginTop);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        marginTop += 6;
    };

    const addHeader = () => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(20);
        doc.setTextColor(40, 40, 40);
        doc.text("Offerte van" , marginLeft, marginTop);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 100, 100);
        marginTop += 10;
        doc.text("Bedrijfsnaam: [Bedrijfsnaam]", marginLeft, marginTop);
        marginTop += 8;
        doc.text("Adres: [Adres]", marginLeft, marginTop);
        marginTop += 8;
        doc.text("Telefoon: [Telefoonnummer]", marginLeft, marginTop);
        marginTop += 8;
        doc.text("Email: [Emailadres]", marginLeft, marginTop);
        marginTop += 20; // Extra space before the main content
    };

    addHeader();
    doc.setTextColor(40, 40, 40);
    addSectionTitle("Meubelgegevens");
    addText("Naam", bestelling.name);
    addText("Aantal m2", bestelling.aantal_m2.toString());
    addText("Prijs per m2", `€${bestelling.prijs_per_m2}`);
    addText("Prijs m2 Totaal", `€${bestelling.prijs_m2_totaal}`);

    // Randafwerking Section
    addSectionTitle("Randafwerking");
    addText("Randafwerking", bestelling.randafwerking ? 'Ja' : 'Nee');
    if (bestelling.randafwerking) {
        addText("Randafwerking m", bestelling.randafwerking_m.toString());
        addText("Randafwerking Prijs per m", `€${bestelling.randafwerking_prijs_per_m}`);
        addText("Randafwerking Hoogte (mm)", bestelling.randafwerking_hoogte_mm.toString());
        addText("Randafwerking Prijs Totaal", `€${bestelling.randafwerking_prijs_totaal}`);
    }

    // Spatrand Section
    addSectionTitle("Spatrand");
    addText("Spatrand m", bestelling.spatrand_m.toString());
    addText("Spatrand Prijs per m", `€${bestelling.spatrand_prijs_per_m}`);
    addText("Spatrand Hoogte (mm)", bestelling.spatrand_hoogte_mm.toString());
    addText("Spatrand Prijs Totaal", `€${bestelling.spatrand_prijs_totaal}`);

    // Vensterbank Section
    addSectionTitle("Vensterbank");
    addText("Vensterbank m", bestelling.vensterbank_m.toString());
    addText("Vensterbank Prijs per m", `€${bestelling.vensterbank_prijs_per_m}`);
    addText("Vensterbank Breedte (mm)", bestelling.vensterbank_breedte_mm.toString());
    addText("Vensterbank Prijs Totaal", `€${bestelling.vensterbank_prijs_totaal}`);

    // Spoelbak Section
    addSectionTitle("Spoelbak");
    addText("Spoelbak", bestelling.spoelbak ? 'Ja' : 'Nee');
    if (bestelling.spoelbak) {
        addText("Uitsparing Spoelbak", bestelling.uitsparing_spoelbak);
        addText("Spoelbak Prijs", `€${bestelling.spoelbak_prijs}`);
    }

    // Kraangat Section
    addSectionTitle("Kraangat");
    addText("Kraangat", bestelling.kraangat ? 'Ja' : 'Nee');
    if (bestelling.kraangat) {
        addText("Kraangat Prijs", `€${bestelling.kraangat_prijs}`);
    }

    // Zeepdispenser Section
    addSectionTitle("Zeepdispenser");
    addText("Zeepdispenser", bestelling.zeepdispenser ? 'Ja' : 'Nee');
    if (bestelling.zeepdispenser) {
        addText("Zeepdispenser Prijs", `€${bestelling.zeepdispenser_prijs}`);
    }

    // Boorgaten Section
    addSectionTitle("Boorgaten");
    addText("Boorgaten", bestelling.boorgaten ? 'Ja' : 'Nee');
    if (bestelling.boorgaten) {
        addText("Boorgaten Stuk", bestelling.boorgaten_stuk.toString());
        addText("Boorgaten mm", bestelling.boorgaten_mm.toString());
        addText("Boorgaten Prijs per Stuk", `€${bestelling.boorgaten_prijs_per_stuk}`);
        addText("Boorgaten Prijs Totaal", `€${bestelling.boorgaten_prijs_totaal}`);
    }

    // WCD Section
    addSectionTitle("WCD");
    addText("WCD", bestelling.wcd ? 'Ja' : 'Nee');
    if (bestelling.wcd) {
        addText("WCD Prijs", `€${bestelling.wcd_prijs}`);
    }

    // Achterwand Section
    addSectionTitle("Achterwand");
    addText("Achterwand", bestelling.achterwand ? 'Ja' : 'Nee');
    if (bestelling.achterwand) {
        addText("Achterwand m2", bestelling.achterwand_m2.toString());
        addText("Achterwand Prijs per m2", `€${bestelling.achterwand_prijs_per_m2}`);
        addText("Achterwand Prijs Totaal", `€${bestelling.achterwand_prijs_totaal}`);
    }

    // Separator line before the total
    marginTop += 10;
    if (marginTop > pageHeight - bottomMargin) {
        doc.addPage();
        marginTop = 20;
    }
    doc.text("------------------------------------------------------------", marginLeft, marginTop);
    marginTop += 10;

    addSectionTitle("Totaal");
    addText("Offerte Prijs Totaal", `€${bestelling.offerte_prijs_totaal}`);

    doc.save("Offerte.pdf");
}

export default GeneratePDF;
