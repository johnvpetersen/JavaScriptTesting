using System;
using System.Collections.Generic;
using System.Linq;
using ProductsAPI.Models;
using System.Web.Http;
using ProductsAPI.Repository;

namespace ProductsAPI.Controllers
{
        public class ProductsController : ApiController
        {
            public IEnumerable<Product> GetProducts()
            {
                return ProductsRepository.data;
            }

            public Product GetProduct(int id)
            {
                return ProductsRepository.get(id);
            }

            [HttpDelete]
            public void ResetProducts()
            {
                ProductsRepository.reset();
            }

            public void DeleteProduct(int id)
            {
                ProductsRepository.delete(id);
            }

            public void PutProduct(Product product)
            {
                ProductsRepository.update(product);
            }

            public Product PostProduct(Product product)
            {
                return ProductsRepository.add(product);
            }
        }

}
