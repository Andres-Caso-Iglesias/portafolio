import { type ChatResponse } from "./types";

// Import all responses
import { experienceResponse } from "./responses/experience";
import { skillsResponse } from "./responses/skills";
import { educationResponse } from "./responses/education";
import { contactResponse } from "./responses/contact";
import { projectsResponse } from "./responses/projects";
import { projectBolsaResponse } from "./responses/project-bolsa";
import { projectFoodbitesResponse } from "./responses/project-foodbites";
import { projectHuertosResponse } from "./responses/project-huertos";
import { projectAuditoriaResponse } from "./responses/project-auditoria";
import { projectPortfolioResponse } from "./responses/project-portfolio";
import { cybersecurityResponse } from "./responses/cybersecurity";
import { certificationsResponse } from "./responses/certifications";
import { languagesResponse } from "./responses/languages";
import { availabilityResponse } from "./responses/availability";
import { salaryResponse } from "./responses/salary";
import { aboutResponse } from "./responses/about";
import { frontendResponse } from "./responses/frontend";
import { backendResponse } from "./responses/backend";
import { devopsResponse } from "./responses/devops";
import { softskillsResponse } from "./responses/softskills";
import { aiResponse } from "./responses/ai";
import { hospitalityResponse } from "./responses/hospitality";
import { ageResponse } from "./responses/age";
import { locationResponse } from "./responses/location";
import { logisticsResponse } from "./responses/logistics";
import { processesResponse } from "./responses/processes";
import { motivationResponse } from "./responses/motivation";
import { weaknessesResponse } from "./responses/weaknesses";
import { strengthsResponse } from "./responses/strengths";
import { personalprojectsResponse } from "./responses/personalprojects";
import { previousemploymentResponse } from "./responses/previousemployment";
import { referencesResponse } from "./responses/references";
import { techspecificResponse } from "./responses/techspecific";
import { frameworksResponse } from "./responses/frameworks";
import { databasesResponse } from "./responses/databases";
import { testingResponse } from "./responses/testing";
import { gitResponse } from "./responses/git";
import { methodologyResponse } from "./responses/methodology";
import { communicationResponse } from "./responses/communication";
import { creatingResponse } from "./responses/creating";
import { learningResponse } from "./responses/learning";
import { collaborationResponse } from "./responses/collaboration";
import { problemsResponse } from "./responses/problems";
import { futureResponse } from "./responses/future";
import { toolsResponse } from "./responses/tools";
import { opensourceResponse } from "./responses/opensource";

// ──────────────────────────────────────────────────────────────
// All Responses in Priority Order
// ──────────────────────────────────────────────────────────────
// CRITICAL: Order matters for matching!
// 1. Project-specific responses (highest priority - most specific)
// 2. General projects list
// 3. Specific category responses (experience, skills, education, etc.)
// 4. Broader category responses (frontend, backend, devops, etc.)
// 5. Personal/other responses

export const allResponses: ChatResponse[] = [
  // ─── PROJECT-SPECIFIC (highest priority - most specific keywords) ───
  projectBolsaResponse,
  projectFoodbitesResponse,
  projectHuertosResponse,
  projectAuditoriaResponse,
  projectPortfolioResponse,

  // ─── GENERAL PROJECTS LIST ───
  projectsResponse,

  // ─── CORE PROFILE CATEGORIES ───
  experienceResponse,
  skillsResponse,
  educationResponse,
  contactResponse,
  availabilityResponse,
  aboutResponse,

  // ─── TECHNICAL CATEGORIES ───
  cybersecurityResponse,
  certificationsResponse,
  languagesResponse,
  salaryResponse,
  frontendResponse,
  backendResponse,
  devopsResponse,
  techspecificResponse,
  frameworksResponse,
  databasesResponse,
  testingResponse,

  // ─── SOFT SKILLS & PROCESS ───
  softskillsResponse,
  processesResponse,
  methodologyResponse,
  communicationResponse,
  collaborationResponse,

  // ─── BACKGROUND & PERSONAL ───
  hospitalityResponse,
  logisticsResponse,
  previousemploymentResponse,
  referencesResponse,
  personalprojectsResponse,
  motivationResponse,
  weaknessesResponse,
  strengthsResponse,

  // ─── TOOLS & PRACTICES ───
  gitResponse,
  aiResponse,
  creatingResponse,
  learningResponse,
  problemsResponse,
  futureResponse,
  toolsResponse,
  opensourceResponse,

  // ─── DEMOGRAPHICS ───
  ageResponse,
  locationResponse,
];

// ──────────────────────────────────────────────────────────────
// Helper: Get responses by category prefix
// ──────────────────────────────────────────────────────────────
export function getProjectResponses(): ChatResponse[] {
  return allResponses.filter((r) => r.id.startsWith("project-"));
}

export function getNonProjectResponses(): ChatResponse[] {
  return allResponses.filter((r) => !r.id.startsWith("project-"));
}