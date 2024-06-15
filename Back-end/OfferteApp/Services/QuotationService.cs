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
        try
        {
            var rand = new Random();
            var document = new PdfDocument();
            document.Info.Title = "Blis Digital";
            var page = document.AddPage();
            var gfx = XGraphics.FromPdfPage(page);
            var font = new XFont("Arial", 12, XFontStyle.Bold);


            gfx.DrawString("Blis Digital", font, XBrushes.Black, new XRect(0, 20, page.Width, 0), XStringFormats.TopCenter);
            gfx.DrawString($"ID: {rand.next(100, 100000)}", font, XBrushes.Black, new XRect(0, 40, page.Width, 0), XStringFormats.TopCenter);


            font = new XFont("Arial", 10, XFontStyle.Bold);
            gfx.DrawString("Item", font, XBrushes.Black, new XRect(40, 60, 200, 20), XStringFormats.TopLeft);
            gfx.DrawString("Amount", font, XBrushes.Black, new XRect(240, 60, 100, 20), XStringFormats.TopLeft);
            gfx.DrawString("Price", font, XBrushes.Black, new XRect(340, 60, 100, 20), XStringFormats.TopLeft);


            font = new XFont("Arial", 10);

            int yOffset = 80;
            DrawGridRow(gfx, font, "Name", quotation.Name, "", yOffset);
            yOffset += 20;
            DrawGridRow(gfx, font, "AantalM2", $"{quotation.AantalM2}m2", quotation.PrijsM2Totaal.ToString("C"),
                yOffset);
            yOffset += 20;
            DrawGridRow(gfx, font, "Randafwerking", quotation.Randafwerking ? "Yes" : "No",
                quotation.RandafwerkingPrijsTotaal.ToString("C"), yOffset);
            yOffset += 20;
            DrawGridRow(gfx, font, "Spatrand", $"{quotation.SpatrandHoogteMm}mm",
                quotation.SpatrandPrijsTotaal.ToString("C"), yOffset);
            yOffset += 20;
            DrawGridRow(gfx, font, "Vensterbank", $"{quotation.VensterbankM}m",
                quotation.VensterbankPrijsTotaal.ToString("C"), yOffset);
            yOffset += 20;
            DrawGridRow(gfx, font, "Spoelbak", quotation.Spoelbak ? quotation.UitsparingSpoelbak : "No",
                quotation.SpoelbakPrijs.ToString("C"), yOffset);
            yOffset += 20;
            DrawGridRow(gfx, font, "Kraangat", quotation.Kraangat ? "Yes" : "No",
                quotation.KraangatPrijs.ToString("C"), yOffset);
            yOffset += 20;
            DrawGridRow(gfx, font, "Zeepdispenser", quotation.Zeepdispenser ? "Yes" : "No",
                quotation.ZeepdispenserPrijs.ToString("C"), yOffset);
            yOffset += 20;
            DrawGridRow(gfx, font, "Boorgaten", quotation.BoorgatenStuk.ToString(),
                quotation.BoorgatenPrijsTotaal.ToString("C"), yOffset);
            yOffset += 20;
            DrawGridRow(gfx, font, "WCD", quotation.WCD ? "Yes" : "No", quotation.WCDPrijs.ToString("C"), yOffset);
            yOffset += 20;
            DrawGridRow(gfx, font, "Achterwand", $"{quotation.AchterwandM2}m2",
                quotation.AchterwandPrijsTotaal.ToString("C"), yOffset);

            gfx.DrawString($"Total Price: {quotation.OffertePrijsTotaal}", font, XBrushes.Black, new XRect(340, yOffset + 20, 200, 20), XStringFormats.TopLeft);


            font = new XFont("Arial", 8);
            gfx.DrawString("Generated by Blis Digital HRO Department", font, XBrushes.Gray, new XRect(0, page.Height - 30, page.Width, 20), XStringFormats.BottomCenter);

            var pdfPath = $".\\PDF\\Quote_{quotation.OffertePrijsTotaal}.pdf";
            document.Save(pdfPath);
            document.Close();


            return pdfPath;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }

        return "Failed";
    } 
    private static void DrawGridRow(XGraphics gfx, XFont font, string item, string amount, string price, int yOffset) 
    { 
        gfx.DrawString(item, font, XBrushes.Black,
            new XRect(40, yOffset, 200, 20),
            XStringFormats.TopLeft);
        gfx.DrawString(amount, font, XBrushes.Black,
            new XRect(240, yOffset, 100, 20),
            XStringFormats.TopLeft);
        gfx.DrawString(price, font, XBrushes.Black,
            new XRect(340, yOffset, 100, 20),
            XStringFormats.TopLeft); 
    }
}