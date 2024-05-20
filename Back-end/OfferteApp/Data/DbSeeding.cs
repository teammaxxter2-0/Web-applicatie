// using OfferteApp.Models;
// using OfferteApp.Data;
// using Microsoft.EntityFrameworkCore.Storage;

// namespace Backend.Data;
// public static class DBSeeding
// {
//     private static DatabaseContext db;
//     public static void Seed()
//     {
//         Account acc1 = new() { Username = "test@gmail.com", Password = "test123", PhoneNumber = "06123456789" };
//         List<Account> accounts = new() { acc1 };

//         foreach (Account acc in accounts)
//         {
//             db.Add(acc);
//         }
//         db.SaveChanges();
//     }

// }