"use client";

import { motion } from "framer-motion";

// components
import SectionLabel from "@/components/ui/SectionLabel";
import SectionWrapper from "@/components/ui/SectionWrapper";

// styles
import styles from "./index.module.css";

const focusAreas = [
  {
    title: "From Figma to shipped UI",
    body: "I take designs and turn them into responsive React + TypeScript interfaces that handle real-world data and edge cases.",
  },
  {
    title: "Product flows that actually get used",
    body: "A lot of what I build lives in admin systems and e-commerce flows — tables, forms, filters, and all the weird states in between.",
  },
  {
    title: "Maintainable by default",
    body: "I focus on keeping things structured, readable, and easy for the next developer to work on 🛠️",
  },
];

const signals = [
  "React / TypeScript",
  "Admin platforms",
  "E-commerce flows",
  "Responsive interfaces",
  "Analytics touchpoints",
  "AI-assisted delivery",
];

const metrics = [
  { value: "2.5+", label: "years frontend" },
  { value: "5", label: "products shipped" },
  { value: "SG", label: "market experience" },
];

export default function About() {
  return (
    <SectionWrapper id="about">
      <div className={styles.shell}>
        <div className={styles.intro}>
          <SectionLabel number="01" title="About" />
          <motion.h2
            className={styles.heading}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            Frontend developer for clean product interfaces.
          </motion.h2>
          <div className={styles.copy}>
            <p>
              I work with React, Next.js, and TypeScript, turning Figma designs
              into responsive UI that actually holds up in real-world use.
            </p>
            <p>
              A lot of what I build sits in admin tools, e-commerce journeys,
              and analytics-heavy screens — the kind where things need to be
              clear and usable, not just nice-looking.
            </p>
          </div>
        </div>

        <motion.aside
          className={styles.profileCard}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.cardEyebrow}>What I care about</span>
          <p>
            Clean UX, components that don’t get messy, predictable state, and
            the small frontend details that make things easier to use.
          </p>
          <div className={styles.signalGrid}>
            {signals.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </div>
        </motion.aside>
      </div>

      <div className={styles.detailGrid}>
        <div className={styles.metrics}>
          {metrics.map((item, index) => (
            <motion.div
              key={item.label}
              className={styles.metric}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </motion.div>
          ))}
        </div>

        <div className={styles.focusGrid}>
          {focusAreas.map((area, index) => (
            <motion.article
              key={area.title}
              className={styles.focusCard}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className={styles.focusNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{area.title}</h3>
              <p>{area.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
