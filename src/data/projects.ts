export type ProjectSize = "featured" | "medium" | "small";
export type ProjectType = "web" | "mobile";
export type ProjectCategory = "professional" | "independent";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  kind: string;
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
    category: "professional",
    kind: "Admin Platform",
    role: "Frontend developer on product team",
    description:
      "A centralized operations platform for managing Wizlah products, transactions, campaigns, returns, refunds, and support workflows.",
    impact:
      "Turned complex internal workflows into reusable, searchable, and maintainable admin modules for operations teams.",
    highlights: [
      "Built transaction, voucher, campaign, return, and refund modules.",
      "Implemented dense table, filter, form, and CRUD experiences with Ant Design.",
      "Shaped role-sensitive workflows, reusable UI patterns, and scalable state management.",
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
    category: "professional",
    kind: "Supplier Tool",
    role: "Frontend developer on product team",
    description:
      "A supplier-facing platform for onboarding, voucher tracking, return handling, refunds, and day-to-day marketplace operations.",
    impact:
      "Improved supplier task visibility with clearer workflows, cleaner UI states, and more consistent operational screens.",
    highlights: [
      "Contributed to UI revamp work across supplier management screens.",
      "Built responsive forms, tables, filters, and workflow status views.",
      "Integrated frontend screens with APIs for operational data and status updates.",
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
    category: "professional",
    kind: "Home Design",
    role: "Frontend developer on product team",
    description:
      "A consumer home design platform for visualizing layouts, customizing living spaces, and reimagining showroom snapshots through an AI-powered render chat.",
    impact:
      "Connected interactive room planning with AI-assisted visualization, letting users go from a real-life showroom photo to an enhanced design concept in a single chat flow.",
    highlights: [
      "Built the AI render chat experience — users upload a showroom snapshot, send a prompt, and receive an AI-enhanced render inline in the conversation.",
      "Worked on responsive UI implementation from design references and supported interactive product and space-planning experiences in the browser.",
      "Contributed to frontend performance improvements for smoother image upload, streaming, and render previews.",
    ],
    tags: ["React", "JavaScript", "3D", "WebGL", "AI Render", "Responsive UI"],
    url: "https://www.wizlah.com",
    images: [
      "/images/projects/p31.png",
      "/images/projects/p32.png",
      "/images/projects/p33.png",
      "/images/projects/p34.png",
      "/images/projects/p35.png",
      "/images/projects/p36.png",
      "/images/projects/p37.png",
    ],
    size: "medium",
    year: 2025,
  },
  {
    id: "project-four",
    title: "Wizlah App",
    category: "professional",
    kind: "Mobile Product",
    role: "Mobile UI contributor",
    description:
      "A mobile app experience that complements the Wizlah ecosystem with onboarding, product discovery, and user-facing flows.",
    impact:
      "Extended product coverage beyond web with mobile UI screens and smoother onboarding interactions.",
    highlights: [
      "Delivered onboarding and user-facing features in the mobile app.",
      "Implemented mobile UI and interaction states using Flutter.",
      "Aligned mobile experience with existing web product flows.",
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
    category: "professional",
    kind: "E-commerce",
    role: "Frontend developer on product team",
    description:
      "An e-commerce platform connecting furniture and home decor suppliers with buyers through discovery, checkout, and order flows.",
    impact:
      "Improved shopping journeys through product, cart, checkout, SEO, analytics, and performance-focused frontend work.",
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
  {
    id: "project-six",
    title: "Draw and Guess",
    category: "independent",
    kind: "Personal Build",
    role: "Solo developer",
    description:
      "A real-time multiplayer drawing and guessing game where players take turns drawing a word while others race to type the correct answer in chat.",
    impact:
      "Proved out a fullstack real-time architecture — from WebSocket room state to live canvas sync — as a complete, self-contained personal build.",
    highlights: [
      "Built live canvas syncing with Socket.io, broadcasting drawing strokes instantly to all room participants.",
      "Implemented bilingual word sets (English and Chinese) with time-based and position-based scoring across 3-round games.",
      "Designed full room lifecycle — lobby, ready-up, active game, reconnection grace period — with up to 8 concurrent players.",
    ],
    tags: [
      "Next.js",
      "React",
      "Socket.io",
      "Node.js",
      "Tailwind CSS",
      "Framer Motion",
      "WebSockets",
    ],
    url: "https://draw-and-guess-production-92b7.up.railway.app/",
    images: [
      "/images/projects/p61.png",
      "/images/projects/p62.png",
      "/images/projects/p63.png",
      "/images/projects/p64.png",
      "/images/projects/p65.png",
    ],
    size: "medium",
    year: 2025,
  },
  {
    id: "project-seven",
    title: "PixelLab",
    category: "independent",
    kind: "Personal Build",
    role: "Solo developer",
    description:
      "A privacy-first, browser-based image studio for compressing, converting, cropping, retouching, watermarking and batch-processing photos — entirely on-device, with zero uploads.",
    impact:
      "Demonstrated that a complete image-processing toolkit can run client-side with first-class UX, removing the need for server uploads, accounts, or third-party APIs.",
    highlights: [
      "Built a Canvas + CSS-filter pipeline covering quality and target-size compression (binary-searched), format conversion across PNG/JPEG/WebP/AVIF, aspect-ratio and free-rectangle cropping, ten adjustment sliders, and concurrent batch ZIP export.",
      "Engineered live, lag-free interactions: rAF-throttled draggable watermark with single-snapshot undo, debounced auto-reprocessing for size feedback, free-crop draw-and-Enter UX, and global undo/redo shortcuts (⌘Z / ⌘⇧Z).",
      "Designed an editorial-brutalist identity — paper-ink palette with lime/coral accents, hard 1.5px borders, Instrument Serif italic for emphasis — and an animated before/after specimen card driven by a single shared MotionValue for perfect sync.",
    ],
    tags: [
      "Next.js",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
      "Zustand",
      "Canvas API",
      "Image Processing",
    ],
    url: "https://trypixellab.vercel.app/",
    images: [
      "/images/projects/p71.png",
      "/images/projects/p72.png",
      "/images/projects/p73.png",
    ],
    size: "medium",
    year: 2025,
  },
];

export const professionalProjects = projects.filter(
  (project) => project.category === "professional",
);

export const independentProjects = projects.filter(
  (project) => project.category === "independent",
);
