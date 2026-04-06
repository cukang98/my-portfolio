"use client";

// styles
import styles from "./index.module.css";

interface BadgeProps {
  available?: boolean;
  label?: string;
}

export default function Badge({ available = true, label = "Available for work" }: BadgeProps) {
  return (
    <span className={styles.badge}>
      <span className={`${styles.dot} ${available ? styles.dotGreen : styles.dotGray}`} />
      <span className={styles.label}>{label}</span>
    </span>
  );
}
