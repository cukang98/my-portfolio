"use client";

import { meta } from "@/data/meta";

// styles
import styles from "./index.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.copy}>
          © {year} {meta.name}
        </span>
        <div className={styles.links}>
          <a href={meta.links.github} target="_blank" rel="noopener noreferrer" className={styles.link}>
            GitHub
          </a>
          <a href={meta.links.linkedin} target="_blank" rel="noopener noreferrer" className={styles.link}>
            LinkedIn
          </a>
          <a href={`mailto:${meta.email}`} className={styles.link}>
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
