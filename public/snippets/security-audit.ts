// Ejemplo de la arquitectura de checkers en NestJS - HeaderChecker interface + ScoreCalculator
// Patron de diseno: Strategy con 15 implementaciones de HeaderChecker

// --- Common Module: Interfaces compartidas ---

export type HeaderSeverity = 'critical' | 'high' | 'medium' | 'low';

export interface HeaderResult {
  header: string;
  present: boolean;
  value: string | null;
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

// --- Analyzer Module: Score Calculator ---

export class ScoreCalculator {
  private readonly MAX_POSSIBLE_SCORE = 165;
  // critical=25, high=15, medium=10, low=5 = 165 total

  calculate(headers: HeaderResult[]): { score: number; grade: string } {
    const totalWeightedScore = headers.reduce(
      (sum, h) => sum + h.weight * h.grade,
      0,
    );
    const score = Math.round((totalWeightedScore / this.MAX_POSSIBLE_SCORE) * 100);
    const grade = score >= 90 ? 'A' : score >= 80 ? 'B'
                : score >= 70 ? 'C' : score >= 60 ? 'D'
                : score >= 50 ? 'E' : 'F';
    return { score, grade };
  }
}

// --- Analyzer Module: CSP Checker ---

export class CspChecker implements HeaderChecker {
  readonly name = 'CSP';
  readonly severity: HeaderSeverity = 'critical';
  readonly weight = 25;

  analyze(value: string | undefined): HeaderResult {
    if (!value) {
      return {
        header: 'Content-Security-Policy',
        present: false,
        value: null,
        expected: 'Restrictive policy without unsafe-inline or unsafe-eval',
        grade: 0,
        severity: this.severity,
        weight: this.weight,
        finding: 'Content-Security-Policy header is missing — site is vulnerable to XSS',
        recommendation: "Implement a strict CSP: default-src 'self'; script-src 'self'; object-src 'none'",
      };
    }

    const hasUnsafeInline = /'unsafe-inline'/.test(value);
    const hasUnsafeEval = /'unsafe-eval'/.test(value);
    const hasDefaultSrc = /\bdefault-src\s/.test(value);
    const hasScriptSrc = /\bscript-src\s/.test(value);
    const hasObjectSrc = /\bobject-src\s/.test(value);

    let grade = 0.3;
    if (hasDefaultSrc) grade = 0.5;
    if (hasScriptSrc) grade = 0.7;
    if (hasDefaultSrc && (hasScriptSrc || hasObjectSrc)) grade = 0.8;
    if (hasUnsafeInline) grade = Math.min(grade, 0.4);
    if (hasUnsafeEval) grade = Math.min(grade, 0.4);
    if (!hasUnsafeInline && !hasUnsafeEval && hasDefaultSrc && hasScriptSrc && hasObjectSrc) grade = 1.0;

    return {
      header: 'Content-Security-Policy',
      present: true,
      value,
      expected: 'Restrictive policy without unsafe-inline or unsafe-eval',
      grade,
      severity: this.severity,
      weight: this.weight,
      finding: hasUnsafeInline
        ? 'CSP is present but contains unsafe-inline'
        : 'CSP is present',
      recommendation: hasUnsafeInline
        ? 'Remove unsafe directives. Use nonces or hashes for inline scripts.'
        : 'Review CSP policy and consider adding reporting via report-uri or report-to.',
    };
  }
}