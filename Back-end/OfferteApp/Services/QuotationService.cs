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

    public bool Create(Quotation quote)
    {
        context.Quotations.Add(quote);
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