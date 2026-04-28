"use client";

import { motion } from "framer-motion";

// components
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionLabel from "@/components/ui/SectionLabel";

// styles
import styles from "./index.module.css";

// data
import { processSteps } from "@/data/process";

export default function Process() {
  return (
    <SectionWrapper id="process">
      <SectionLabel number="04" title="Process" />
      <div className={styles.header}>
        <h2 className={styles.heading}>How I deliver frontend work.</h2>
      </div>
      <div className={styles.steps}>
        {processSteps.map((step, i) => (
          <motion.div
            key={step.number}
            className={styles.step}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
          >
            <span className={styles.number}>{step.number}</span>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
