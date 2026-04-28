export type ProjectSize = "featured" | "medium" | "small";
export type ProjectType = "web" | "mobile";

export interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  impact: string;
  highlights: string[];
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
    role: "Frontend developer on product team",
    description:
      "A centralized operations platform for managing multiple Wizlah products, business workflows, transactions, campaigns, and support processes.",
    impact:
      "Improved operational efficiency by turning complex internal workflows into reusable, searchable, and maintainable admin modules.",
    highlights: [
      "Built order transaction, voucher, campaign, return, and refund modules.",
      "Implemented complex table, filter, form, and CRUD experiences with Ant Design.",
      "Handled role-sensitive admin workflows, reusable UI patterns, and scalable state management.",
    ],
    tags: ["React", "TypeScript", "Ant Design", "Less", "Redux", "Admin UI"],
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
    role: "Frontend developer on product team",
    description:
      "A supplier-facing platform for onboarding, voucher tracking, return and refund handling, and day-to-day supplier operations.",
    impact:
      "Helped suppliers manage marketplace tasks with clearer data visibility, cleaner UI flows, and more consistent operational screens.",
    highlights: [
      "Contributed to UI revamp work across supplier management screens.",
      "Built responsive admin interfaces for forms, tables, filters, and workflow states.",
      "Integrated frontend views with backend APIs for operational data and status updates.",
    ],
    tags: ["React", "TypeScript", "Ant Design", "Less", "API Integration"],
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
    role: "Frontend developer on product team",
    description:
      "A consumer home design platform that lets users visualize layouts, customize living spaces, and interact with 3D planning experiences.",
    impact:
      "Supported a more engaging product discovery journey by connecting interactive room planning with a polished responsive web experience.",
    highlights: [
      "Worked on responsive UI implementation from design references.",
      "Supported interactive product and space-planning experiences in the browser.",
      "Contributed to frontend performance improvements for smoother user interactions.",
    ],
    tags: ["React", "JavaScript", "3D", "WebGL", "Responsive UI"],
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
    role: "Mobile UI contributor",
    description:
      "A mobile app experience that complements the Wizlah ecosystem with onboarding, product discovery, and user-facing flows.",
    impact:
      "Extended product coverage beyond web by contributing mobile UI screens and smoother onboarding interactions.",
    highlights: [
      "Contributed to mobile UI development and onboarding flows.",
      "Adjusted layouts for different mobile screen sizes and interaction patterns.",
      "Collaborated across web and mobile product surfaces for a consistent user experience.",
    ],
    tags: ["Flutter", "Dart", "Mobile UI", "Responsive UI"],
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
    role: "Frontend developer on product team",
    description:
      "An e-commerce platform connecting furniture and home decor suppliers with buyers through product discovery, checkout, and order flows.",
    impact:
      "Helped improve shopping journeys by building product, cart, checkout, SEO, analytics, and performance-focused frontend features.",
    highlights: [
      "Worked on product listing, product detail, cart, checkout, and order-related UI.",
      "Implemented event tracking, dataLayer setup, and GA4/GTM integration for business visibility.",
      "Supported product and FAQ schema markup for stronger search presentation.",
    ],
    tags: ["React", "JavaScript", "Material UI", "E-commerce", "GTM", "Schema"],
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
