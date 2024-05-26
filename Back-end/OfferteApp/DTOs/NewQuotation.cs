namespace OfferteApp.Models;

public class NewQuotation
{
    public string Name { get; set; }
    public decimal AantalM2 { get; set; }
    public decimal PrijsPerM2 { get; set; }
    public decimal PrijsM2Totaal { get; set; }
    public bool Randafwerking { get; set; }
    public decimal RandafwerkingM { get; set; }
    public decimal RandafwerkingPrijsPerM { get; set; }
    public decimal RandafwerkingHoogteMm { get; set; }
    public decimal RandafwerkingPrijsTotaal { get; set; }
    public decimal SpatrandM { get; set; }
    public decimal SpatrandPrijsPerM { get; set; }
    public decimal SpatrandHoogteMm { get; set; }
    public decimal SpatrandPrijsTotaal { get; set; }
    public decimal VensterbankM { get; set; }
    public decimal VensterbankPrijsPerM { get; set; }
    public decimal VensterbankBreedteMm { get; set; }
    public decimal VensterbankPrijsTotaal { get; set; }
    public bool Spoelbak { get; set; }
    public string? UitsparingSpoelbak { get; set; }
    public decimal SpoelbakPrijs { get; set; }
    public bool Kraangat { get; set; }
    public decimal KraangatPrijs { get; set; }
    public bool Zeepdispenser { get; set; }
    public decimal ZeepdispenserPrijs { get; set; }
    public bool Boorgaten { get; set; }
    public int BoorgatenStuk { get; set; }
    public decimal BoorgatenMm { get; set; }
    public decimal BoorgatenPrijsPerStuk { get; set; }
    public decimal BoorgatenPrijsTotaal { get; set; }
    public bool WCD { get; set; }
    public decimal WCDPrijs { get; set; }
    public bool Achterwand { get; set; }
    public decimal AchterwandM2 { get; set; }
    public decimal AchterwandPrijsPerM2 { get; set; }
    public decimal AchterwandPrijsTotaal { get; set; }
    public decimal OffertePrijsTotaal { get; set; }
}