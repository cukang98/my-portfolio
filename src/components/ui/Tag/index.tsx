"use client";

// styles
import styles from "./index.module.css";

interface TagProps {
  children: React.ReactNode;
}

export default function Tag({ children }: TagProps) {
  return <span className={styles.tag}>{children}</span>;
}
