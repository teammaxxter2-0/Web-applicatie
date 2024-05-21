namespace OfferteApp.Models;
public class CreateUserModel
{
    public string Username { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string PhoneNumber { get; set; } = null!;
}