using System.Text.Json.Serialization;

namespace OfferteApp.Models
{
    public class NewQuotation
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("aantal_m2")]
        public double AantalM2 { get; set; }

        [JsonPropertyName("prijs_per_m2")]
        public double PrijsPerM2 { get; set; }

        [JsonPropertyName("prijs_m2_totaal")]
        public double PrijsM2Totaal { get; set; }

        [JsonPropertyName("randafwerking")]
        public bool Randafwerking { get; set; }

        [JsonPropertyName("randafwerking_m")]
        public double RandafwerkingM { get; set; }

        [JsonPropertyName("randafwerking_prijs_per_m")]
        public double RandafwerkingPrijsPerM { get; set; }

        [JsonPropertyName("randafwerking_hoogte_mm")]
        public double RandafwerkingHoogteMm { get; set; }

        [JsonPropertyName("randafwerking_prijs_totaal")]
        public double RandafwerkingPrijsTotaal { get; set; }

        [JsonPropertyName("spatrand_m")]
        public double SpatrandM { get; set; }

        [JsonPropertyName("spatrand_prijs_per_m")]
        public double SpatrandPrijsPerM { get; set; }

        [JsonPropertyName("spatrand_hoogte_mm")]
        public double SpatrandHoogteMm { get; set; }

        [JsonPropertyName("spatrand_prijs_totaal")]
        public double SpatrandPrijsTotaal { get; set; }

        [JsonPropertyName("vensterbank_m")]
        public double VensterbankM { get; set; }

        [JsonPropertyName("vensterbank_prijs_per_m")]
        public double VensterbankPrijsPerM { get; set; }

        [JsonPropertyName("vensterbank_breedte_mm")]
        public double VensterbankBreedteMm { get; set; }

        [JsonPropertyName("vensterbank_prijs_totaal")]
        public double VensterbankPrijsTotaal { get; set; }

        [JsonPropertyName("spoelbak")]
        public bool Spoelbak { get; set; }

        [JsonPropertyName("uitsparing_spoelbak")]
        public string? UitsparingSpoelbak { get; set; }

        [JsonPropertyName("spoelbak_prijs")]
        public double SpoelbakPrijs { get; set; }

        [JsonPropertyName("kraangat")]
        public bool Kraangat { get; set; }

        [JsonPropertyName("kraangat_prijs")]
        public double KraangatPrijs { get; set; }

        [JsonPropertyName("zeepdispenser")]
        public bool Zeepdispenser { get; set; }

        [JsonPropertyName("zeepdispenser_prijs")]
        public double ZeepdispenserPrijs { get; set; }

        [JsonPropertyName("boorgaten")]
        public bool Boorgaten { get; set; }

        [JsonPropertyName("boorgaten_stuk")]
        public int BoorgatenStuk { get; set; }

        [JsonPropertyName("boorgaten_mm")]
        public double BoorgatenMm { get; set; }

        [JsonPropertyName("boorgaten_prijs_per_stuk")]
        public double BoorgatenPrijsPerStuk { get; set; }

        [JsonPropertyName("boorgaten_prijs_totaal")]
        public double BoorgatenPrijsTotaal { get; set; }

        [JsonPropertyName("wcd")]
        public bool WCD { get; set; }

        [JsonPropertyName("wcd_prijs")]
        public double WCDPrijs { get; set; }

        [JsonPropertyName("achterwand")]
        public bool Achterwand { get; set; }

        [JsonPropertyName("achterwand_m2")]
        public double AchterwandM2 { get; set; }

        [JsonPropertyName("achterwand_prijs_per_m2")]
        public double AchterwandPrijsPerM2 { get; set; }

        [JsonPropertyName("achterwand_prijs_totaal")]
        public double AchterwandPrijsTotaal { get; set; }

        [JsonPropertyName("offerte_prijs_totaal")]
        public double OffertePrijsTotaal { get; set; }
    }
}
