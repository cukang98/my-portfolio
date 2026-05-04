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
          <h2 className={styles.heading}>Selected frontend work</h2>
          <p className={styles.kicker}>
            Work projects for now. Side projects have a spot waiting for them.
          </p>
        </div>
        <p className={styles.sub}>
          The work stuff is more polished. The side-project space is where I
          can try things out and figure stuff out. 🧪
        </p>
      </div>
      <BentoGrid />
    </SectionWrapper>
  );
}
