using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Backend.Entities;      // for CartItem
using Backend.DataAccess;   // for DataContext

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly DataContext _context;

    public CartController(DataContext context)
    {
        _context = context;
    }

    // 👉 GET cart by user
    [HttpGet("{userId}")]
    public IActionResult GetCart(int userId)
    {
        var cart = _context.CartItems.Where(c => c.UserId == userId).ToList();
        return Ok(cart);
    }

    // 👉 ADD to cart
    [HttpPost]
    public IActionResult AddToCart(CartItem item)
    {
        var existing = _context.CartItems
            .FirstOrDefault(c => c.UserId == item.UserId && c.ProductId == item.ProductId);

        if (existing != null)
        {
            existing.Quantity += 1;
        }
        else
        {
            item.Quantity = 1;
            _context.CartItems.Add(item);
        }

        _context.SaveChanges();
        return Ok();
    }

    // 👉 REMOVE / decrease
    [HttpDelete("{id}")]
    public IActionResult Remove(int id)
    {
        var item = _context.CartItems.Find(id);

        if (item == null) return NotFound();

        if (item.Quantity > 1)
            item.Quantity--;
        else
            _context.CartItems.Remove(item);

        _context.SaveChanges();
        return Ok();
    }
}