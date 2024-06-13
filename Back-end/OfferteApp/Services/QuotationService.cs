using System.Net;
using System.Net.Mail;
using Microsoft.AspNetCore.Mvc;
using OfferteApp.Data;
using OfferteApp.Models;
using PdfSharp.Drawing;
using PdfSharp.Pdf;

namespace OfferteApp.Services;

public class QuotationService(DatabaseContext context, IConfiguration configuration)
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
            Accepted = false,
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

    public bool Accept(int id)
    {
        var quote = context.Quotations.FirstOrDefault(u => u.Id == id);
        if (quote == null) return false;
        quote.Accepted = true;
        SendEmail(quote);
        context.Quotations.Update(quote);
        return context.SaveChanges() > 0;
    }
    
    private bool SendEmail(Quotation quotation, string email="")
    {
        try
        {
            if (configuration["Email:From"] == null || configuration["Email:Username"] == null 
                                                    || configuration["Email:Password"] == null
                                                    || configuration["Email:Test"] == null) return false;
            var receiverEmail = string.IsNullOrEmpty(email) ? email : configuration["Test"];
            var senderName = configuration["Email:From"];
            var senderEmail = configuration["Email:Username"];
            var password = configuration["Email:Password"];
            var fromAddress = new MailAddress(senderEmail, senderName);
            var toAddress = new MailAddress(receiverEmail);
            var pdf = GeneratePdf(quotation);
            var attachment = new Attachment(pdf);
            
            using var smtpClient = new SmtpClient("smtp.gmail.com");
            smtpClient.Port = 587;
            smtpClient.Credentials =
                new NetworkCredential(fromAddress.Address, password);
            smtpClient.EnableSsl = true;

            using var message = new MailMessage(fromAddress, toAddress);
            message.Subject = "Quote";
            message.Body = "Leuke body...";
            message.Attachments.Add(attachment);
            smtpClient.SendMailAsync(message);

            return true;
        }
        catch (SmtpException)
        {
            return false;
        }
    }
    
    private string GeneratePdf(Quotation quotation)
    {
        var document = new PdfDocument();
        document.Info.Title = "Quotation";

        var page = document.AddPage();
        var gfx = XGraphics.FromPdfPage(page);
        var font = new XFont("Arial", 12);

        var format = new XStringFormat();
        format.Alignment = XStringAlignment.Near;

        gfx.DrawString("Quotation", font, XBrushes.Black, new XRect(0, 20, page.Width, 0), format);

        string details = $"Name: {quotation.Name}\n" +
                         $"Total Price: {quotation.OffertePrijsTotaal}\n" +
                         $"Aantal m2: {quotation.AantalM2}\n" +
                         $"Prijs per m2: {quotation.PrijsPerM2}\n" +
                         $"Prijs m2 totaal: {quotation.PrijsM2Totaal}\n" +
                         $"Randafwerking: {(quotation.Randafwerking ? "Yes" : "No")}\n" +
                         $"Randafwerking m: {quotation.RandafwerkingM}\n" +
                         $"Randafwerking prijs per m: {quotation.RandafwerkingPrijsPerM}\n" +
                         $"Randafwerking hoogte mm: {quotation.RandafwerkingHoogteMm}\n" +
                         $"Randafwerking prijs totaal: {quotation.RandafwerkingPrijsTotaal}\n" +
                         $"Spatrand m: {quotation.SpatrandM}\n" +
                         $"Spatrand prijs per m: {quotation.SpatrandPrijsPerM}\n" +
                         $"Spatrand hoogte mm: {quotation.SpatrandHoogteMm}\n" +
                         $"Spatrand prijs totaal: {quotation.SpatrandPrijsTotaal}\n" +
                         $"Vensterbank m: {quotation.VensterbankM}\n" +
                         $"Vensterbank prijs per m: {quotation.VensterbankPrijsPerM}\n" +
                         $"Vensterbank breedte mm: {quotation.VensterbankBreedteMm}\n" +
                         $"Vensterbank prijs totaal: {quotation.VensterbankPrijsTotaal}\n" +
                         $"Spoelbak: {(quotation.Spoelbak ? "Yes" : "No")}\n" +
                         $"Uitsparing spoelbak: {quotation.UitsparingSpoelbak}\n" +
                         $"Spoelbak prijs: {quotation.SpoelbakPrijs}\n" +
                         $"Kraangat: {(quotation.Kraangat ? "Yes" : "No")}\n" +
                         $"Kraangat prijs: {quotation.KraangatPrijs}\n" +
                         $"Zeepdispenser: {(quotation.Zeepdispenser ? "Yes" : "No")}\n" +
                         $"Zeepdispenser prijs: {quotation.ZeepdispenserPrijs}\n" +
                         $"Boorgaten: {(quotation.Boorgaten ? "Yes" : "No")}\n" +
                         $"Boorgaten stuk: {quotation.BoorgatenStuk}\n" +
                         $"Boorgaten mm: {quotation.BoorgatenMm}\n" +
                         $"Boorgaten prijs per stuk: {quotation.BoorgatenPrijsPerStuk}\n" +
                         $"Boorgaten prijs totaal: {quotation.BoorgatenPrijsTotaal}\n" +
                         $"WCD: {(quotation.WCD ? "Yes" : "No")}\n" +
                         $"WCD prijs: {quotation.WCDPrijs}\n" +
                         $"Achterwand: {(quotation.Achterwand ? "Yes" : "No")}\n" +
                         $"Achterwand m2: {quotation.AchterwandM2}\n" +
                         $"Achterwand prijs per m2: {quotation.AchterwandPrijsPerM2}\n" +
                         $"Achterwand prijs totaal: {quotation.AchterwandPrijsTotaal}\n" +
                         $"Offerte prijs totaal: {quotation.OffertePrijsTotaal}";
        
        gfx.DrawString(details, font, XBrushes.Black, new XRect(40, 40, page.Width - 80, page.Height - 40), format);
        var file_loc = $"../PDF/Quote_{quotation.OffertePrijsTotaal}.pdf";
        document.Save(file_loc);
        document.Close();
        return file_loc;
    }
}