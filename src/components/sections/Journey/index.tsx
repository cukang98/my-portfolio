"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// components
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionLabel from "@/components/ui/SectionLabel";

// styles
import styles from "./index.module.css";

// data
import { journey, JourneyEntry } from "@/data/journey";

/* ─── Type badge ─────────────────────────────────────────────────────────────*/

function TypeBadge({ type }: { type: JourneyEntry["type"] }) {
  return (
    <span className={`${styles.typeBadge} ${styles[`typeBadge_${type}`]}`}>
      {type}
    </span>
  );
}

/* ─── Timeline card ──────────────────────────────────────────────────────────*/

function TimelineCard({
  entry,
  index,
  isExpanded,
  onToggle,
}: {
  entry: JourneyEntry;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const isLeft = index % 2 === 0;

  return (
    <div
      className={`${styles.row} ${isLeft ? styles.rowLeft : styles.rowRight}`}
    >
      {/* Connector dot on the center line */}
      <motion.div
        className={`${styles.dot} ${entry.current ? styles.dotCurrent : ""}`}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        {entry.current && <span className={styles.dotPing} />}
      </motion.div>

      {/* Year label */}
      <motion.span
        className={styles.yearLabel}
        initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
      >
        {entry.year}
      </motion.span>

      {/* Card */}
      <motion.div
        className={`${styles.card} ${isExpanded ? styles.cardExpanded : ""}`}
        initial={{ opacity: 0, y: 24, x: isLeft ? -30 : 30 }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 0.55,
          delay: index * 0.08,
          ease: [0.16, 1, 0.3, 1],
        }}
        whileHover={{ y: -3, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}
        onClick={onToggle}
      >
        <div className={styles.cardHeader}>
          <TypeBadge type={entry.type} />
          {entry.current && <span className={styles.currentTag}>Present</span>}
        </div>

        <h3 className={styles.cardTitle}>{entry.title}</h3>
        <p className={styles.cardSubtitle}>{entry.subtitle}</p>

        <motion.div
          className={styles.cardBody}
          initial={false}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className={styles.cardDesc}>{entry.description}</p>
        </motion.div>

        <button className={styles.expandBtn}>
          {isExpanded ? "Less" : "Read more"}
          <motion.span
            className={styles.expandChevron}
            initial={false}
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            ↓
          </motion.span>
        </button>
      </motion.div>
    </div>
  );
}

/* ─── Main export ────────────────────────────────────────────────────────────*/

export default function Journey() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <SectionWrapper id="about">
      <SectionLabel number="03" title="About" />
      <div className={styles.header}>
        <h2 className={styles.heading}>Experience and education</h2>
        <p className={styles.sub}>
          The path behind my frontend work, from software foundations to
          product implementation in Singapore.
        </p>
      </div>

      <div className={styles.timeline}>
        {/* Center line */}
        <div className={styles.line}>
          <motion.div
            className={styles.lineFill}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {journey.map((entry, i) => (
          <TimelineCard
            key={i}
            entry={entry}
            index={i}
            isExpanded={expandedId === i}
            onToggle={() => setExpandedId((prev) => (prev === i ? null : i))}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
