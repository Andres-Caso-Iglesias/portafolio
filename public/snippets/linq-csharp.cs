using System;
using System.Collections.Generic;
using System.Linq;

// Ejemplo de consultas LINQ avanzadas para demostrar maestría en C#
public class LinqAdvancedExamples
{
    public void RunExamples()
    {
        // Datos de ejemplo: pedidos de un sistema de foodtrucks
        var orders = new List<Order>
        {
            new Order { Id = 1, Product = "Taco", Quantity = 3, Price = 2.5m, CustomerId = 101, OrderDate = DateTime.Now.AddDays(-2) },
            new Order { Id = 2, Product = "Burrito", Quantity = 1, Price = 5.0m, CustomerId = 102, OrderDate = DateTime.Now.AddDays(-1) },
            new Order { Id = 3, Product = "Taco", Quantity = 2, Price = 2.5m, CustomerId = 101, OrderDate = DateTime.Now.AddDays(-1) },
            new Order { Id = 4, Product = "Agua", Quantity = 5, Price = 1.0m, CustomerId = 103, OrderDate = DateTime.Now.AddDays(-3) },
            new Order { Id = 5, Product = "Burrito", Quantity = 2, Price = 5.0m, CustomerId = 101, OrderDate = DateTime.Now.AddDays(-2) },
        };

        var customers = new List<Customer>
        {
            new Customer { Id = 101, Name = "Ana", City = "Madrid" },
            new Customer { Id = 102, Name = "Luis", City = "Barcelona" },
            new Customer { Id = 103, Name = "María", City = "Madrid" },
        };

        // 1. Agrupación múltiple y agregados: ventas totales por producto y ciudad
        var salesByProductAndCity = from o in orders
                                    join c in customers on o.CustomerId equals c.Id
                                    group new { o, c } by new { o.Product, c.City } into g
                                    select new
                                    {
                                        Product = g.Key.Product,
                                        City = g.Key.City,
                                        TotalQuantity = g.Sum(x => x.o.Quantity),
                                        TotalRevenue = g.Sum(x => x.o.Quantity * x.o.Price),
                                        OrderCount = g.Count()
                                    };

        foreach (var item in salesByProductAndCity)
        {
            Console.WriteLine($"{item.Product} en {item.City}: {item.TotalQuantity} unidades, {item.TotalRevenue:C} revenue, {item.OrderCount} pedidos");
        }

        // 2. Consultas con operaciones de conjunto y filtrado avanzado
        // Clientes que han hecho pedidos en los últimos 2 días y han comprado más de 4 unidades en total
        var frequentCustomers = (from o in orders
                                 where o.OrderDate >= DateTime.Now.AddDays(-2)
                                 group o by o.CustomerId into g
                                 where g.Sum(o => o.Quantity) > 4
                                 join c in customers on g.Key equals c.Id
                                 select new { c.Name, c.City, TotalUnits = g.Sum(o => o.Quantity) })
                                .ToList();

        Console.WriteLine("\nClientes frecuentes (últimos 2 días, >4 unidades):");
        foreach var c in frequentCustomers
        {
            Console.WriteLine($"{c.Name} ({c.City}): {c.TotalUnits} unidades");
        }

        // 3. Uso de let para cálculos intermedios y anidados
        var orderSummary = from o in orders
                           let total = o.Quantity * o.Price
                           let discount = total > 10 ? total * 0.1m : 0m
                           let final = total - discount
                           orderby final descending
                           select new
                           {
                               o.Id,
                               o.Product,
                               o.Quantity,
                               o.Price,
                               Total = total,
                               Discount = discount,
                               Final = final
                           };

        Console.WriteLine("\nResumen de pedidos ordenado por monto final (desc):");
        foreach var o in orderSummary.Take(3)
        {
            Console.WriteLine($"Pedido {o.Id}: {o.Product} x{o.Quantity} = {o.Total:C} - Descuento: {o.Discount:C} = Final: {o.Final:C}");
        }
    }
}

public class Order
{
    public int Id { get; set; }
    public string Product { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
    public int CustomerId { get; set; }
    public DateTime OrderDate { get; set; }
}

public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string City { get; set; }
}