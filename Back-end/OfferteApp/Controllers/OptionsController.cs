using Microsoft.AspNetCore.Mvc;
using OfferteApp.Data;
using OfferteApp.Models;
using OfferteApp.Services;

namespace OfferteApp.Controllers;

[ApiController]
[Route("[controller]")]
public class OptionsController(DatabaseContext context): ControllerBase
{
    private readonly OptionService _service = new(context);

    [HttpGet]
    public IActionResult Get()
    {
        return _service.Get();
    }

    [HttpGet("{id}")]
    public IActionResult GetOne(int id)
    {
        return _service.GetOne(id);
    }

    [HttpPost]
    public IActionResult Create([FromBody] Option quote)
    {
        return _service.Create(quote) ? Ok() : BadRequest();
    }

    [HttpPut]
    public IActionResult Edit([FromBody] Option quote)
    {
        return _service.Edit(quote) ? Ok() : BadRequest();
    }

    [HttpDelete]
    [Route("{id}")]
    public IActionResult Delete(int id)
    {
        return _service.Delete(id) ? Ok() : BadRequest();
    }

    [HttpGet]
    [Route("seed")]
    public IActionResult Seed()
    {
        return _service.Seed() ? Ok() : StatusCode(500);
    }
}