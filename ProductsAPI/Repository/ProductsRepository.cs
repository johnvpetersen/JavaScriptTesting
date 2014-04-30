using ProductsAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProductsAPI.Repository
{
    public class ProductsRepository
    {
        private static IEnumerable<Product> _data;

        public static void reset()
        {
            _data = null;
            var x = data;
        }

        public static void delete(int id)
        {
            Product fetchedProduct;

            if (id == 0)
            {
                throw new
                Exception("The id passed must be non-zero.");
            }

            try
            {
                fetchedProduct = get(id);
                var data = ProductsRepository.data.ToList();
                data.Remove(fetchedProduct);
                ProductsRepository.data = data;
            }
            catch (Exception)
            {
                throw new
                Exception(@"The product you are attempting to delete does not exist");
            }
        }

        public static IEnumerable<Product> get()
        {
            return _data;
        }

        public static Product get(string name)
        {
            var product = _data.FirstOrDefault(x => x.Name == name);

            if (product != null)
            {
                return product;
            }
            else
            {
                throw new Exception();
            }
        }

        public static Product get(int id)
        {
            var product = _data.FirstOrDefault(x => x.Id == id);
            if (product != null)
            {
                return product;
            }
            else
            {
                throw new Exception();
            }
        }

        public static IEnumerable<Product> data
        {
            get
            {
                if (_data == null)
                {
                    _data = new List<Product>
                    {
                        new Product() { Id = 1, Name = "Gizmo 1", Price = 1.99M, Rating = 1 },
                        new Product() { Id = 2, Name = "Gizmo 2", Price = 2.99M, Rating = 2 },
                        new Product() { Id = 3, Name = "Gizmo 3", Price = 3.99M, Rating = 3 }
                    };
                }

                return _data;
            }
            set
            {
                _data = value;
            }
        }

        public static Product add(Product product)
        {
            var existingProduct = false;
            Product fetchedProduct;

            if (product.Id != 0)
            {
                throw new
                Exception(@"Posted products cannot contain an id");
            }

            try
            {
                fetchedProduct = get(product.Name);
                existingProduct = true;
            }
            catch (Exception)
            {
                //this is actually good that we are here. Means we didn't 
                //find an existing product so it is OK to insert;
                product.Id = ProductsRepository.data.Select(x => x.Id).Max() + 1;

                var data = ProductsRepository.data.ToList();
                data.Add(product);
                ProductsRepository.data = data;
            }

            if (existingProduct)
            {
                throw new
                Exception(@"The product name you are attempting to insert already exists.");
            }

            return product;
        }

        public static void update(Product product)
        {
            try
            {
                Product existingProduct = get(product.Id);
                existingProduct.Name = product.Name;
                existingProduct.Price = product.Price;
                existingProduct.Rating = product.Rating;
            }
            catch (Exception)
            {
                throw new
                Exception(@"The product name you are attempting to put does not exist.");
            }
        }
    }
}