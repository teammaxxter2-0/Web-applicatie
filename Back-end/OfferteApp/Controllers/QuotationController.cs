using Microsoft.AspNetCore.Mvc;
using OfferteApp.Data;
using OfferteApp.Models;
using OfferteApp.Services;

namespace OfferteApp.Controllers;

[ApiController]
[Route("[controller]")]
public class QuotationController(DatabaseContext context) : ControllerBase
{
    private readonly QuotationService _service = new(context);

    [HttpGet]
    public IActionResult Get()
    {
        return _service.Get();
    }

    [HttpPost]
    public IActionResult Create([FromBody] Quotation quote)
    {
        return _service.Create(quote) ? Ok() : BadRequest();
    }

    [HttpPut]
    public IActionResult Edit([FromBody] Quotation quote)
    {
        return _service.Edit(quote) ? Ok() : BadRequest();
    }

    [HttpDelete]
    [Route("{id}")]
    public IActionResult Delete(int id)
    {
        return _service.Delete(id) ? Ok() : BadRequest();
    }
}