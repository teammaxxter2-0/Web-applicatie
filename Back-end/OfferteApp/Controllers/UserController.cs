using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using OfferteApp.Data;
using OfferteApp.Models;
using OfferteApp.Services;


namespace Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AccountService _userService;

        public UserController(DatabaseContext context, IConfiguration configuration)
        {
            _userService = new(context, configuration);
        }

        
        [Authorize]
        [HttpGet]
        public ActionResult<ICollection<Account>> GetAll()
        {
            return _userService.GetAllAccounts();
        }

        [Authorize]
        [HttpGet("{id}")]
        public ActionResult<Account> GetById(int id)
        {
            return _userService.GetAccountById(id);
        }

        [Authorize]
        [HttpPost]
        public ActionResult AddAccount(CreateUserModel newAccount)
        {
            return _userService.AddAccount(newAccount) ? Ok() : BadRequest();
        }

        [HttpPost("login")]
        public ActionResult Login(LoginDto request)
        {
            return _userService.Authenticate(request);
        }
        
        [Authorize]
        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete(int id)
        {
            return _userService.Delete(id) ? Ok() : BadRequest();
        }

        [Authorize]
        [HttpPut]
        public IActionResult Edit([FromBody] Account acc)
        {
            return _userService.Edit(acc) ? Ok() : BadRequest();
        }
        
        [HttpGet]
        [Route("seed")]
        public ActionResult Seed()
        {
            return _userService.Seed() ? Ok() : StatusCode(500);
        }
    }
}