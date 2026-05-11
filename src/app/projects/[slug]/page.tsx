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
        Double precioBase = obtenerPrecioBase(producto);
        if (cantidad >= 100) {
            return precioBase * 0.9;
        } else if (cantidad >= 50) {
            return precioBase * 0.95;
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
        var orders = new List<Order> { /* ... */ };
        var customers = new List<Customer> { /* ... */ };

        // 1. Agrupación múltiple y agregados
        var salesByProductAndCity = from o in orders
                                    join c in customers on o.CustomerId equals c.Id
                                    group new { o, c } by new { o.Product, c.City } into g
                                    select new {
                                        Product = g.Key.Product,
                                        City = g.Key.City,
                                        TotalQuantity = g.Sum(x => x.o.Quantity),
                                        TotalRevenue = g.Sum(x => x.o.Quantity * x.o.Price),
                                        OrderCount = g.Count()
                                    };

        // 2. Clientes frecuentes con filtrado avanzado
        var frequentCustomers = (from o in orders
                                 where o.OrderDate >= DateTime.Now.AddDays(-2)
                                 group o by o.CustomerId into g
                                 where g.Sum(o => o.Quantity) > 4
                                 join c in customers on g.Key equals c.Id
                                 select new { c.Name, c.City, TotalUnits = g.Sum(o => o.Quantity) })
                                .ToList();

        // 3. Uso de let para cálculos intermedios
        var orderSummary = from o in orders
                           let total = o.Quantity * o.Price
                           let discount = total > 10 ? total * 0.1m : 0m
                           let final = total - discount
                           orderby final descending
                           select new { o.Id, o.Product, Total = total, Discount = discount, Final = final };
    }
}`,
  '/snippets/react-component.tsx': `// Ejemplo de componente React con TypeScript para el Portafolio Profesional
// Demuestra uso de tipado estricto y patrones de clean architecture

interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  github: string;
  live: string | null;
}

interface ProjectsGridProps {
  projects: Project[];
  onProjectClick?: (slug: string) => void;
}

export default function ProjectsGrid({ projects, onProjectClick }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <article
          key={project.id}
          className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onProjectClick?.(project.slug)}
        >
          <h3 className="text-xl font-bold">{project.name}</h3>
          <p className="text-gray-600 mt-2">{project.description}</p>
          <div className="flex gap-2 mt-4">
            {project.tech.map((t) => (
              <span key={t} className="px-2 py-1 bg-slate-100 rounded text-sm">
                {t}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

export function useProjects() {
  const getProjects = () => { /* ... */ };
  const getProjectBySlug = (slug: string) => { /* ... */ };
  return { getProjects, getProjectBySlug };
}`,
  '/snippets/security-audit.ts': `// Ejemplo de auditoría de seguridad en Next.js - Verificación de headers
// Implementa análisis de respuestas HTTP y detección de patrones inseguros

interface SecurityHeader {
  name: string;
  expectedValue: string;
  required: boolean;
}

const REQUIRED_HEADERS: SecurityHeader[] = [
  { name: 'Strict-Transport-Security', expectedValue: 'max-age=31536000; includeSubDomains', required: true },
  { name: 'Content-Security-Policy', expectedValue: "default-src 'self'", required: true },
  { name: 'X-Content-Type-Options', expectedValue: 'nosniff', required: true },
  { name: 'X-Frame-Options', expectedValue: 'DENY', required: true },
];

export function auditSecurityHeaders(url: string): Promise<AuditResult[]> {
  return fetch(url)
    .then(response => {
      return REQUIRED_HEADERS.map(header => {
        const value = response.headers.get(header.name);
        if (!value) return { header: header.name, status: 'missing' };
        const pass = header.required ? value.includes(header.expectedValue) : value.length > 0;
        return { header: header.name, status: pass ? 'pass' : 'fail', currentValue: value };
      });
    });
}

export function detectXSS(input: string): boolean {
  const xssPatterns = [/<script/i, /javascript:/i, /on\\w+\\s*=/i, /expression\s*\(/i];
  return xssPatterns.some(pattern => pattern.test(input));
}

export function detectSQLInjection(input: string): boolean {
  const sqlPatterns = [/(\b|\W)(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\\b/i, /'/, /--/, /\\/\\*|\\*\\//];
  return sqlPatterns.some(pattern => pattern.test(input));
}`,
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

        {/* Code Snippets */}
        {project.snippetPaths && project.snippetPaths.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Code Snippets</h2>
            <div className="space-y-6">
              {project.snippetPaths.map((path, index) => {
                const content = snippetContents[path];
                
                if (!content) {
                  return (
                    <div key={index} className="border rounded-lg p-4 bg-slate-900/50 text-slate-400">
                      Snippet no disponible: {path.split('/').pop()}
                    </div>
                  );
                }

                return (
                  <div key={index} className="border rounded-lg overflow-hidden shadow">
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b">
                      <span className="text-xs font-medium text-slate-400">
                        {path.split('/').pop()}
                      </span>
                      <button
                        onClick={(event) => {
                          navigator.clipboard?.writeText(content).then(() => {
                            const btn = event.currentTarget;
                            btn.textContent = 'Copied!';
                            setTimeout(() => btn.textContent = 'Copy', 1500);
                          });
                        }}
                        className="px-2 py-1 bg-slate-600 hover:bg-slate-500 text-xs rounded transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                    <pre className="overflow-auto whitespace-pre-wrap text-sm p-4 bg-slate-900">
                      {content}
                    </pre>
                  </div>
                );
              })}
            </div>
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
            <p className="text-gray-700 text-lg leading-relaxed">{project.challenge}</p>
          </div>
        )}
        {project.solution && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Solution (Solución)</h2>
            <p className="text-gray-700 text-lg leading-relaxed">{project.solution}</p>
          </div>
        )}
        {project.architecture && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Architecture (Arquitectura)</h2>
            <p className="text-gray-700 text-lg leading-relaxed">{project.architecture}</p>
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