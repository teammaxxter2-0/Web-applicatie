using System.Text.Json.Serialization;

namespace OfferteApp.Models;

public class Quotation: NewQuotation
{
    [JsonPropertyName("id")]
    public int Id { get; set; }
    [JsonPropertyName("creation")]
    public DateTime Creation { get; set; }
    [JsonPropertyName("accepted")]
    public bool Accepted { get; set; }
}