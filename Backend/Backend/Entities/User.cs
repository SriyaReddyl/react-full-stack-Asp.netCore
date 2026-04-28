using System;

namespace Backend.Entities
{
    public class User : IEntity   // 🔥 ADD THIS
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        public string UserRole { get; set; }  // Admin / User

        public DateTime CreatedDate { get; set; }
    }
}