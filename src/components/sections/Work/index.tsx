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
        <h2 className={styles.heading}>Selected frontend work</h2>
        <p className={styles.sub}>
          Product work across admin platforms, e-commerce, analytics, and
          responsive UI implementation.
        </p>
      </div>
      <BentoGrid />
    </SectionWrapper>
  );
}
