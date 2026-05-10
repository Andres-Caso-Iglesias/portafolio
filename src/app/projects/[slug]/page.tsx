import { projects } from '@/data/projectsData';

// Map of snippet paths to their actual content for display
const snippetContents: Record<string, string> = {
  '/snippets/nestjs-dto-validation.ts': `import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateJobOfferDto {
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @IsString()
  @Length(5, 100, { message: 'El título debe tener entre 5 y 100 caracteres' })
  title: string;

  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @IsString()
  @Length(20, 2000, { message: 'La descripción debe tener entre 20 y 2000 caracteres' })
  description: string;

  @IsNotEmpty({ message: 'La empresa es obligatoria' })
  @IsString()
  @Length(2, 100, { message: 'El nombre de la empresa debe tener entre 2 y 100 caracteres' })
  company: string;

  @IsEmail({}, { message: 'Debe proporcionar un email válido' })
  contactEmail: string;

  @Matches(/^\\+?[\\d\\s\\-\\(\\)]{10,20}$/, { message: 'Formato de teléfono no válido' })
  contactPhone?: string;

  @IsNotEmpty({ message: 'La ubicación es obligatoria' })
  @IsString()
  location: string;

  @IsString()
  @Length(0, 500, { message: 'Los requisitos no pueden superar los 500 caracteres' })
  requirements?: string;

  @IsString()
  @Length(0, 500, { message: 'Los beneficios no pueden superar los 500 caracteres' })
  benefits?: string;
}

export class UpdateJobOfferDto extends PartialType(CreateJobOfferDto) {
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}`,
  '/snippets/postgres-index-optimization.sql': `-- Índices optimizados para alta concurrencia en tabla de ofertas de empleo
-- Índice compuesto para búsquedas frecuentes por ubicación y estado activo
CREATE INDEX idx_job_offers_location_active ON job_offers (location, is_active) WHERE is_active = true;

-- Índice para búsqueda full-text en título y descripción
CREATE INDEX idx_job_offers_search ON job_offers USING gin(to_tsvector('spanish', title || ' ' || description));

-- Índice para ordenación por fecha de creación (más recientes primero)
CREATE INDEX idx_job_offers_created_at ON job_offers (created_at DESC);

-- Índice para evitar duplicados en empresa + título (dependiendo de requisitos de negocio)
CREATE UNIQUE INDEX idx_job_offers_company_title_unique ON job_offers (company, title) WHERE is_active = true;`,
  '/snippets/java-record-entity.java': `import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "pedidos")
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public record Pedido(
        @Id
        Long id,
        String producto,
        int cantidad,
        Double precioTotal,
        String estado,
        String clienteId
) {
    // Records are immutable by default, which ensures thread-safety and prevents accidental state changes
    // Additional business logic can be added in companion objects or service layer
}`,
  '/snippets/spring-boot-transactional-service.java': `import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Transactional
    public Pedido crearPedido(Pedido pedido) {
        // Validaciones de negocio antes de persistir
        validarProducto(pedido.getProducto());
        validarCantidad(pedido.getCantidad());
        
        // Lógica de negocio: calcular precio total basado en descuentos por volumen
        Double precioConDescuento = calcularPrecioConDescuento(
            pedido.getProducto(), 
            pedido.getCantidad()
        );
        
        // Crear entidad inmutable con el precio calculado
        Pedido pedidoConPrecio = new Pedido(
            null, 
            pedido.getProducto(), 
            pedido.getCantidad(), 
            precioConDescuento,
            "PENDIENTE",
            pedido.getClienteId()
        );
        
        return pedidoRepository.save(pedidoConPrecio);
    }

    @Transactional(readOnly = true)
    public Pedido obtenerPedidoPorId(Long id) {
        return pedidoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido no encontrado"));
    }

    private void validarProducto(String producto) {
        if (producto == null || producto.trim().isEmpty()) {
            throw new IllegalArgumentException("El producto no puede estar vacío");
        }
        // Otras validaciones de producto...
    }

    private void validarCantidad(int cantidad) {
        if (cantidad <= 0) {
            throw new IllegalArgumentException("La cantidad debe ser mayor que cero");
        }
        if (cantidad > 1000) {
            throw new IllegalArgumentException("Cantidad excede el límite permitido por pedido");
        }
    }

    private Double calcularPrecioConDescuento(String producto, int cantidad) {
        // Lógica de descuentos por volumen
        Double precioBase = obtenerPrecioBase(producto);
        if (cantidad >= 100) {
            return precioBase * 0.9; // 10% de descuento
        } else if (cantidad >= 50) {
            return precioBase * 0.95; // 5% de descuento
        }
        return precioBase;
    }
}`,
  '/snippets/linq-csharp.cs': `using System;
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

        Console.WriteLine("\\nClientes frecuentes (últimos 2 días, >4 unidades):");
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

        Console.WriteLine("\\nResumen de pedidos ordenado por monto final (desc):");
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
}`
};

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find(p => p.slug === params.slug);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-12">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Project Not Found</h1>
        <p className="text-center">The project with slug '{params.slug}' does not exist.</p>
        <a href="/" className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Go to Home
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{project.name}</h1>
        <p className="mt-2 text-gray-600">{project.description}</p>
      </div>

      {/* Technical Visualization Section */}
      <section className="space-y-8">
        {/* ERD Diagram */}
        {project.erdPath && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Entity Relationship Diagram (ERD)</h2>
            <div className="border rounded-lg overflow-hidden shadow">
              <img src={project.erdPath} alt={`${project.name} ERD`} className="w-full h-auto" />
            </div>
          </div>
        )}

        {/* API Documentation */}
        {project.apiDocPath && (
          <div>
            <h2 className="text-xl font-semibold mb-4">API Documentation</h2>
            <div className="border rounded-lg overflow-hidden shadow">
              {/* For simplicity, we'll show a link or embedded preview if JSON */}
              <a href={project.apiDocPath} target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 hover:bg-gray-100">
                View API Spec ({project.apiDocPath.split('/').pop()})
              </a>
            </div>
          </div>
        )}

        {/* Code Snippets - Final Working Version */}
      {project.snippetPaths && project.snippetPaths.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Code Snippets</h2>
          <div className="space-y-6">
            {project.snippetPaths.map((path, index) => {
              const content = snippetContents[path];
              
              // Si no encontramos contenido, mostrar un mensaje claro pero no romper el layout
              if (!content) {
                return (
                  <div key={index} className="border rounded-lg overflow-hidden shadow p-4 bg-slate-900/50">
                    <div className="text-slate-400 text-center py-4">
                      <div className="font-medium mb-2">{path.split('/').pop()}</div>
                      <div className="text-sm">
                        Content not loaded. Check console for details.
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={index} className="border rounded-lg overflow-hidden shadow p-4">
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-medium text-slate-400 text-xs">
                      {path.split('/').pop()}
                    </span>
                    <button
                      onClick={() => {
                        if (navigator.clipboard && navigator.clipboard.writeText) {
                          navigator.clipboard.writeText(content).then(() => {
                            // Visual feedback
                            const btn = event.currentTarget;
                            const original = btn.innerHTML;
                            btn.innerHTML = 'Copied!';
                            setTimeout(() => btn.innerHTML = original, 1500);
                          }).catch(err => {
                            console.error('Copy failed:', err);
                            // No alert to avoid UX disruption
                          });
                        }
                      }}
                      className="px-2 py-1 bg-slate-600 hover:bg-slate-500 text-xs rounded transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <pre className="overflow-auto whitespace-pre-wrap text-sm bg-slate-800/50 p-3 rounded">
                    {content}
                  </pre>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-slate-400 text-center py-8">
          {project && project.snippetPaths !== undefined ? 
            (project.snippetPaths.length === 0 ? 
              'Este proyecto no tiene snippets de código configurados.' : 
              'Estado inesperado de snippets') : 
            'Cargando datos del proyecto...'}
        </div>
      )}

        {/* Docker Info */}
        {project.dockerCompose && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Docker Configuration</h2>
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="font-semibold mb-2">This project includes Docker Compose configuration:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>MySQL service for FoodBites and Urban Garden Manager</li>
                <li>PostgreSQL service for Bolsa de Empleo</li>
                <li>Backend services (Java Spring Boot, NestJS)</li>
              </ul>
              <p className="mt-2 text-sm text-gray-600">
                See <code className="bg-gray-200 px-1 rounded">docker-compose.yml</code> in the repository root for full details.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Challenge/Solution/Architecture (existing) */}
      <section className="mt-12 space-y-6">
        {project.challenge && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Challenge (Reto)</h2>
            <p className="text-gray-700">{project.challenge}</p>
          </div>
        )}
        {project.solution && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Solution (Solución)</h2>
            <p className="text-gray-700">{project.solution}</p>
          </div>
        )}
        {project.architecture && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Architecture (Arquitectura)</h2>
            <p className="text-gray-700">{project.architecture}</p>
          </div>
        )}
      </section>

      {/* Links */}
      <div className="mt-12 flex gap-4">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
            GitHub Repository
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}