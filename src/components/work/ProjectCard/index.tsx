'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// components
import Tag from '@/components/ui/Tag'

// styles
import styles from './index.module.css'

// data
import { Project } from '@/data/projects'

interface ProjectCardProps {
  project: Project
  index: number
}

function ImageGallery ({ images, size }: { images: string[]; size: string }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return

    const t = setInterval(() => {
      setActive(i => (i + 1) % images.length)
    }, 2800)

    return () => clearInterval(t)
  }, [images.length])

  return (
    <div className={`${styles.imageArea} ${styles[`imageArea_${size}`] ?? ''}`}>
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=''
          className={`${styles.image} ${
            i === active ? styles.imageActive : ''
          }`}
        />
      ))}

      {images.length > 1 && (
        <div className={styles.dots}>
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Image ${i + 1}`}
              className={`${styles.dot} ${
                i === active ? styles.dotActive : ''
              }`}
              onClick={e => {
                e.preventDefault()
                setActive(i)
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function ProjectCard ({ project, index }: ProjectCardProps) {
  const href = project.url ?? project.repo
  const hasImages = project.images && project.images.length > 0

  return (
    <motion.a
      href={href}
      target={href ? '_blank' : undefined}
      rel='noopener noreferrer'
      className={`${styles.card} ${styles[project.size]} ${
        hasImages ? styles.hasImages : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.06
      }}
      whileHover='hovered'
    >
      {hasImages && (
        <ImageGallery images={project.images!} size={project.size} />
      )}

      <div className={styles.body}>
        <div className={styles.top}>
          <div className={styles.meta}>
            <span className={styles.year}>{project.year}</span>
            <motion.span
              className={styles.arrow}
              variants={{ hovered: { x: 3, y: -3 } }}
              transition={{ duration: 0.2 }}
            >
              ↗
            </motion.span>
          </div>

          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.description}>{project.description}</p>
        </div>

        <div className={styles.bottom}>
          <div className={styles.tags}>
            {project.tags.map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      </div>

      {!hasImages && project.size === 'featured' && (
        <div className={styles.featuredAccent} />
      )}
    </motion.a>
  )
}
