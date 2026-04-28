using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Backend.DataAccess;
using Backend.Entities;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private readonly DataContext _context;

    public OrderController(DataContext context)
    {
        _context = context;
    }

    [HttpPost]
    public IActionResult CreateOrder([FromBody] Order order)
    {
        order.CreatedAt = DateTime.UtcNow;

        _context.Orders.Add(order);

        // 🔥 clear cart after order
        var cartItems = _context.CartItems
            .Where(c => c.UserId == order.UserId);

        _context.CartItems.RemoveRange(cartItems);

        _context.SaveChanges();

        return Ok(order);
    }
}