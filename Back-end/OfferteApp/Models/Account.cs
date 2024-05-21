namespace OfferteApp.Models;

public class Account
{
    public int AccountId { get; set; }
    public string Username { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string PhoneNumber { get; set; }
}