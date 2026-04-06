export interface StackItem {
  name: string;
  category: "Languages" | "Frameworks" | "Tooling";
  icon: string; // simple icons CDN slug
  color: string; // brand color for hover glow
}

export const stack: StackItem[] = [
  // Languages
  { name: "TypeScript", category: "Languages", icon: "typescript",   color: "#3178C6" },
  { name: "JavaScript", category: "Languages", icon: "javascript",   color: "#F7DF1E" },
  { name: "HTML5",      category: "Languages", icon: "html5",        color: "#E34F26" },
  { name: "CSS3",       category: "Languages", icon: "css3",         color: "#1572B6" },
  { name: "Sass",       category: "Languages", icon: "sass",         color: "#CC6699" },

  // Frameworks
  { name: "React",          category: "Frameworks", icon: "react",        color: "#61DAFB" },
  { name: "Next.js",        category: "Frameworks", icon: "nextdotjs",    color: "#888888" },
  { name: "Framer Motion",  category: "Frameworks", icon: "framer",       color: "#0055FF" },
  { name: "Node.js",        category: "Frameworks", icon: "nodedotjs",    color: "#339933" },
  { name: "Tailwind CSS",   category: "Frameworks", icon: "tailwindcss",  color: "#06B6D4" },

  // Tooling
  { name: "Figma",   category: "Tooling", icon: "figma",   color: "#F24E1E" },
  { name: "Vite",    category: "Tooling", icon: "vite",    color: "#646CFF" },
  { name: "Git",     category: "Tooling", icon: "git",     color: "#F05032" },
  { name: "Vercel",  category: "Tooling", icon: "vercel",  color: "#888888" },
  { name: "VS Code", category: "Tooling", icon: "visualstudiocode", color: "#007ACC" },
];
