export type ProjectSize = "featured" | "medium" | "small";
export type ProjectType = "web" | "mobile";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  url?: string;
  repo?: string;
  images?: string[];
  size: ProjectSize;
  type?: ProjectType;
  year: number;
}

export const projects: Project[] = [
  {
    id: "project-one",
    title: "Wizlah Super Admin",
    description:
      "A centralized internal platform used to manage multiple products including Wizlah and WizService. Built and maintained core modules such as order transactions, voucher management, return & refund workflows, and campaign configurations. Focused on handling complex business logic, scalable state management, and reusable UI components for operational efficiency.",
    tags: ["React", "TypeScript", "Ant Design", "Less", "Redux"],
    images: [
      "/images/projects/p1_1.png",
      "/images/projects/p1_2.png",
      "/images/projects/p1_3.png",
      "/images/projects/p1_4.png",
      "/images/projects/p1_5.png",
    ],
    size: "featured",
    year: 2023,
  },
  {
    id: "project-two",
    title: "Wizlah Supplier Admin",
    description:
      "A supplier-facing admin platform supporting onboarding, voucher tracking, return & refund handling, and operational workflows. Contributed to UI revamp and improved usability across web interfaces, ensuring smooth supplier management and better data visibility.",
    tags: ["React", "TypeScript", "Ant Design", "Less"],
    url: "https://example.com",
    images: [
      "/images/projects/p2_1.png",
      "/images/projects/p2_2.png",
      "/images/projects/p2_3.png",
    ],
    size: "medium",
    year: 2023,
  },
  {
    id: "project-three",
    title: "Wizlah (Home Design Platform)",
    description:
      "An interactive home design platform that allows users to visualize and customize their living spaces in 3D. Features include furniture placement, layout adjustments, and project saving, similar to tools like IKEA Planner. Focused on delivering a smooth and engaging user experience for space planning.",
    tags: ["React", "JavaScript", "3D", "WebGL"],
    url: "https://www.wizlah.com",
    images: [
      "/images/projects/p31.png",
      "/images/projects/p32.png",
      "/images/projects/p33.png",
      "/images/projects/p34.png",
      "/images/projects/p35.png",
    ],
    size: "medium",
    year: 2025,
  },
  {
    id: "project-four",
    title: "Wizlah App",
    description:
      "A mobile application built with Flutter that complements the Wizlah ecosystem. Contributed to UI development and onboarding flows, ensuring responsive layouts and smooth user interactions across devices.",
    tags: ["Flutter", "Dart", "Responsive UI"],
    url: "https://apps.apple.com/sg/app/wizlah/id1616865876",
    type: "mobile",
    images: [
      "/images/projects/p41.png",
      "/images/projects/p42.png",
      "/images/projects/p43.png",
      "/images/projects/p44.png",
      "/images/projects/p45.png",
      "/images/projects/p46.png",
    ],
    size: "small",
    year: 2023,
  },
  {
    id: "project-five",
    title: "WizMarketplace",
    description:
      "An e-commerce platform connecting furniture and home decor suppliers with buyers. Worked on frontend features including product listings, UI components, and performance optimizations to support scalable online shopping experiences.",
    tags: ["React", "JavaScript", "E-commerce", "Material UI"],
    url: "https://www.wizmarketplace.com/",
    images: [
      "/images/projects/p51.png",
      "/images/projects/p52.png",
      "/images/projects/p53.png",
      "/images/projects/p54.png",
    ],
    size: "small",
    year: 2023,
  },
];
