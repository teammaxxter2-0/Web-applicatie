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

    public async Task<ActionResult<IEnumerable<Account>>> GetAllAccounts()
    {
        if (_context.Accounts == null)
        {
            return NotFound();
        }
        return await _context.Accounts.ToListAsync();
    }


    public async Task<ActionResult<Account>> GetAccountById(int id)
    {
        if (_context.Accounts == null)
        {
            return NotFound();
        }
        var account = await _context.Accounts.FindAsync(id);
        if (account == null)
        {
            return NotFound();
        }
        return account;
    }

    public async Task<ActionResult<Account>> AddAccount(Account account)
    {
        if (_context.Accounts == null)
        {
            return Problem("Entity set 'DataContext.Accounts'  is null.");
        }
        _context.Accounts.Add(account);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAccountById), new { id = account.AccountId }, account);
    }

    public async Task<Account> Authenticate(string username, string password)
    {
        // Implement authentication logic here
        // Example:
        var account = await _context.Accounts.FirstOrDefaultAsync(x => x.Username == username && x.Password == password);
        return account;
    }
}