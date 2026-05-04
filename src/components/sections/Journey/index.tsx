"use client";

import { motion } from "framer-motion";

// components
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionLabel from "@/components/ui/SectionLabel";

// styles
import styles from "./index.module.css";

// data
import { journey, JourneyEntry } from "@/data/journey";

const ENTRANCE = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" } as const,
};

const EASE = [0.16, 1, 0.3, 1] as const;

function TypeTag({ type }: { type: JourneyEntry["type"] }) {
  return (
    <span className={`${styles.typeTag} ${styles[`typeTag_${type}`]}`}>
      {type === "work" ? "Work" : "Education"}
    </span>
  );
}

function ChipRow({ tags }: { tags: string[] }) {
  return (
    <div className={styles.chips}>
      {tags.map((tag) => (
        <span key={tag} className={styles.chip}>
          {tag}
        </span>
      ))}
    </div>
  );
}

function SpotlightCard({ entry }: { entry: JourneyEntry }) {
  return (
    <motion.article
      className={styles.spotlight}
      {...ENTRANCE}
      transition={{ duration: 0.55, ease: EASE }}
    >
      <header className={styles.spotlightHead}>
        <span className={styles.presentTag}>
          <span className={styles.presentDot} />
          Present
        </span>
        <span className={styles.period}>{entry.period}</span>
      </header>

      <h3 className={styles.spotlightRole}>{entry.role}</h3>
      <p className={styles.spotlightOrg}>
        {entry.org} <span className={styles.dotSep}>·</span> {entry.location}
      </p>

      <p className={styles.spotlightSummary}>{entry.summary}</p>

      {(entry.focus || entry.highlights) && (
        <div className={styles.focusBlock}>
          <span className={styles.focusLabel}>Focus</span>
          {entry.focus && <p className={styles.focusLead}>{entry.focus}</p>}
          {entry.highlights && (
            <ul className={styles.highlights}>
              {entry.highlights.map((h) => (
                <li key={h}>
                  <span className={styles.bullet} aria-hidden="true">
                    →
                  </span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <ChipRow tags={entry.tags} />
    </motion.article>
  );
}

function PastRow({ entry, index }: { entry: JourneyEntry; index: number }) {
  return (
    <motion.article
      className={styles.row}
      {...ENTRANCE}
      transition={{ duration: 0.5, delay: index * 0.07, ease: EASE }}
    >
      <span className={styles.rowDot} aria-hidden="true" />

      <div className={styles.rowMeta}>
        <span className={styles.period}>{entry.period}</span>
        <TypeTag type={entry.type} />
      </div>

      <div className={styles.rowBody}>
        <h4 className={styles.rowRole}>{entry.role}</h4>
        <p className={styles.rowOrg}>
          {entry.org} <span className={styles.dotSep}>·</span> {entry.location}
          {entry.metric && (
            <>
              {" "}
              <span className={styles.dotSep}>·</span> {entry.metric}
            </>
          )}
        </p>
        <p className={styles.rowSummary}>{entry.summary}</p>
        <ChipRow tags={entry.tags} />
      </div>
    </motion.article>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div className={styles.divider} role="presentation">
      <span className={styles.dividerRule} />
      <span className={styles.dividerLabel}>{label}</span>
      <span className={styles.dividerRule} />
    </div>
  );
}

export default function Journey() {
  const current = journey.find((e) => e.current);
  const past = journey.filter((e) => !e.current);

  return (
    <SectionWrapper id="experience">
      <SectionLabel number="04" title="Experience" />
      <div className={styles.header}>
        <h2 className={styles.heading}>Where I’ve been</h2>
        <p className={styles.sub}>
          From CS foundations in Malaysia to shipping product frontends in
          Singapore.
        </p>
      </div>

      {current && (
        <>
          <Divider label="Now" />
          <SpotlightCard entry={current} />
        </>
      )}

      {past.length > 0 && (
        <>
          <Divider label="Earlier" />
          <div className={styles.rail}>
            {past.map((entry, i) => (
              <PastRow key={entry.id} entry={entry} index={i} />
            ))}
          </div>
        </>
      )}
    </SectionWrapper>
  );
}
