'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// styles
import styles from './index.module.css'

// data
import { projects, Project } from '@/data/projects'

// components
import Tag from '@/components/ui/Tag'

/* ─── Spotlight image gallery ────────────────────────────────────────────────*/

/* ─── Mobile phone carousel (2 visible at a time) ──────────────────────────*/

function MobileGallery ({ images, title }: { images: string[]; title: string }) {
  const totalPages = Math.ceil(images.length / 2)
  const [page, setPage] = useState(0)

  const goNext = () => setPage(p => (p + 1) % totalPages)
  const goPrev = () => setPage(p => (p - 1 + totalPages) % totalPages)

  // auto-play
  useEffect(() => {
    if (totalPages <= 1) return
    const t = setInterval(goNext, 3500)
    return () => clearInterval(t)
  }, [totalPages])

  // reset page when images change
  useEffect(() => { setPage(0) }, [images])

  const visible = images.slice(page * 2, page * 2 + 2)

  return (
    <div className={styles.mobileGalleryWrap}>
      <div className={styles.mobileGalleryViewport}>
        <AnimatePresence mode='wait'>
          <motion.div
            key={page}
            className={styles.mobileGalleryTrack}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {visible.map((src, i) => (
              <div key={src} className={styles.phoneFrame}>
                <div className={styles.phoneNotch} />
                <img src={src} alt={`${title} screen ${page * 2 + i + 1}`} className={styles.phoneScreen} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      {totalPages > 1 && (
        <div className={styles.mobileNav}>
          <button className={styles.mobileNavBtn} onClick={goPrev} aria-label='Previous'>
            ←
          </button>
          <div className={styles.mobileNavDots}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={`${styles.mobileNavDot} ${i === page ? styles.mobileNavDotActive : ''}`}
                onClick={() => setPage(i)}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>
          <button className={styles.mobileNavBtn} onClick={goNext} aria-label='Next'>
            →
          </button>
        </div>
      )}
    </div>
  )
}

/* ─── Web image gallery (auto-rotating) ─────────────────────────────────────*/

function SpotlightImage ({
  images,
  title,
  isMobile,
}: {
  images?: string[]
  title: string
  isMobile?: boolean
}) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    setActive(0)
  }, [images])

  useEffect(() => {
    if (!images || images.length <= 1 || isMobile) return
    const t = setInterval(() => setActive(i => (i + 1) % images.length), 3200)
    return () => clearInterval(t)
  }, [images, isMobile])

  if (!images || images.length === 0) {
    return (
      <div className={styles.spotlightNoImage}>
        <span className={styles.spotlightNoImageInitial}>
          {title.charAt(0)}
        </span>
      </div>
    )
  }

  if (isMobile) {
    return <MobileGallery images={images} title={title} />
  }

  const goNext = () => setActive(i => (i + 1) % images.length)
  const goPrev = () => setActive(i => (i - 1 + images.length) % images.length)

  return (
    <div className={styles.spotlightImageWrap}>
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={title}
          className={`${styles.spotlightImg} ${
            i === active ? styles.spotlightImgActive : ''
          }`}
        />
      ))}
      <div className={styles.spotlightImgGradient} />
      {images.length > 1 && (
        <>
          <button className={`${styles.spotlightArrow} ${styles.spotlightArrowLeft}`} onClick={goPrev} aria-label='Previous image'>
            ←
          </button>
          <button className={`${styles.spotlightArrow} ${styles.spotlightArrowRight}`} onClick={goNext} aria-label='Next image'>
            →
          </button>
          <div className={styles.spotlightDots}>
            {images.map((_, i) => (
              <button
                key={i}
                aria-label={`Image ${i + 1}`}
                className={`${styles.spotlightDot} ${
                  i === active ? styles.spotlightDotActive : ''
                }`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/* ─── Spotlight panel ────────────────────────────────────────────────────────*/

function SpotlightPanel ({ project }: { project: Project }) {
  return (
    <motion.div
      key={project.id}
      className={styles.spotlightPanel}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <SpotlightImage images={project.images} title={project.title} isMobile={project.type === 'mobile'} />

      <div className={styles.spotlightBody}>
        <div className={styles.spotlightMeta}>
          <span className={styles.spotlightYear}>{project.year}</span>
          <div className={styles.spotlightLinkRow}>
            {project.url && (
              <a
                href={project.url}
                target='_blank'
                rel='noopener noreferrer'
                className={styles.spotlightLink}
                onClick={e => e.stopPropagation()}
              >
                Live ↗
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target='_blank'
                rel='noopener noreferrer'
                className={styles.spotlightLink}
                onClick={e => e.stopPropagation()}
              >
                Repo ↗
              </a>
            )}
          </div>
        </div>

        <h3 className={styles.spotlightTitle}>{project.title}</h3>
        <p className={styles.spotlightDesc}>{project.description}</p>

        <div className={styles.spotlightTags}>
          {project.tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Project list item ──────────────────────────────────────────────────────*/

function ProjectListItem ({
  project,
  index,
  isActive,
  onClick,
}: {
  project: Project
  index: number
  isActive: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      className={`${styles.listItem} ${isActive ? styles.listItemActive : ''}`}
      onClick={onClick}
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Active bar */}
      <motion.div
        className={styles.listActiveBar}
        initial={false}
        animate={{ scaleY: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />

      <span className={styles.listNum}>
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className={styles.listContent}>
        <span className={styles.listTitle}>{project.title}</span>
        <span className={styles.listSub}>
          {project.tags.slice(0, 2).join(' · ')}
        </span>
      </div>

      <span className={styles.listYear}>{project.year}</span>
    </motion.button>
  )
}

/* ─── Main export ────────────────────────────────────────────────────────────*/

export default function BentoGrid () {
  const defaultId =
    (projects.find(p => p.size === 'featured') ?? projects[0]).id
  const [spotlightId, setSpotlightId] = useState(defaultId)
  const spotlight = projects.find(p => p.id === spotlightId) ?? projects[0]

  return (
    <div className={styles.showcase}>
      {/* Left — spotlight */}
      <div className={styles.spotlightWrap}>
        <AnimatePresence mode='wait'>
          <SpotlightPanel key={spotlightId} project={spotlight} />
        </AnimatePresence>
      </div>

      {/* Right — project selector */}
      <div className={styles.selectorWrap}>
        <span className={styles.selectorLabel}>All projects</span>
        <div className={styles.selectorList}>
          {projects.map((project, i) => (
            <ProjectListItem
              key={project.id}
              project={project}
              index={i}
              isActive={project.id === spotlightId}
              onClick={() => setSpotlightId(project.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
