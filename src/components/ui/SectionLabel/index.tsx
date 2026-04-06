"use client";

// styles
import styles from "./index.module.css";

interface SectionLabelProps {
  number: string;
  title: string;
}

export default function SectionLabel({ number, title }: SectionLabelProps) {
  return (
    <div className={styles.label}>
      <span className={styles.number}>{number}</span>
      <span className={styles.slash}>/</span>
      <span className={styles.title}>{title}</span>
    </div>
  );
}
