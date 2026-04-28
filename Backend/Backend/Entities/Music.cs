using System;
namespace Backend.Entities
{
    public class Music:IEntity
    {

    public int Id { get; set; }
    public string Name { get; set; }
    public string Image { get; set; }
    public decimal Price { get; set; }
	
    }
}
