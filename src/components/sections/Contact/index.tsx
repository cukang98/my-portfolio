"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// styles
import styles from "./index.module.css";

// data
import { meta } from "@/data/meta";

/* ─── SVG Icons ──────────────────────────────────────────────────────────── */

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 13L13 3M13 3H6M13 3v7" />
    </svg>
  );
}

/* ─── Animated heading ───────────────────────────────────────────────────── */

function AnimatedHeading({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const words = text.split(" ");

  return (
    <h2 ref={ref} className={styles.heading}>
      {words.map((word, i) => (
        <span key={i} className={styles.wordWrap}>
          <motion.span
            className={styles.word}
            initial={{ y: "100%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

/* ─── Channel card ───────────────────────────────────────────────────────── */

interface ChannelCardProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  handle: string;
  description: string;
  index: number;
  external?: boolean;
  accentClass: string;
}

function ChannelCard({
  href,
  icon,
  label,
  handle,
  description,
  index,
  external = false,
  accentClass,
}: ChannelCardProps) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${styles.card} ${accentClass}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: 0.15 + index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover="hovered"
    >
      {/* Icon */}
      <div className={styles.iconWrap}>
        <motion.div
          className={styles.iconInner}
          variants={{ hovered: { scale: 1.08, rotate: -4 } }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {icon}
        </motion.div>
      </div>

      {/* Text */}
      <div className={styles.cardBody}>
        <span className={styles.cardLabel}>{label}</span>
        <span className={styles.cardHandle}>{handle}</span>
        <span className={styles.cardDesc}>{description}</span>
      </div>

      {/* Arrow */}
      <motion.div
        className={styles.cardArrow}
        variants={{ hovered: { x: 3, y: -3, opacity: 1 } }}
        initial={{ opacity: 0.4 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <ArrowUpRightIcon />
      </motion.div>
    </motion.a>
  );
}

/* ─── Main export ────────────────────────────────────────────────────────── */

export default function Contact() {
  const channels: Omit<ChannelCardProps, "index">[] = [
    {
      href: `mailto:${meta.email}`,
      icon: <MailIcon />,
      label: "Email",
      handle: meta.email,
      description: "Best for opportunities & collaborations",
      accentClass: styles.accentMail,
    },
    {
      href: meta.links.github,
      icon: <GitHubIcon />,
      label: "GitHub",
      handle: meta.links.github.replace("https://github.com/", "@"),
      description: "See what I'm building",
      external: true,
      accentClass: styles.accentGithub,
    },
    {
      href: meta.links.linkedin,
      icon: <LinkedInIcon />,
      label: "LinkedIn",
      handle: meta.links.linkedin.replace("https://www.linkedin.com/in/", "@").replace(/\/$/, ""),
      description: "Let's connect professionally",
      external: true,
      accentClass: styles.accentLinkedin,
    },
  ];

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        {/* Top content */}
        <div className={styles.top}>
          <motion.p
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            05 / Contact
          </motion.p>

          <AnimatedHeading text="Let's build something great." />

          <motion.p
            className={styles.sub}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            I am open to frontend developer and React developer roles in
            Singapore, especially teams building practical product interfaces
            with React, Next.js, analytics, and API integrations.
          </motion.p>

          {/* Availability badge */}
          {meta.available && (
            <motion.div
              className={styles.availability}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className={styles.availDot} />
              <span className={styles.availText}>Available for work</span>
            </motion.div>
          )}
        </div>

        {/* Channel cards */}
        <div className={styles.cards}>
          {channels.map((ch, i) => (
            <ChannelCard key={ch.label} {...ch} index={i} />
          ))}
        </div>

        {/* Footer line */}
        <motion.p
          className={styles.footer}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Designed & built by {meta.name.replace("Hi, I'm ", "")}
        </motion.p>
      </div>
    </section>
  );
}
