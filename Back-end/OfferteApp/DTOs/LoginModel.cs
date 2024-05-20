namespace OfferteApp.Models;
public class LoginModel
{
    public int AccountId { get; set; }
    public string Username { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string Token { get; set; } = null!;

}