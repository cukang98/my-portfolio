export interface ProcessStep {
  number: string;
  title: string;
  body: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Clarify the workflow",
    body: "I start by understanding the user flow, business rules, API shape, analytics needs, and design intent before breaking the work into frontend tasks.",
  },
  {
    number: "02",
    title: "Build the interface",
    body: "I translate Figma into responsive React UI with maintainable components, predictable state, accessible controls, and clear loading or error states.",
  },
  {
    number: "03",
    title: "Connect product signals",
    body: "I integrate APIs, GTM dataLayer events, GA4 tracking, Firebase touchpoints, schema markup, and performance improvements where the product needs them.",
  },
  {
    number: "04",
    title: "Use AI responsibly",
    body: "I use Codex and Claude Code to accelerate implementation, debugging, review, and refactoring, then validate the output through my own testing and code judgment.",
  },
];
