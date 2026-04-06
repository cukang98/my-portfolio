export type ProjectSize = "featured" | "medium" | "small";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  url?: string;
  repo?: string;
  images?: string[];
  size: ProjectSize;
  year: number;
}

export const projects: Project[] = [
  {
    id: "project-one",
    title: "Design System",
    description: "A token-driven component library used across 4 product teams.",
    tags: ["React", "TypeScript", "Storybook", "Less"],
    url: "https://example.com",
    repo: "https://github.com/yourusername/project-one",
    size: "featured",
    year: 2024,
  },
  {
    id: "project-two",
    title: "Analytics Dashboard",
    description: "Real-time data visualization platform with custom charting layer.",
    tags: ["Next.js", "D3.js", "WebSockets"],
    url: "https://example.com",
    size: "medium",
    year: 2024,
  },
  {
    id: "project-three",
    title: "E-Commerce Storefront",
    description: "Performance-first storefront with sub-second LCP on mobile.",
    tags: ["Next.js", "TypeScript", "Shopify"],
    url: "https://example.com",
    size: "medium",
    year: 2023,
  },
  {
    id: "project-four",
    title: "Motion Toolkit",
    description: "Open-source Framer Motion presets and composable animation hooks.",
    tags: ["Framer Motion", "React", "npm"],
    repo: "https://github.com/yourusername/motion-toolkit",
    size: "small",
    year: 2023,
  },
  {
    id: "project-five",
    title: "Dev Blog",
    description: "Minimal writing platform built for speed and reading comfort.",
    tags: ["Next.js", "MDX", "Vercel"],
    url: "https://example.com",
    size: "small",
    year: 2023,
  },
];
