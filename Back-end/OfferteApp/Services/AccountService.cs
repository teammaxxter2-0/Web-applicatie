using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OfferteApp.Data;
using OfferteApp.Models;

namespace OfferteApp.Services;

public class AccountService : ControllerBase
{
    private readonly DatabaseContext _context;
    public AccountService(DatabaseContext context)
    {
        _context = context;
    }

    public ActionResult<IEnumerable<Account>> GetAllAccounts()
    {
        if (_context.Accounts == null)
        {
            return NotFound();
        }
        return _context.Accounts.ToList();
    }

    public ActionResult<Account> GetAccountById(int id)
    {
        if (_context.Accounts == null)
        {
            return NotFound();
        }
        var account = _context.Accounts.Find(id);
        if (account == null)
        {
            return NotFound();
        }
        return account;
    }

    public ActionResult<Account> AddAccount(Account account)
    {
        if (_context.Accounts == null)
        {
            return Problem("Entity set 'DataContext.Accounts' is null.");
        }
        _context.Accounts.Add(account);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetAccountById), new { id = account.AccountId }, account);
    }

    public Account Authenticate(string username, string password)
    {
        // Implement authentication logic here
        var account = _context.Accounts.FirstOrDefault(x => x.Username == username && x.Password == password);
        return account;
    }

    public bool Seed()
    {
        var list = new List<Account>
        {
            new Account()
            {
                Username= "test@gmail.com",
                Password="test123",
                PhoneNumber="06123456789"
            }
        };
        foreach (var item in list)
        {
            if (_context.Accounts.Any(o => o.Username == item.Username))
            {
                _context.Accounts.Update(item);
            }
            else
            {
                _context.Accounts.Add(item);
            }
        }

        _context.SaveChanges();
        foreach (var item in list)
        {
            if (!_context.Accounts.Any(o => o.Username == item.Username))
                return false;
        }
        return true;
    }
}