"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// components
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionLabel from "@/components/ui/SectionLabel";

// styles
import styles from "./index.module.css";

// data
import { stack } from "@/data/stack";

const TABS = ["All", "Core", "Frontend", "Product"] as const;
type Tab = (typeof TABS)[number];

const stats = [
  { value: "2.5+", label: "years frontend" },
  { value: "5+", label: "products shipped" },
  { value: "SG", label: "market experience" },
];

const strengths = [
  {
    title: "React product UI",
    body: "Build maintainable screens for admin platforms, e-commerce flows, forms, tables, filters, dashboards, and responsive product pages.",
  },
  {
    title: "Next.js implementation",
    body: "Comfortable with App Router, Pages Router, SSR, SSG, ISR, CSR, middleware, dynamic routes, and SEO-facing metadata decisions.",
  },
  {
    title: "Analytics and business signals",
    body: "Implement GTM, dataLayer events, GA4 tracking, Firebase Analytics, and product/FAQ schema markup so frontend work supports measurable decisions.",
  },
  {
    title: "AI-assisted delivery",
    body: "Use tools like Codex and Claude Code to speed up implementation, debugging, refactoring, and review while keeping ownership of code quality.",
  },
];

export default function About() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const filtered =
    activeTab === "All" ? stack : stack.filter((s) => s.category === activeTab);

  return (
    <SectionWrapper id="skills">
      <div className={styles.grid}>
        {/* ── Left: Bio ─────────────────────────────────────────── */}
        <div className={styles.bio}>
          <SectionLabel number="02" title="Skills" />
          <h2 className={styles.heading}>
            Frontend implementation with product context.
          </h2>

          <div className={styles.body}>
            <p>
              I am a frontend developer focused on React and Next.js,
              currently building production interfaces for Singapore-based
              product teams.
            </p>
            <p>
              My work covers admin platforms, supplier systems, e-commerce
              websites, responsive web, and mobile-related UI. I translate
              Figma designs into reliable interfaces, integrate APIs, and keep
              user flows clear even when the business logic is complex.
            </p>
            <p>
              I also care about the commercial side of frontend work:
              performance, analytics, structured data, maintainability, and the
              small UI details that make products easier to operate and scale.
            </p>
          </div>

          {/* Stats row */}
          <div className={styles.stats}>
            {stats.map(({ value, label }, i) => (
              <motion.div
                key={label}
                className={styles.stat}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.1 * i,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <span className={styles.statValue}>{value}</span>
                <span className={styles.statLabel}>{label}</span>
              </motion.div>
            ))}
          </div>

          <div className={styles.strengths}>
            {strengths.map((item) => (
              <article key={item.title} className={styles.strengthCard}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>

        {/* ── Right: Stack ──────────────────────────────────────── */}
        <div className={styles.stackCol}>
          {/* Tab pills */}
          <div className={styles.tabs} role="tablist">
            {TABS.map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                {activeTab === tab && (
                  <motion.span
                    className={styles.tabUnderline}
                    layoutId="tab-underline"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Icon grid */}
          <motion.div className={styles.iconGrid} layout>
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <motion.div
                  key={item.name}
                  layout
                  className={styles.card}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  onHoverStart={() => setHoveredItem(item.name)}
                  onHoverEnd={() => setHoveredItem(null)}
                  style={
                    hoveredItem === item.name
                      ? ({
                          "--glow": item.color,
                          borderColor: `${item.color}55`,
                          boxShadow: `0 0 0 1px ${item.color}33, 0 8px 24px ${item.color}22`,
                        } as React.CSSProperties)
                      : undefined
                  }
                >
                  {/* Icon */}
                  <div className={styles.iconWrap}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://cdn.simpleicons.org/${item.icon}`}
                      alt={item.name}
                      width={28}
                      height={28}
                      className={styles.icon}
                      style={
                        hoveredItem === item.name
                          ? { filter: "none" }
                          : undefined
                      }
                    />
                  </div>

                  {/* Name */}
                  <span className={styles.cardName}>{item.name}</span>

                  {/* Category badge — only visible in "All" tab */}
                  {activeTab === "All" && (
                    <span className={styles.badge}>{item.category}</span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
