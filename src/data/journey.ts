export interface JourneyEntry {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  type: "education" | "work";
  current?: boolean;
}

export const journey: JourneyEntry[] = [
  {
    year: "2017",
    title: "Diploma in Information Technology",
    subtitle: "Multimedia University, Malaysia — CGPA 3.83",
    description:
      "Started my journey in tech by learning programming fundamentals and web development. Built my first applications and developed a strong interest in creating user interfaces and interactive experiences.",
    type: "education",
  },
  {
    year: "2019",
    title: "Bachelor's in Computer Science (AI Major)",
    subtitle: "Multimedia University, Malaysia — CGPA 3.74",
    description:
      "Specialized in Artificial Intelligence while strengthening my foundation in software engineering. Gained exposure to machine learning concepts, data-driven problem solving, and system design, while continuing to focus on frontend development and building real-world applications.",
    type: "education",
  },
  {
    year: "Feb 2022",
    title: "Firmware Test Engineer",
    subtitle: "Toshiba TEC, Singapore",
    description:
      "Started my professional career in a QA-focused role, working on firmware testing and validation. Gained experience in debugging, test processes, and understanding product lifecycles in a production environment.",
    type: "work",
  },
  {
    year: "Aug 2023",
    title: "Frontend Developer",
    subtitle: "Wizlah Venture Pte Ltd, Singapore",
    description:
      "Building React and TypeScript interfaces for admin platforms, e-commerce products, supplier workflows, and mobile-related product surfaces. Work includes API integration, UI implementation from Figma, performance improvements, Firebase/Cloud Functions collaboration, analytics tracking with GTM and GA4, and product/FAQ schema markup.",
    type: "work",
    current: true,
  },
];
