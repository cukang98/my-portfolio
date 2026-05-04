export type JourneyType = "work" | "education";

export interface JourneyEntry {
  id: string;
  type: JourneyType;
  period: string;
  startYear: string;
  current?: boolean;

  role: string;
  org: string;
  location: string;
  metric?: string;

  summary: string;
  highlights?: string[];
  focus?: string;
  tags: string[];
}

export const journey: JourneyEntry[] = [
  {
    id: "wizlah-2023",
    type: "work",
    period: "2023 → Present",
    startYear: "2023",
    current: true,
    role: "Frontend Developer",
    org: "Wizlah Venture",
    location: "Singapore",
    summary:
      "Ship React and TypeScript surfaces across admin platforms, e-commerce, supplier workflows, and mobile-adjacent products.",
    focus: "Figma → production UI for product teams",
    highlights: [
      "Translate Figma designs into responsive, production-ready interfaces",
      "Integrate REST APIs and Firebase Cloud Functions across product surfaces",
      "Performance work, GA4 / GTM analytics, and product / FAQ schema markup",
    ],
    tags: [
      "React",
      "TypeScript",
      "Next.js",
      "Firebase",
      "Cloud Functions",
      "GA4",
      "GTM",
      "E-commerce",
      "Admin Tooling",
      "SEO Schema",
    ],
  },
  {
    id: "toshiba-2022",
    type: "work",
    period: "2022 — 2023",
    startYear: "2022",
    role: "Firmware Test Engineer",
    org: "Toshiba TEC",
    location: "Singapore",
    summary:
      "Validated firmware on production hardware; owned debug cycles and ran test processes across the product lifecycle.",
    tags: ["QA", "Firmware Testing", "Debugging", "Hardware"],
  },
  {
    id: "mmu-bachelors-2019",
    type: "education",
    period: "2019 — 2022",
    startYear: "2019",
    role: "B.Sc. in Computer Science (AI Major)",
    org: "Multimedia University",
    location: "Malaysia",
    metric: "CGPA 3.74",
    summary:
      "Specialized in AI / ML on top of core software engineering; built real applications and stayed close to frontend craft.",
    tags: ["Software Engineering", "AI / ML", "System Design", "Frontend"],
  },
  {
    id: "mmu-diploma-2017",
    type: "education",
    period: "2017 — 2019",
    startYear: "2017",
    role: "Diploma in Information Technology",
    org: "Multimedia University",
    location: "Malaysia",
    metric: "CGPA 3.83",
    summary:
      "Programming fundamentals, first web apps, and the start of an interest in interfaces.",
    tags: ["Web Development", "Fundamentals", "HTML / CSS / JS"],
  },
];
