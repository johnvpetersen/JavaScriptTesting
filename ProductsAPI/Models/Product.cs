using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProductsAPI.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Rating { get; set; }
    }
}