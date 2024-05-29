using Microsoft.AspNetCore.Mvc;
using OfferteApp.Data;
using OfferteApp.Models;

namespace OfferteApp.Services;

public class QuotationService(DatabaseContext context)
{
    public IActionResult Get()
    {
        return new OkObjectResult(context.Quotations);
    }

    public bool Create(NewQuotation quote)
    {
        context.Quotations.Add(new Quotation()
        {
            Creation = DateTime.UtcNow,
            Name = quote.Name,
            AantalM2 = quote.AantalM2,
            PrijsPerM2 = quote.PrijsPerM2,
            PrijsM2Totaal = quote.PrijsM2Totaal,
            Randafwerking = quote.Randafwerking,
            RandafwerkingM = quote.RandafwerkingM,
            RandafwerkingPrijsPerM = quote.RandafwerkingPrijsPerM,
            RandafwerkingHoogteMm = quote.RandafwerkingHoogteMm,
            RandafwerkingPrijsTotaal = quote.RandafwerkingPrijsTotaal,
            SpatrandM = quote.SpatrandM,
            SpatrandPrijsPerM = quote.SpatrandPrijsPerM,
            SpatrandHoogteMm = quote.SpatrandHoogteMm,
            SpatrandPrijsTotaal = quote.SpatrandPrijsTotaal,
            VensterbankM = quote.VensterbankM,
            VensterbankPrijsPerM = quote.VensterbankPrijsPerM,
            VensterbankBreedteMm = quote.VensterbankBreedteMm,
            VensterbankPrijsTotaal = quote.VensterbankPrijsTotaal,
            Spoelbak = quote.Spoelbak,
            UitsparingSpoelbak = quote.UitsparingSpoelbak,
            SpoelbakPrijs = quote.SpoelbakPrijs,
            Kraangat = quote.Kraangat,
            KraangatPrijs = quote.KraangatPrijs,
            Zeepdispenser = quote.Zeepdispenser,
            ZeepdispenserPrijs = quote.ZeepdispenserPrijs,
            Boorgaten = quote.Boorgaten,
            BoorgatenStuk = quote.BoorgatenStuk,
            BoorgatenMm = quote.BoorgatenMm,
            BoorgatenPrijsPerStuk = quote.BoorgatenPrijsPerStuk,
            BoorgatenPrijsTotaal = quote.BoorgatenPrijsTotaal,
            WCD = quote.WCD,
            WCDPrijs = quote.WCDPrijs,
            Achterwand = quote.Achterwand,
            AchterwandM2 = quote.AchterwandM2,
            AchterwandPrijsPerM2 = quote.AchterwandPrijsPerM2,
            AchterwandPrijsTotaal = quote.AchterwandPrijsTotaal,
            OffertePrijsTotaal = quote.OffertePrijsTotaal
        });
        return context.SaveChanges() > 0;
    }

    public bool Edit(Quotation quote)
    {
        context.Quotations.Update(quote);
        return context.SaveChanges() > 0;
    }

    public bool Delete(int id)
    {
        var quote = context.Quotations.FirstOrDefault(q => q.Id == id);
        if (quote == null) return false;
        context.Quotations.Remove(quote);
        return context.SaveChanges() > 0;
    }
}