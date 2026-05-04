"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

// components
import Tag from "@/components/ui/Tag";

// data
import {
  independentProjects,
  professionalProjects,
  Project,
  ProjectCategory,
} from "@/data/projects";

// styles
import styles from "./index.module.css";

type WorkView = ProjectCategory;

const viewLabels: Record<WorkView, string> = {
  professional: "Professional Projects",
  independent: "Independent Projects",
};

function ProjectMedia({
  images,
  title,
  isMobile,
  compact = false,
}: {
  images?: string[];
  title: string;
  isMobile?: boolean;
  compact?: boolean;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
  }, [images]);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = window.setInterval(
      () => setActive((index) => (index + 1) % images.length),
      compact ? 4200 : 3400,
    );
    return () => window.clearInterval(timer);
  }, [compact, images]);

  if (!images?.length) {
    return (
      <div className={`${styles.mediaFallback} ${compact ? styles.mediaCompact : ""}`}>
        <span>{title.slice(0, 1)}</span>
      </div>
    );
  }

  return (
    <div
      className={`${styles.media} ${isMobile ? styles.mediaMobile : ""} ${
        compact ? styles.mediaCompact : ""
      }`}
    >
      {images.map((src, index) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={`${title} preview ${index + 1}`}
          className={`${styles.mediaImage} ${
            index === active ? styles.mediaImageActive : ""
          }`}
        />
      ))}

      {images.length > 1 && (
        <div className={styles.mediaDots}>
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Show ${title} preview ${index + 1}`}
              className={`${styles.mediaDot} ${
                index === active ? styles.mediaDotActive : ""
              }`}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ViewTabs({
  activeView,
  onChange,
}: {
  activeView: WorkView;
  onChange: (view: WorkView) => void;
}) {
  const counts: Record<WorkView, number> = {
    professional: professionalProjects.length,
    independent: independentProjects.length,
  };

  return (
    <div className={styles.viewBar} aria-label="Project category selector">
      {(Object.keys(viewLabels) as WorkView[]).map((view) => (
        <button
          key={view}
          type="button"
          className={`${styles.viewButton} ${
            activeView === view ? styles.viewButtonActive : ""
          }`}
          aria-pressed={activeView === view}
          onClick={() => onChange(view)}
        >
          <span>{viewLabels[view]}</span>
          <strong>{counts[view]}</strong>
        </button>
      ))}
    </div>
  );
}

function ProfessionalTimeline({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <aside className={styles.timeline} aria-label="Professional project list">
      <div className={styles.timelineIntro}>
        <span>Professional track</span>
        <p>Stuff I worked on at my job: admin tools, product flows, and commerce UI.</p>
      </div>

      <div className={styles.timelineList}>
        {professionalProjects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            className={`${styles.timelineItem} ${
              project.id === selectedId ? styles.timelineItemActive : ""
            }`}
            onClick={() => onSelect(project.id)}
          >
            <span className={styles.timelineIndex}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className={styles.timelineText}>
              <strong>{project.title}</strong>
              <small>{project.kind}</small>
            </span>
            <span className={styles.timelineYear}>{project.year}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}

function ProfessionalSpotlight({ project }: { project: Project }) {
  return (
    <motion.article
      key={project.id}
      className={styles.caseStudy}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
    >
      <ProjectMedia
        images={project.images}
        title={project.title}
        isMobile={project.type === "mobile"}
      />

      <div className={styles.caseBody}>
        <div className={styles.caseMeta}>
          <span>{project.kind}</span>
          <span>{project.year}</span>
        </div>

        <div className={styles.caseTitleRow}>
          <div>
            <h3>{project.title}</h3>
            <p>{project.role}</p>
          </div>

          <div className={styles.links}>
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                Live
              </a>
            )}
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noopener noreferrer">
                Repo
              </a>
            )}
          </div>
        </div>

        <p className={styles.caseDescription}>{project.description}</p>

        <div className={styles.caseContentGrid}>
          <div className={styles.impactCard}>
            <span>Product value</span>
            <p>{project.impact}</p>
          </div>

          <ul className={styles.highlights}>
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>

        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function ProfessionalPanel() {
  const defaultId = professionalProjects[0]?.id ?? "";
  const [selectedId, setSelectedId] = useState(defaultId);
  const selected =
    professionalProjects.find((project) => project.id === selectedId) ??
    professionalProjects[0];

  if (!selected) return null;

  return (
    <motion.div
      key="professional"
      className={styles.professionalPanel}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <ProfessionalTimeline selectedId={selected.id} onSelect={setSelectedId} />
      <div className={styles.caseWrap}>
        <AnimatePresence mode="wait">
          <ProfessionalSpotlight key={selected.id} project={selected} />
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function IndependentProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const href = project.url ?? project.repo;

  const content = (
    <>
      <ProjectMedia
        images={project.images}
        title={project.title}
        isMobile={project.type === "mobile"}
        compact
      />
      <div className={styles.labCardBody}>
        <div className={styles.labMeta}>
          <span>{project.kind}</span>
          <span>{project.year}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className={styles.tags}>
          {project.tags.slice(0, 5).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </>
  );

  const className = styles.labCard;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.34, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {content}
        </a>
      ) : (
        <article className={className}>{content}</article>
      )}
    </motion.div>
  );
}

function IndependentPanel() {
  const hasProjects = independentProjects.length > 0;

  return (
    <motion.div
      key="independent"
      className={styles.independentPanel}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.labIntro}>
        <span>Independent lab</span>
        <h3>Side projects, experiments, and things I try on my own.</h3>
        <p>
          Add a project with `category: "independent"` in `src/data/projects.ts`.
          It will show up here automatically.
        </p>
      </div>

      {hasProjects ? (
        <div className={styles.labGrid}>
          {independentProjects.map((project, index) => (
            <IndependentProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <span>Ready for future projects</span>
          <h3>No side projects here yet.</h3>
          <p>
            The space is ready. I just do not want to fill it with random demos
            until they feel worth showing.
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default function BentoGrid() {
  const [activeView, setActiveView] = useState<WorkView>("professional");
  const activeCount = useMemo(
    () =>
      activeView === "professional"
        ? professionalProjects.length
        : independentProjects.length,
    [activeView],
  );

  return (
    <div className={styles.showcase}>
      <div className={styles.showcaseHeader}>
        <ViewTabs activeView={activeView} onChange={setActiveView} />
        <div className={styles.viewSummary}>
          <span>{activeCount}</span>
          <p>{viewLabels[activeView]}</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeView === "professional" ? (
          <ProfessionalPanel />
        ) : (
          <IndependentPanel />
        )}
      </AnimatePresence>
    </div>
  );
}
