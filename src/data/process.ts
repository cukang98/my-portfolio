export interface ProcessStep {
  number: string;
  title: string;
  body: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Understand",
    body: "Before touching a file, I map the problem — user goals, constraints, and what success actually looks like. Good interfaces start with good questions.",
  },
  {
    number: "02",
    title: "Architect",
    body: "Structure first. I plan component boundaries, data flow, and state before writing markup. This keeps the implementation honest and refactoring rare.",
  },
  {
    number: "03",
    title: "Refine",
    body: "The gap between working and polished is where I live. Motion, spacing, micro-interactions — these details are not decoration, they are the product.",
  },
  {
    number: "04",
    title: "Ship",
    body: "Deployed code beats perfect code. I optimize for performance, accessibility, and maintainability — then I release and iterate.",
  },
];
