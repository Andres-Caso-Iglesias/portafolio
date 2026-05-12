import { projects } from '@/data/projectsData';

// Map of snippet paths to their actual content for display
const snippetContents: Record<string, string> = {
  '/snippets/nestjs-dto-validation.ts': `// DTOs con class-validator - NestJS 11 + Passport JWT
// Validacion estricta con decoradores en la capa de entrada

import { IsEmail, IsString, IsNotEmpty, MinLength, IsEnum, IsOptional } from 'class-validator';

export enum UserRole {
  ASPIRANTE = 'aspirante',
  EMPRESA = 'empresa',
}

export class RegisterDto {
  @IsNotEmpty() @IsEmail() email: string;
  @IsNotEmpty() @IsString() @MinLength(6) password: string;
  @IsNotEmpty() @IsEnum(UserRole) role: UserRole;
  @IsOptional() @IsString() companyName?: string;
}

export class LoginDto {
  @IsNotEmpty() @IsEmail() email: string;
  @IsNotEmpty() @IsString() password: string;
}`,
  '/snippets/typeorm-entities.ts': `// Entidades TypeORM - User + CompanyProfile + JobOffer
// Patron: 1:1 inheritance + 1:N relations

export enum UserRole { ASPIRANTE = 'aspirante', EMPRESA = 'empresa' }

@Entity('users')
export class User {
  @PrimaryGeneratedColumn() id: number;
  @Column({ length: 100, unique: true }) email: string;
  @Column({ length: 255 }) password: string;
  @Column({ type: 'enum', enum: UserRole }) role: UserRole;

  @OneToOne(() => CompanyProfile, (p) => p.user)
  companyProfile: CompanyProfile;
}

@Entity('company_profiles')
export class CompanyProfile {
  @PrimaryGeneratedColumn() id: number;
  @Column({ length: 255 }) companyName: string;
  @Column({ unique: true }) email: string;
  @Column({ type: 'text', nullable: true }) description: string;

  @OneToOne(() => User, (u) => u.companyProfile, { onDelete: 'CASCADE' })
  @JoinColumn() user: User;

  @OneToMany(() => JobOffer, (o) => o.company)
  offers: JobOffer[];
}

@Entity('job_offers')
export class JobOffer {
  @PrimaryGeneratedColumn() id: number;
  @Column({ length: 255 }) title: string;
  @Column({ type: 'text' }) description: string;
  @ManyToOne(() => CompanyProfile, (c) => c.offers)
  company: CompanyProfile;
}`,
  '/snippets/bancal-entity.java': `// Entidad JPA Bancal - Spring Boot 3.2 + MySQL
// Relaciones: N:1 con Huerto, 1:1 con Semilla

@Entity
@Table(name = "bancales")
@Getter @Setter
public class Bancal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    private String dimensiones;

    @ManyToOne
    @JoinColumn(name = "huerto_id", nullable = false)
    private Huerto huerto;

    @OneToOne
    @JoinColumn(name = "semilla_id")
    private Semilla semilla;
}`,
  '/snippets/java-record-entity.java': `// Entidad JPA con Lombok - FoodTruck entity
// Spring Boot 3.2 + MySQL + @Getter/@Setter

@Entity
@Table(name = "food_trucks")
@Getter @Setter
public class FoodTruck {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(name = "tipo_cocina")
    private String tipoCocina;

    @Column(name = "ubicacion_actual")
    private String ubicacionActual;
}`,
  '/snippets/spring-boot-transactional-service.java': `// Servicio con inyeccion por constructor + @Transactional
// Spring Boot 3.2 - MVC pattern

@Service
public class FoodTruckService {

    private final FoodTruckRepository foodTruckRepository;

    // Constructor injection (mejor que @Autowired)
    public FoodTruckService(FoodTruckRepository foodTruckRepository) {
        this.foodTruckRepository = foodTruckRepository;
    }

    @Transactional
    public FoodTruckDTO crearFoodTruck(FoodTruckDTO dto) {
        FoodTruck entity = new FoodTruck();
        entity.setNombre(dto.getNombre());
        entity.setTipoCocina(dto.getTipoCocina());
        entity.setUbicacionActual(dto.getUbicacionActual());
        return toDTO(foodTruckRepository.save(entity));
    }

    public List<FoodTruckDTO> obtenerFoodTrucks() {
        return foodTruckRepository.findAll()
                .stream().map(this::toDTO).toList();
    }

    public List<FoodTruckDTO> obtenerFoodTrucksCerca(String ciudad, String calle) {
        return foodTruckRepository.findByUbicacionActualContainingIgnoreCase(ciudad)
                .stream()
                .filter(ft -> calle == null || ft.getUbicacionActual()
                    .toLowerCase().contains(calle.toLowerCase()))
                .map(this::toDTO).toList();
    }

    private FoodTruckDTO toDTO(FoodTruck entity) {
        return new FoodTruckDTO(entity.getId(), entity.getNombre(),
            entity.getTipoCocina(), entity.getUbicacionActual(), 0);
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
  '/snippets/security-audit.ts': `// HeaderChecker interface + CspChecker + ScoreCalculator
// NestJS 11 - Patron Strategy con 15 implementaciones

export type HeaderSeverity = 'critical' | 'high' | 'medium' | 'low';

export interface HeaderResult {
  header: string;
  present: boolean;
  grade: number;
  severity: HeaderSeverity;
  weight: number;
  finding: string;
  recommendation: string;
}

export interface HeaderChecker {
  name: string;
  severity: HeaderSeverity;
  weight: number;
  analyze(value: string | undefined): HeaderResult;
}

// ScoreCalculator: weighted scoring (max 165pts)
export class ScoreCalculator {
  calculate(headers: HeaderResult[]) {
    const total = headers.reduce((s, h) => s + h.weight * h.grade, 0);
    const score = Math.round((total / 165) * 100);
    const grade = score >= 90 ? 'A' : score >= 80 ? 'B'
                : score >= 70 ? 'C' : score >= 60 ? 'D'
                : score >= 50 ? 'E' : 'F';
    return { score, grade };
  }
}

// CspChecker: critical severity, weight 25
export class CspChecker implements HeaderChecker {
  readonly name = 'CSP';
  readonly severity: HeaderSeverity = 'critical';
  readonly weight = 25;

  analyze(value: string | undefined): HeaderResult {
    if (!value) return {
      header: 'Content-Security-Policy', present: false, value: null,
      grade: 0, severity: this.severity, weight: this.weight,
      finding: 'CSP missing — vulnerable to XSS',
      recommendation: "default-src 'self'; script-src 'self'; object-src 'none'",
    };
    const hasUE = /'unsafe-eval'/.test(value);
    const hasUI = /'unsafe-inline'/.test(value);
    let grade = hasUI || hasUE ? 0.4 : /\bdefault-src\s/.test(value) ? 0.8 : 0.3;
    if (/\bdefault-src\s/.test(value) && /\bscript-src\s/.test(value) && /\bobject-src\s/.test(value) && !hasUI && !hasUE) grade = 1.0;
    return { header: 'Content-Security-Policy', present: true, value, grade, severity: this.severity, weight: this.weight, finding: 'CSP present', recommendation: 'Review CSP policy' };
  }
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