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

export default function Skills() {
  return (
    <SectionWrapper id="skills" className={styles.section}>
      <div className={styles.header}>
        <div>
          <SectionLabel number="03" title="Skills" />
          <h2 className={styles.heading}>A frontend toolkit, grouped by how I use it.</h2>
        </div>
        <p className={styles.sub}>
          Not every tool I have ever touched. Just the ones I actually reach
          for when building UI, wiring data, or fixing weird frontend stuff.
        </p>
      </div>

      <div className={styles.grid}>
        {skillGroups.map((group, index) => (
          <motion.article
            key={group.title}
            className={styles.card}
            style={{ "--accent": group.accent } as React.CSSProperties}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.5,
              delay: index * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className={styles.cardHeader}>
              <span className={styles.orb} />
              <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <h3>{group.title}</h3>
            <p>{group.summary}</p>
            <div className={styles.chips}>
              {group.skills.map((skill) => {
                const Icon = SKILL_ICONS[skill];
                return (
                  <span key={skill} className={styles.chip}>
                    {Icon && <Icon className={styles.chipIcon} aria-hidden="true" />}
                    {skill}
                  </span>
                );
              })}
            </div>
          </motion.article>
        ))}
      </div>
    </SectionWrapper>
  );
}
