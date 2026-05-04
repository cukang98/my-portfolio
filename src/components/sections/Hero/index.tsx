"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

// components
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

// styles
import styles from "./index.module.css";

// data
import { meta } from "@/data/meta";

const ease = [0.16, 1, 0.3, 1] as const;

/* ─── Typewriter ─────────────────────────────────────────────────────────── */

type Phase = "initial-delay" | "typing" | "hold" | "deleting";

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

  return {
    displayed,
    cursorActive: phase === "typing" || phase === "deleting",
  };
}

function Typewriter({ lines }: { lines: string[] }) {
  const { displayed, cursorActive } = useRotatingTypewriter(lines);
  return (
    <>
      {displayed}
      <span className={cursorActive ? styles.cursor : styles.cursorDone}>
        |
      </span>
    </>
  );
}

/* ─── Floating chip ──────────────────────────────────────────────────────── */

function FloatingChip({
  label,
  color,
  className,
  delay,
}: {
  label: string;
  color: string;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      className={`${styles.chip} ${className}`}
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease }}
    >
      <span className={styles.chipDot} style={{ background: color }} />
      <span className={styles.chipLabel}>{label}</span>
    </motion.div>
  );
}

/* ─── Photo card ─────────────────────────────────────────────────────────── */

function PhotoCard({
  springX,
  springY,
}: {
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
}) {
  const rotateX = useTransform(springY, [0, 1], [7, -7]);
  const rotateY = useTransform(springX, [0, 1], [-7, 7]);

  return (
    <div className={styles.tiltPerspective}>
      <motion.div className={styles.photoCard} style={{ rotateX, rotateY }}>
        {/* Spinning gradient ring + video */}
        <div className={styles.photoClip}>
          <div className={styles.photoRing} />
          <div className={styles.photoInner}>
            <video
              src="/images/ck_greeting.mp4"
              className={styles.photo}
              autoPlay
              muted
              playsInline
            />
          </div>
        </div>

        {/* Floating chips */}
        <FloatingChip
          label="React"
          color="#61DAFB"
          className={styles.chipReact}
          delay={0.85}
        />
        <FloatingChip
          label="GTM / GA4"
          color="#246FDB"
          className={styles.chipTs}
          delay={1.0}
        />
        <FloatingChip
          label="Next.js"
          color="#888"
          className={styles.chipNext}
          delay={1.15}
        />
      </motion.div>
    </div>
  );
}

/* ─── Fade-up variants ───────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease, delay },
  }),
};

/* ─── Main export ────────────────────────────────────────────────────────── */

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const mouseXMv = useMotionValue(0.5);
  const mouseYMv = useMotionValue(0.5);
  const springX = useSpring(mouseXMv, { stiffness: 40, damping: 22 });
  const springY = useSpring(mouseYMv, { stiffness: 40, damping: 22 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseXMv.set((e.clientX - rect.left) / rect.width);
      mouseYMv.set((e.clientY - rect.top) / rect.height);
    },
    [mouseXMv, mouseYMv],
  );

  const match = meta.name.match(/^(Hi,\s*I'm\s+)(.*)/);
  const greeting = match?.[1] ?? "";
  const personName = match?.[2] ?? meta.name;

  return (
    <section
      className={styles.hero}
      ref={sectionRef}
      onMouseMove={handleMouseMove}
    >
      <div className={styles.inner}>
        {/* ─── Left: text ─── */}
        <div className={styles.content}>
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <Badge available={meta.available} />
          </motion.div>

          <motion.div
            className={styles.headingBlock}
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <span className={styles.greeting}>{greeting}</span>
            <h1 className={styles.name}>{personName}</h1>
            <span className={styles.role}>{meta.role}</span>
          </motion.div>

          <motion.p
            className={styles.tagline}
            custom={0.25}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <Typewriter lines={meta.tagline} />
          </motion.p>

          <motion.p
            className={styles.summary}
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Frontend developer with 2.5+ years of experience building React and
            Next.js applications, focused on maintainable UI, predictable state,
            and real-world product usage.
          </motion.p>

          <motion.div
            className={styles.ctas}
            custom={0.38}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <Button href="#work" variant="filled">
              View Work
            </Button>
            <Button href={`mailto:${meta.email}`} variant="ghost">
              Get in touch
            </Button>
          </motion.div>

          <motion.div
            className={styles.stack}
            custom={0.48}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            {["React", "Next.js", "TypeScript", "GTM", "Firebase"].map(
              (tech, i) => (
                <span key={tech} className={styles.stackItem}>
                  {i > 0 && <span className={styles.stackSep}>·</span>}
                  {tech}
                </span>
              ),
            )}
          </motion.div>

          <motion.div
            className={styles.metrics}
            custom={0.58}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <div className={styles.metric}>
              <span className={styles.metricValue}>2.5+</span>
              <span className={styles.metricLabel}>years frontend</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricValue}>5</span>
              <span className={styles.metricLabel}>featured products</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricValue}>SG</span>
              <span className={styles.metricLabel}>based experience</span>
            </div>
          </motion.div>
        </div>

        {/* ─── Right: photo ─── */}
        <motion.div
          className={styles.photoArea}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease }}
        >
          <div className={styles.photoGlow} />
          <PhotoCard springX={springX} springY={springY} />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <motion.div
          className={styles.scrollDot}
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
