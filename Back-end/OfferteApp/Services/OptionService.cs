using Microsoft.AspNetCore.Mvc;
using OfferteApp.Data;
using OfferteApp.Models;

namespace OfferteApp.Services;

public class OptionService(DatabaseContext context)
{
    public IActionResult Get()
    {
        if (!context.Options.Any())
            if (!Seed())
                return new BadRequestObjectResult("There was a problem seeding the database. It's still empty.");
        return new OkObjectResult(context.Options);
    }

    public IActionResult GetOne(int id)
    {
        var thing = context.Options.FirstOrDefault(o => o.Id == id);
        if (thing == null)
        {
            return new NoContentResult();
        }

        return new OkObjectResult(thing);
    }

    public bool Create(Option option)
    {
        context.Options.Add(option);
        return context.SaveChanges() > 0;
    }

    public bool Edit(Option option)
    {
        context.Options.Update(option);
        return context.SaveChanges() > 0;
    }

    public bool Delete(int id)
    {
        var option = context.Options.FirstOrDefault(q => q.Id == id);
        if (option == null) return false;
        context.Options.Remove(option);
        return context.SaveChanges() > 0;
    }

    public bool Seed()
    {
        var list = new List<Option>
        {
            new Option()
            {
                Name = "Noble Desiree Grey Matt",
                Spatrand = "0-150 mm",
                Vensterbank = "150 mm+",
                BoorgatenPerStuk = true,
                Wcd = true,
                Randafwerking = false,
                PrijsPerM2 = 247.52m,
                RandafwerkingPerM = 87.00m,
                SpatrandPerM = 35.00m,
                VensterbankPerM = 309.40m,
                UitsparingOnderbouw = 151.50m,
                UitsparingInleg = 97.50m,
                UitsparingRuw = 70.00m,
                Kraangat = 10.70m,
                Zeepdispenser = 10.70m,
                BoorgatenPerStukPrijs = 5.00m,
                WcdPrijs = 13.50m,
                AchterwandPerM = 309.40m,
                RandafwerkingPerMPrice = 28.00m
            },
            new Option()
            {
                Name = "Noble Carrara Verzoet",
                Spatrand = "150 mm+",
                Vensterbank = "0-150 mm",
                BoorgatenPerStuk = true,
                Wcd = true,
                Randafwerking = true,
                PrijsPerM2 = 258.40m,
                RandafwerkingPerM = 87.00m,
                SpatrandPerM = 309.40m,
                VensterbankPerM = 35.00m,
                UitsparingOnderbouw = 151.50m,
                UitsparingInleg = 97.50m,
                UitsparingRuw = 70.00m,
                Kraangat = 10.70m,
                Zeepdispenser = 10.70m,
                BoorgatenPerStukPrijs = 5.00m,
                WcdPrijs = 13.50m,
                AchterwandPerM = 315.60m,
                RandafwerkingPerMPrice = 28.00m
            },
            new Option()
            {
                Name = "Taurus Terazzo White Verzoet",
                Spatrand = "0-150 mm",
                Vensterbank = "0-150 mm",
                BoorgatenPerStuk = false,
                Wcd = false,
                Randafwerking = true,
                PrijsPerM2 = 239.40m,
                RandafwerkingPerM = 79.00m,
                SpatrandPerM = 35.00m,
                VensterbankPerM = 35.00m,
                UitsparingOnderbouw = 151.50m,
                UitsparingInleg = 97.50m,
                UitsparingRuw = 70.00m,
                Kraangat = 10.70m,
                Zeepdispenser = 10.70m,
                BoorgatenPerStukPrijs = 5.00m,
                WcdPrijs = 13.50m,
                AchterwandPerM = 298.50m,
                RandafwerkingPerMPrice = 28.00m
            },
            new Option()
            {
                Name = "Taurus Terazzo Black",
                Spatrand = "150 mm+",
                Vensterbank = "150 mm+",
                BoorgatenPerStuk = true,
                Wcd = true,
                Randafwerking = true,
                PrijsPerM2 = 228.50m,
                RandafwerkingPerM = 79.00m,
                SpatrandPerM = 309.40m,
                VensterbankPerM = 309.40m,
                UitsparingOnderbouw = 151.50m,
                UitsparingInleg = 97.50m,
                UitsparingRuw = 70.00m,
                Kraangat = 10.70m,
                Zeepdispenser = 10.70m,
                BoorgatenPerStukPrijs = 5.00m,
                WcdPrijs = 13.50m,
                AchterwandPerM = 289.50m,
                RandafwerkingPerMPrice = 28.00m
            },
            new Option()
            {
                Name = "Glencoe Verzoet",
                Spatrand = "0-150; 150 mm+",
                Vensterbank = "150 mm+",
                BoorgatenPerStuk = false,
                Wcd = false,
                Randafwerking = true,
                PrijsPerM2 = 305.50m,
                RandafwerkingPerM = 95.00m,
                SpatrandPerM = 40.00m,  // Assuming value 40 for 0-150 mm and 350 for 150 mm+, adjust if necessary
                VensterbankPerM = 340.50m,
                UitsparingOnderbouw = 151.50m,
                UitsparingInleg = 97.50m,
                UitsparingRuw = 70.00m,
                Kraangat = 10.70m,
                Zeepdispenser = 10.70m,
                BoorgatenPerStukPrijs = 5.00m,
                WcdPrijs = 13.50m,
                AchterwandPerM = 315.60m,
                RandafwerkingPerMPrice = 28.00m
            }
        };
        foreach (var item in list)
        {
            if (context.Options.Any(o => o.Name == item.Name))
            {
                context.Options.Update(item);
            }
            else
            {
                context.Options.Add(item);
            }
        }

        context.SaveChanges();
        foreach (var item in list)
        {
            if (!context.Options.Any(o => o.Name == item.Name))
                return false;
        }
        return true;
    }
}