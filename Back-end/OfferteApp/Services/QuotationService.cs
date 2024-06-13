using System.Net;
using System.Net.Mail;
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
            var _configuration = new Dictionary<string, string>
            {
                { "testEmail", "your_email@exmp.com" },
                { "Email:From", "Blis Digital" },
                { "Email:SMTPUserName", "visconticketsystemhelp@gmail.com" },
                { "Email:SMTPPassword", "gcph mqwe csfx oxdj " }
            };
            
            string receiverEmail = !string.IsNullOrEmpty(email) ? email : _configuration["testEmail"];
            var senderName = _configuration["Email:From"]!.ToString();
            var senderEmail = _configuration["Email:SMTPUserName"]!.ToString();
            var password = _configuration["Email:SMTPPasssword"]!.ToString();
            var fromAddress = new MailAddress(senderEmail, senderName);
            var toAddress = new MailAddress(receiverEmail);
            Attachment attachment = new Attachment("file.pdf");
            
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
        catch (SmtpException ex)
        {
            return false;
        }
    }
}