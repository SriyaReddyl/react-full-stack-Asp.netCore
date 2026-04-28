using System;

namespace Backend.Entities
{
    public class CartItem
    {
        public int Id { get; set; }

        public int UserId { get; set; }   // 🔐 link to user

        public int ProductId { get; set; }

        public string Name { get; set; }

        public string Image { get; set; }

        public decimal Price { get; set; }

        public int Quantity { get; set; }
    }
}