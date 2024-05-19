using OfferteApp.Models;
using OfferteApp.Data;

namespace Backend.Data;
public static class DBSeeding
{

    public static void Seed()
    {
        Account acc1 = new() { Username = "test@gmail.com", Password = "test123", PhoneNumber = "06123456789" };
        List<Account> accounts = new() { acc1 };

        var db = new DatabaseContext();

        foreach (Account acc in accounts)
        {
            db.Add(acc);
        }
        db.SaveChanges();
    }

}