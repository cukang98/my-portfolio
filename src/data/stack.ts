export interface StackItem {
  name: string;
  category: "Core" | "Frontend" | "Product";
  icon: string; // simple icons CDN slug
  color: string; // brand color for hover glow
}

export const stack: StackItem[] = [
  // Core
  { name: "React",      category: "Core", icon: "react",      color: "#61DAFB" },
  { name: "Next.js",    category: "Core", icon: "nextdotjs",  color: "#111111" },
  { name: "TypeScript", category: "Core", icon: "typescript", color: "#3178C6" },
  { name: "JavaScript", category: "Core", icon: "javascript", color: "#F7DF1E" },
  { name: "HTML5",      category: "Core", icon: "html5",      color: "#E34F26" },
  { name: "CSS3",       category: "Core", icon: "css",        color: "#1572B6" },

  // Frontend
  { name: "App Router",        category: "Frontend", icon: "nextdotjs",       color: "#111111" },
  { name: "Pages Router",      category: "Frontend", icon: "nextdotjs",       color: "#444444" },
  { name: "SSR / SSG / ISR",   category: "Frontend", icon: "vercel",          color: "#111111" },
  { name: "CSS Modules",       category: "Frontend", icon: "cssmodules",      color: "#000000" },
  { name: "styled-components", category: "Frontend", icon: "styledcomponents", color: "#DB7093" },
  { name: "Material UI",       category: "Frontend", icon: "mui",             color: "#007FFF" },
  { name: "Ant Design",        category: "Frontend", icon: "antdesign",       color: "#0170FE" },
  { name: "Flutter",           category: "Frontend", icon: "flutter",         color: "#02569B" },

  // Product
  { name: "Firebase",           category: "Product", icon: "firebase",           color: "#FFCA28" },
  { name: "Cloud Functions",    category: "Product", icon: "firebase",           color: "#F57C00" },
  { name: "Google Tag Manager", category: "Product", icon: "googletagmanager",   color: "#246FDB" },
  { name: "GA4",                category: "Product", icon: "googleanalytics",    color: "#E37400" },
  { name: "Schema Markup",      category: "Product", icon: "schemaorg",          color: "#5B6CFF" },
  { name: "Figma",              category: "Product", icon: "figma",              color: "#F24E1E" },
  { name: "Git",                category: "Product", icon: "git",                color: "#F05032" },
];
