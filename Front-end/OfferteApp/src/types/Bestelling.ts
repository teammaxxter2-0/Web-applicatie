export interface Bestelling {
    name: string,
    aantal_m2: number,
    prijs_per_m2: number,
    prijs_m2_totaal: number,
    randafwerking: boolean,
    randafwerking_m: number,
    randafwerking_prijs_per_m: number,
    randafwerking_hoogte_mm: number,
    randafwerking_prijs_totaal: number,
    spatrand_m: number,
    spatrand_prijs_per_m: number,
    spatrand_hoogte_mm: number,
    spatrand_prijs_totaal: number,
    vensterbank_m: number,
    vensterbank_prijs_per_m: number,
    vensterbank_breedte_mm: number,
    vensterbank_prijs_totaal: number,
    spoelbak: boolean,
    uitsparing_spoelbak: string,
    spoelbak_prijs: number,
    kraangat: boolean,
    kraangat_prijs: number,
    zeepdispenser: boolean,
    zeepdispenser_prijs: number,
    boorgaten: boolean,
    boorgaten_stuk: number,
    boorgaten_mm: number,
    boorgaten_prijs_per_stuk: number,
    bootgaten_prijs_totaal: number,
    WCD: boolean,
    WCD_prijs: number,
    achterwand: boolean,
    acherwand_m2: number,
    achterwand_prijs_per_m2: number,
    achterwand_prijs_totaal: number,
    offerte_prijs_totaal: number,
}