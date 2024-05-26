using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using OfferteApp.Data;
using OfferteApp.Models;

namespace OfferteApp.Services;

public class AccountService : ControllerBase
{
    private readonly DatabaseContext _context;
    private readonly IConfiguration _configuration;
    public AccountService(DatabaseContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public ActionResult<ICollection<Account>> GetAllAccounts()
    {
        if (!_context.Accounts.Any())
        {
            return NotFound();
        }
        return _context.Accounts.ToList();
    }

    public ActionResult<Account> GetAccountById(int id)
    {
        if (!_context.Accounts.Any())
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

    public bool AddAccount(CreateUserModel createUser)
    {
        Account acc = new Account()
        {
            Username = createUser.Username,
            Password = HashPassword(createUser.Password),
            PhoneNumber = createUser.PhoneNumber
        };
        _context.Accounts.Add(acc);
        return _context.SaveChanges() > 0;
    }

    public ActionResult Authenticate(LoginDto login)
    {
        var account = _context.Accounts.FirstOrDefault(x => x.Username == login.Username);
        if (account == null || !VerifyHashedPassword(account.Password, login.Password))
        {
            return NotFound("Invalid credentials");
        }
        // Implement authentication logic here
        return Ok(CreateToken(account));
    }


    private string CreateToken(Account account)
    {
        var claims = new ClaimsIdentity(new[]
        {
            new Claim(ClaimTypes.Name, account.Username),
        });

        var t = _configuration["AppSettings:Token"];
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(t));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
        var expiry = DateTime.Now.AddHours(1);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = claims,
            Expires = expiry,
            Issuer = "Blis",
            Audience = "Blis_accounts",
            SigningCredentials = creds,
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenJwt = tokenHandler.CreateToken(tokenDescriptor);
        var token = tokenHandler.WriteToken(tokenJwt);

        return token;
    }

    private static string HashPassword(string password)
    {
        byte[] salt;
        byte[] buffer2;
        if (password == null)
        {
            throw new ArgumentNullException("password");
        }
        using (Rfc2898DeriveBytes bytes = new Rfc2898DeriveBytes(password, 0x10, 0x3e8))
        {
            salt = bytes.Salt;
            buffer2 = bytes.GetBytes(0x20);
        }
        byte[] dst = new byte[0x31];
        Buffer.BlockCopy(salt, 0, dst, 1, 0x10);
        Buffer.BlockCopy(buffer2, 0, dst, 0x11, 0x20);
        return Convert.ToBase64String(dst);
    }

    private static bool VerifyHashedPassword(string hashedPassword, string password)
    {
        byte[] buffer4;
        if (hashedPassword == null)
        {
            return false;
        }
        if (password == null)
        {
            throw new ArgumentNullException("password");
        }
        byte[] src = Convert.FromBase64String(hashedPassword);
        if ((src.Length != 0x31) || (src[0] != 0))
        {
            return false;
        }
        byte[] dst = new byte[0x10];
        Buffer.BlockCopy(src, 1, dst, 0, 0x10);
        byte[] buffer3 = new byte[0x20];
        Buffer.BlockCopy(src, 0x11, buffer3, 0, 0x20);
        using (Rfc2898DeriveBytes bytes = new Rfc2898DeriveBytes(password, dst, 0x3e8))
        {
            buffer4 = bytes.GetBytes(0x20);
        }
        return buffer3.SequenceEqual(buffer4);
    }


    public bool Seed()
    {
        var account = new CreateUserModel()
        {
            Username = "test@gmail.com",
            Password = "test123",
            PhoneNumber = "06123456789"
        };
        AddAccount(account);
        return _context.Accounts.Any(o => o.Username == account.Username);
    }
}