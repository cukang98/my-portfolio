"use client";

// components
import ProjectCard from "@/components/work/ProjectCard";

// styles
import styles from "./index.module.css";

// data
import { projects } from "@/data/projects";

export default function BentoGrid() {
  return (
    <div className={styles.grid}>
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
}
