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
  professional: "Professional",
  independent: "Independent",
};

/* ─── Shared: image gallery ──────────────────────────────────────────────── */

function ProjectMedia({
  images,
  title,
  isMobile,
}: {
  images?: string[];
  title: string;
  isMobile?: boolean;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
  }, [images]);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = window.setInterval(
      () => setActive((i) => (i + 1) % images.length),
      3400,
    );
    return () => window.clearInterval(timer);
  }, [images]);

  if (!images?.length) {
    return (
      <div className={styles.mediaFallback}>
        <span>{title.slice(0, 1)}</span>
      </div>
    );
  }

  return (
    <div className={`${styles.media} ${isMobile ? styles.mediaMobile : ""}`}>
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={`${title} preview ${i + 1}`}
          className={`${styles.mediaImage} ${i === active ? styles.mediaImageActive : ""}`}
        />
      ))}
      {images.length > 1 && (
        <div className={styles.mediaDots}>
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show ${title} preview ${i + 1}`}
              className={`${styles.mediaDot} ${i === active ? styles.mediaDotActive : ""}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Shared: link buttons ───────────────────────────────────────────────── */

function ProjectLinks({ project }: { project: Project }) {
  if (!project.url && !project.repo) return null;
  return (
    <div className={styles.links}>
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.linkPrimary}
        >
          Live ↗
        </a>
      )}
      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.linkSecondary}
        >
          Repo ↗
        </a>
      )}
    </div>
  );
}

/* ─── View tabs ──────────────────────────────────────────────────────────── */

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
          className={`${styles.viewButton} ${activeView === view ? styles.viewButtonActive : ""}`}
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

/* ─── Professional: timeline sidebar ────────────────────────────────────── */

function ProfessionalTimeline({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <aside className={styles.timeline} aria-label="Professional project list">
      <div className={styles.timelineList}>
        {professionalProjects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            className={`${styles.timelineItem} ${project.id === selectedId ? styles.timelineItemActive : ""}`}
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

/* ─── Shared spotlight (used by both panels) ─────────────────────────────── */

function ProjectSpotlight({ project }: { project: Project }) {
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
          <ProjectLinks project={project} />
        </div>
        <p className={styles.caseDescription}>{project.description}</p>
        <div className={styles.caseContentGrid}>
          <div className={styles.impactCard}>
            <span>Product value</span>
            <p>{project.impact}</p>
          </div>
          <ul className={styles.highlights}>
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
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

/* ─── Professional panel ─────────────────────────────────────────────────── */

function ProfessionalPanel() {
  const defaultId = professionalProjects[0]?.id ?? "";
  const [selectedId, setSelectedId] = useState(defaultId);
  const selected =
    professionalProjects.find((p) => p.id === selectedId) ??
    professionalProjects[0];

  if (!selected) return null;

  return (
    <motion.div
      key="professional"
      className={styles.proPanelWrap}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Gradient banner */}
      <div className={styles.proBanner}>
        <div className={styles.proBannerGradient} aria-hidden="true" />
        <div className={styles.proBannerContent}>
          <div className={styles.proBannerLeft}>
            <span className={styles.proBannerLabel}>Professional work</span>
            <h3 className={styles.proBannerHeading}>
              Shipped at work, used in production.
            </h3>
          </div>
          <p className={styles.proBannerSub}>
            Frontend across admin tools, e-commerce flows, and responsive UI 💻
          </p>
        </div>
      </div>

      <div className={styles.professionalPanel}>
        <ProfessionalTimeline
          selectedId={selected.id}
          onSelect={setSelectedId}
        />
        <div className={styles.caseWrap}>
          <AnimatePresence mode="wait">
            <ProjectSpotlight key={selected.id} project={selected} />
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Independent: timeline sidebar ─────────────────────────────────────── */

function IndependentTimeline({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <aside className={styles.timeline} aria-label="Independent project list">
      <div className={styles.timelineList}>
        {independentProjects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            className={`${styles.timelineItem} ${project.id === selectedId ? styles.timelineItemActive : ""}`}
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

/* ─── Independent panel ──────────────────────────────────────────────────── */

const TICKER_EMOJIS =
  "🚀  💻  🎨  ⚡  🔥  🛠️  🧠  🎯  🌐  🔗  💡  📦  🧩  ✨  🖥️  🎮  📡  🧪  🔧  🎲  ";

function IndependentPanel() {
  const hasProjects = independentProjects.length > 0;
  const defaultId = independentProjects[0]?.id ?? "";
  const [selectedId, setSelectedId] = useState(defaultId);
  const selected =
    independentProjects.find((p) => p.id === selectedId) ??
    independentProjects[0];

  return (
    <motion.div
      key="independent"
      className={styles.independentPanel}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Banner with diagonal emoji grid */}
      <div className={styles.labBanner}>
        <div className={styles.labTickerBg} aria-hidden="true">
          {[...Array(6)].map((_, row) => {
            const rev = row % 2 === 1;
            return (
              <div key={row} className={styles.labTickerRow}>
                <span
                  className={`${styles.labTickerTrack} ${rev ? styles.labTickerRev : ""}`}
                >
                  {TICKER_EMOJIS}
                  {TICKER_EMOJIS}
                </span>
              </div>
            );
          })}
        </div>

        <div className={styles.labBannerContent}>
          <div className={styles.labBannerLeft}>
            <span className={styles.labBannerLabel}>Independent lab</span>
            <h3 className={styles.labBannerHeading}>
              Projects I own end-to-end.
            </h3>
          </div>
          <p className={styles.labBannerSub}>
            Building stuff to learn, ship, and see what actually works ⚡
          </p>
        </div>
      </div>

      {hasProjects && selected ? (
        <div className={styles.professionalPanel}>
          <IndependentTimeline
            selectedId={selected.id}
            onSelect={setSelectedId}
          />
          <div className={styles.caseWrap}>
            <AnimatePresence mode="wait">
              <ProjectSpotlight key={selected.id} project={selected} />
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <div className={styles.emptyState}>
          <span>Ready for future projects</span>
          <h3>Nothing here yet.</h3>
          <p>
            The space is ready. I only want to show work that feels worth
            sharing.
          </p>
        </div>
      )}
    </motion.div>
  );
}

/* ─── Root export ────────────────────────────────────────────────────────── */

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
