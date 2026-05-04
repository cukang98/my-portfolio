// components
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Journey from "@/components/sections/Journey";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";

// data
import { meta } from "@/data/meta";
import { projects } from "@/data/projects";
import { getSiteUrl, seo } from "@/data/seo";

function PortfolioJsonLd() {
  const siteUrl = getSiteUrl();
  const name = seo.author;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name,
        url: siteUrl,
        email: meta.email,
        jobTitle: "Frontend Developer",
        image: `${siteUrl}/images/projects/p1_1.png`,
        address: {
          "@type": "PostalAddress",
          addressCountry: "SG",
          addressLocality: "Singapore",
        },
        sameAs: [meta.links.github, meta.links.linkedin],
        knowsAbout: [
          "React",
          "Next.js",
          "TypeScript",
          "Server-side rendering",
          "Static site generation",
          "Incremental static regeneration",
          "Google Tag Manager",
          "Firebase",
          "Schema markup",
          "Responsive web design",
          "Figma to frontend implementation",
          "E-commerce frontend development",
          "Admin platform frontend development",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: `${name} Portfolio`,
        description: seo.description,
        inLanguage: "en-SG",
        publisher: {
          "@id": `${siteUrl}/#person`,
        },
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#projects`,
        name: "Selected frontend projects",
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: project.title,
            description: `${project.description} ${project.impact}`,
            url: project.url || siteUrl,
            dateCreated: String(project.year),
            creator: {
              "@id": `${siteUrl}/#person`,
            },
            keywords: project.tags.join(", "),
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function Home() {
  return (
    <>
      <PortfolioJsonLd />
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Skills />
        <Journey />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
