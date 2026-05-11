// Ejemplo de auditoría de seguridad en Next.js - Verificación de headers
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
  { name: 'X-XSS-Protection', expectedValue: '1; mode=block', required: false },
];

interface AuditResult {
  header: string;
  status: string;
  currentValue?: string;
}

// Función para auditar headers de seguridad
export function auditSecurityHeaders(url: string): Promise<AuditResult[]> {
  return fetch(url)
    .then(response => {
      return REQUIRED_HEADERS.map(header => {
        const value = response.headers.get(header.name);
        
        if (!value) {
          return { header: header.name, status: 'missing' };
        }
        
        const pass = header.required 
          ? value.includes(header.expectedValue)
          : value.length > 0;
        
        const resultStatus = pass ? 'pass' : 'fail';
        
        return { 
          header: header.name, 
          status: resultStatus,
          currentValue: value 
        };
      });
    })
    .catch(error => {
      throw new Error(`Audit failed: ${error.message}`);
    });
}

// Función para verificar patrones XSS en inputs
export function detectXSS(input: string): boolean {
  const xssPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /expression\s*\(/i,
  ];
  
  return xssPatterns.some(pattern => pattern.test(input));
}

// Función para detectar inyecciones SQL
export function detectSQLInjection(input: string): boolean {
  const sqlPatterns = [
    /(\b|\W)(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b/i,
    /(\b|\W)(UNION|ORDER BY|GROUP BY)\b/i,
    /'/,
    /--/,
    /\/\*|\*\//,
  ];
  
  return sqlPatterns.some(pattern => pattern.test(input));
}