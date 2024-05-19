namespace OfferteApp.Models;

public class Item
{
    public int Id { get; set; }
    public string Description { get; set; }
    public int Quantity { get; set; }
    public decimal PricePerUnit { get; set; }
    public bool IsMandatory { get; set; }
    public string Remarks { get; set; }

    public decimal TotalPrice => Quantity * PricePerUnit;
}