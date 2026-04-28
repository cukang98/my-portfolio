import { meta } from "./meta";

export const seo = {
  title: "Cu Kang Tin - React Frontend Developer in Singapore",
  description:
    "Frontend developer based in Singapore building React and Next.js interfaces for admin platforms, e-commerce, analytics, Firebase, and responsive product UI.",
  keywords: [
    "Cu Kang Tin",
    "Frontend Developer Singapore",
    "React Developer Singapore",
    "Next.js Developer Singapore",
    "React Frontend Developer",
    "Next.js Portfolio",
    "Frontend Engineer",
    "Admin Platform Frontend",
    "E-commerce Frontend",
    "Google Tag Manager",
    "Firebase",
    "Schema Markup",
  ],
  image: "/images/projects/p1_1.png",
  locale: "en_SG",
  author: meta.name.replace("Hi, I'm ", ""),
};

export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}
