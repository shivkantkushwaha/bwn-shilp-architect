'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Project, ProjectCategory } from '@/data/projects';
import { ProjectImage } from '@/components/ProjectImage';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';

interface ProjectsFilterClientProps {
  initialProjects: Project[];
  categories: ProjectCategory[];
}

export function ProjectsFilterClient({ initialProjects, categories }: ProjectsFilterClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredProjects = selectedCategory === 'All'
    ? initialProjects
    : initialProjects.filter((p) => p.category === selectedCategory);

  return (
    <div>
      {/* Sticky Filter Bar on Mobile */}
      <div className="sticky top-14 sm:top-16 lg:static z-20 bg-paper/95 backdrop-blur-md py-3 -mx-4 px-4 sm:mx-0 sm:px-0 mb-8 sm:mb-12 border-b border-hairline">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar snap-x font-mono text-xs">
          <span className="text-ink-soft uppercase text-[10px] tracking-widest mr-1 hidden lg:inline shrink-0">
            FILTER BY TYPOLOGY:
          </span>
          <button
            type="button"
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2.5 uppercase tracking-wider transition-all min-h-[44px] shrink-0 snap-start active:scale-98 ${
              selectedCategory === 'All'
                ? 'bg-ink text-paper font-semibold'
                : 'bg-paper border border-hairline text-ink-soft hover:border-ink hover:text-ink'
            }`}
          >
            All Projects ({initialProjects.length})
          </button>
          {categories.map((cat) => {
            const count = initialProjects.filter((p) => p.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                type="button"
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 uppercase tracking-wider transition-all min-h-[44px] shrink-0 snap-start active:scale-98 ${
                  isSelected
                    ? 'bg-ink text-paper font-semibold'
                    : 'bg-paper border border-hairline text-ink-soft hover:border-ink hover:text-ink'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project, idx) => (
          <article
            key={project.slug}
            className="border border-hairline bg-paper-deep flex flex-col justify-between group hover:border-ink transition-colors"
          >
            {/* Drawing Sheet Card Header */}
            <div className="p-3 border-b border-hairline flex items-center justify-between font-mono text-[10px] text-ink-soft uppercase tracking-wider">
              <span>PLATE 0{idx + 1}</span>
              <span className="text-brass font-medium">{project.category}</span>
            </div>

            {/* Image */}
            <Link href={`/projects/${project.slug}`} className="block overflow-hidden relative aspect-[3/2] active:opacity-95">
              <ProjectImage
                src={project.images[0]}
                alt={project.alt}
                title={project.title}
                aspectRatio="3/2"
              />
            </Link>

            {/* Content Body */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-light text-ink group-hover:text-brass-deep transition-colors mb-2">
                  <Link href={`/projects/${project.slug}`}>
                    {project.title}
                  </Link>
                </h3>
                <p className="font-body text-xs sm:text-sm text-ink-soft leading-relaxed mb-4">
                  {project.summary}
                </p>

                {/* Features Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.features.slice(0, 3).map((feature, fIdx) => (
                    <span
                      key={fIdx}
                      className="font-mono text-[10px] bg-paper px-2 py-1 border border-hairline text-ink-soft"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Link with 44px min-height target */}
              <div className="pt-3 border-t border-hairline flex items-center justify-between font-mono text-xs">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-brass-deep hover:text-ink transition-colors uppercase font-medium min-h-[44px]"
                >
                  <span>Explore drawing</span>
                  <ArrowRightIcon size={12} />
                </Link>
                {project.placeholder && (
                  <span className="text-[10px] text-ink-soft/70 uppercase">Concept</span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
