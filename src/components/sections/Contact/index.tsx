"use client";

import { motion } from "framer-motion";

// components
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";

// styles
import styles from "./index.module.css";

// data
import { meta } from "@/data/meta";

export default function Contact() {
  return (
    <SectionWrapper id="contact">
      <div className={styles.inner}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className={styles.eyebrow}>04 / Contact</p>
          <h2 className={styles.heading}>Let's build something.</h2>
          <p className={styles.sub}>
            Available for full-time roles and selected freelance projects.
          </p>

          <div className={styles.ctas}>
            <Button href={`mailto:${meta.email}`} variant="filled">
              Send me a message
            </Button>
            <Button href={meta.links.github} variant="ghost" external>
              GitHub
            </Button>
            <Button href={meta.links.linkedin} variant="ghost" external>
              LinkedIn
            </Button>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
