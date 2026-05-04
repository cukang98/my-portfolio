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
      <SectionLabel number="02" title="Work" />
      <div className={styles.header}>
        <div>
          <h2 className={styles.heading}>Things I’ve Worked On</h2>
          <p className={styles.kicker}>
            Work projects, personal builds, and the product details behind them.
          </p>
        </div>
        <p className={styles.sub}>
          The professional projects show production polish. The independent ones
          show how I think when I own the full build.
        </p>
      </div>
      <BentoGrid />
    </SectionWrapper>
  );
}
