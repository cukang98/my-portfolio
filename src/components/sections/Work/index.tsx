"use client";

// components
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionLabel from "@/components/ui/SectionLabel";
import BentoGrid from "@/components/work/BentoGrid";

// styles
import styles from "./index.module.css";

export default function Work() {
  return (
    <SectionWrapper id="work">
      <SectionLabel number="01" title="Work" />
      <div className={styles.header}>
        <h2 className={styles.heading}>Selected projects</h2>
        <p className={styles.sub}>
          A focused set of work — each one a different problem, the same standard.
        </p>
      </div>
      <BentoGrid />
    </SectionWrapper>
  );
}
