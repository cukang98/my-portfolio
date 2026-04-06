"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// components
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

// styles
import styles from "./index.module.css";

// data
import { meta } from "@/data/meta";

const ease = [0.16, 1, 0.3, 1] as const;

type Phase = "initial-delay" | "typing" | "hold" | "deleting";

// Cycles through lines: type → hold → backspace → next
function useRotatingTypewriter(
  lines: string[],
  typeSpeed = 38,
  deleteSpeed = 22,
  holdMs = 1800,
) {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<Phase>("initial-delay");

  useEffect(() => {
    const line = lines[lineIndex];

    if (phase === "initial-delay") {
      const t = setTimeout(() => setPhase("typing"), 600);
      return () => clearTimeout(t);
    }

    if (phase === "typing") {
      if (displayed.length < line.length) {
        const t = setTimeout(
          () => setDisplayed(line.slice(0, displayed.length + 1)),
          typeSpeed,
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("hold"), holdMs);
        return () => clearTimeout(t);
      }
    }

    if (phase === "hold") {
      setPhase("deleting");
      return;
    }

    if (phase === "deleting") {
      if (displayed.length > 0) {
        const t = setTimeout(
          () => setDisplayed((d) => d.slice(0, -1)),
          deleteSpeed,
        );
        return () => clearTimeout(t);
      } else {
        setLineIndex((i) => (i + 1) % lines.length);
        setPhase("typing");
      }
    }
  }, [phase, displayed, lineIndex, lines, typeSpeed, deleteSpeed, holdMs]);

  const cursorActive = phase === "typing" || phase === "deleting";
  return { displayed, cursorActive };
}

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease, delay },
  }),
};

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <motion.div custom={0} variants={variants} initial="hidden" animate="visible">
            <Badge available={meta.available} />
          </motion.div>

          <motion.h1
            className={styles.name}
            custom={0.1}
            variants={variants}
            initial="hidden"
            animate="visible"
          >
            {meta.name}
          </motion.h1>

          <motion.p
            className={styles.role}
            custom={0.18}
            variants={variants}
            initial="hidden"
            animate="visible"
          >
            {meta.role}
          </motion.p>

          <motion.p
            className={styles.tagline}
            custom={0.26}
            variants={variants}
            initial="hidden"
            animate="visible"
          >
            <Typewriter lines={meta.tagline} />
          </motion.p>

          <motion.div
            className={styles.ctas}
            custom={0.34}
            variants={variants}
            initial="hidden"
            animate="visible"
          >
            <Button href="#work" variant="filled">View Work</Button>
            <Button href={`mailto:${meta.email}`} variant="ghost">Get in touch</Button>
          </motion.div>
        </div>

        {/* Decorative grid */}
        <motion.div
          className={styles.decoration}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease }}
        >
          <GridDecoration />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <motion.div
          className={styles.scrollDot}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

function Typewriter({ lines }: { lines: string[] }) {
  const { displayed, cursorActive } = useRotatingTypewriter(lines);
  return (
    <>
      {displayed}
      <span className={cursorActive ? styles.cursor : styles.cursorDone}>|</span>
    </>
  );
}

function GridDecoration() {
  const cols = 8;
  const rows = 8;

  return (
    <svg
      className={styles.grid}
      viewBox={`0 0 ${cols * 40} ${rows * 40}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {Array.from({ length: cols * rows }).map((_, i) => {
        const x = (i % cols) * 40 + 20;
        const y = Math.floor(i / cols) * 40 + 20;
        const opacity = Math.random() * 0.5 + 0.05;
        return (
          <circle key={i} cx={x} cy={y} r={1.5} fill="currentColor" opacity={opacity} />
        );
      })}
      {/* Accent ring */}
      <circle cx={200} cy={180} r={60} stroke="currentColor" strokeWidth={0.5} opacity={0.15} />
      <circle cx={200} cy={180} r={100} stroke="currentColor" strokeWidth={0.5} opacity={0.08} />
      <circle cx={200} cy={180} r={4} fill="currentColor" opacity={0.3} />
    </svg>
  );
}
