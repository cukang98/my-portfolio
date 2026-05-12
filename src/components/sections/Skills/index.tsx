"use client";

import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiFigma,
  SiAntdesign,
  SiRedux,
  SiFirebase,
  SiFlutter,
  SiDart,
  SiOpenai,
  SiExpress,
  SiPrisma,
  SiPostgresql,
} from "react-icons/si";
import {
  LuFileCode2,
  LuLayers,
  LuPlug,
  LuFileText,
  LuTable2,
  LuFilter,
  LuGitBranch,
  LuCloud,
  LuTag,
  LuChartBar,
  LuCode,
  LuMonitorSmartphone,
  LuTerminal,
} from "react-icons/lu";
import { motion } from "framer-motion";

// components
import SectionLabel from "@/components/ui/SectionLabel";
import SectionWrapper from "@/components/ui/SectionWrapper";

// data
import { skillGroups } from "@/data/skills";

// styles
import styles from "./index.module.css";

const SKILL_ICONS: Record<string, IconType> = {
  "React":             SiReact,
  "Next.js":           SiNextdotjs,
  "TypeScript":        SiTypescript,
  "Figma to UI":       SiFigma,
  "CSS Modules":       LuFileCode2,
  "Ant Design":        SiAntdesign,
  "Material UI":       LuLayers,
  "Redux":             SiRedux,
  "API Integration":   LuPlug,
  "Forms":             LuFileText,
  "Tables":            LuTable2,
  "Filters":           LuFilter,
  "Workflow States":   LuGitBranch,
  "Express.js":        SiExpress,
  "Prisma":            SiPrisma,
  "PostgreSQL":        SiPostgresql,
  "Firebase":          SiFirebase,
  "Cloud Functions":   LuCloud,
  "GTM":               LuTag,
  "GA4":               LuChartBar,
  "Schema Markup":     LuCode,
  "Flutter":           SiFlutter,
  "Dart":              SiDart,
  "Adaptive Layouts":  LuMonitorSmartphone,
  "Claude Code":       LuTerminal,
  "Codex":             SiOpenai,
};

const EASE = [0.16, 1, 0.3, 1] as const;

// span hints for bento layout (12-col, 3 rows that pack 7 cards cleanly)
const SPANS = [7, 5, 4, 4, 4, 7, 5];

export default function Skills() {
  return (
    <SectionWrapper id="skills" className={styles.section}>
      <div className={styles.header}>
        <div>
          <SectionLabel number="03" title="Skills" />
          <h2 className={styles.heading}>A toolkit, grouped by how I use it.</h2>
        </div>
        <p className={styles.sub}>
          Not every tool I have ever touched. Just the ones I actually reach
          for when building UI, wiring data, or fixing weird frontend stuff.
        </p>
      </div>

      <motion.div
        className={styles.grid}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.07 } },
        }}
      >
        {skillGroups.map((group, index) => {
          const span = SPANS[index] ?? 4;
          return (
            <motion.article
              key={group.title}
              className={styles.card}
              data-span={span}
              style={{ "--accent": group.accent } as React.CSSProperties}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.55, ease: EASE }}
              whileHover={{ y: -4 }}
            >
              <span className={styles.cardGlow} aria-hidden="true" />
              <span className={styles.cardGrid} aria-hidden="true" />

              <div className={styles.cardHeader}>
                <div className={styles.orbWrap}>
                  <span className={styles.orb} />
                  <span className={styles.orbPulse} aria-hidden="true" />
                </div>
                <span className={styles.index}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>
                  {group.title}
                  <span className={styles.titleUnderline} aria-hidden="true" />
                </h3>
                <p className={styles.cardSummary}>{group.summary}</p>
              </div>

              <motion.div
                className={styles.chips}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.035, delayChildren: 0.15 } },
                }}
              >
                {group.skills.map((skill) => {
                  const Icon = SKILL_ICONS[skill];
                  return (
                    <motion.span
                      key={skill}
                      className={styles.chip}
                      variants={{
                        hidden: { opacity: 0, y: 8, scale: 0.94 },
                        visible: { opacity: 1, y: 0, scale: 1 },
                      }}
                      transition={{ duration: 0.32, ease: EASE }}
                      whileHover={{ y: -2, scale: 1.04 }}
                    >
                      {Icon && <Icon className={styles.chipIcon} aria-hidden="true" />}
                      {skill}
                    </motion.span>
                  );
                })}
              </motion.div>
            </motion.article>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
