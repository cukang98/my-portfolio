export interface SkillGroup {
  title: string;
  summary: string;
  skills: string[];
  accent: string;
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend Core",
    summary: "The stack I use to build production interfaces.",
    skills: ["React", "Next.js", "TypeScript"],
    accent: "#2563EB",
  },
  {
    title: "UI & Styling",
    summary:
      "Design-system implementation, responsive layout, and polished UI details.",
    skills: ["Figma to UI", "CSS Modules", "Ant Design", "Material UI"],
    accent: "#7C3AED",
  },
  {
    title: "State / Data / API",
    summary: "Product screens that stay clear around real business logic.",
    skills: ["Redux", "API Integration", "Forms", "Tables", "Filters", "Workflow States"],
    accent: "#0891B2",
  },
  {
    title: "Tooling & Workflow",
    summary: "The practical layer around shipping and maintaining frontend work.",
    skills: ["Firebase", "Cloud Functions", "GTM", "GA4", "Schema Markup"],
    accent: "#16A34A",
  },
  {
    title: "Mobile / Cross-platform",
    summary: "Mobile-facing product surfaces and responsive interaction patterns.",
    skills: ["Flutter", "Dart", "Adaptive Layouts"],
    accent: "#EA580C",
  },
  {
    title: "AI-assisted Development",
    summary: "Using AI tools to move faster while keeping ownership of quality.",
    skills: ["Claude Code", "Codex"],
    accent: "#DB2777",
  },
];

