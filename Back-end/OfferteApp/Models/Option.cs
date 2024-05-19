namespace OfferteApp.Models;

public class Option
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Spatrand { get; set; }
    public string Vensterbank { get; set; }
    public bool BoorgatenPerStuk { get; set; }
    public bool Wcd { get; set; }
    public bool Randafwerking { get; set; }
    public decimal PrijsPerM2 { get; set; }
    public decimal RandafwerkingPerM { get; set; }
    public decimal SpatrandPerM { get; set; }
    public decimal VensterbankPerM { get; set; }
    public decimal UitsparingOnderbouw { get; set; }
    public decimal UitsparingInleg { get; set; }
    public decimal UitsparingRuw { get; set; }
    public decimal Kraangat { get; set; }
    public decimal Zeepdispenser { get; set; }
    public decimal BoorgatenPerStukPrijs { get; set; }
    public decimal WcdPrijs { get; set; }
    public decimal AchterwandPerM { get; set; }
    public decimal RandafwerkingPerMPrice { get; set; }
}