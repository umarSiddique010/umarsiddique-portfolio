'use client';

import CTAsection from '@/components/cta-section/cta-section';
import ProjectCard from '@/components/project-card/project-card';
import { projectsCTA } from '@/constants/cta-data';
import { projectData } from '@/constants/projects-data';
import clsx from 'clsx';
import { useState } from 'react';

const categories = [
  'All',
  ...new Set(projectData.map((project) => project.category).reverse()),
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [projectSortBy, setProjectSortBy] = useState<string>('newest');
  const filteredProjects =
    activeCategory === 'All'
      ? projectData
      : projectData.filter(
          (project) =>
            project.category.toUpperCase() === activeCategory.toUpperCase(),
        );

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    const aId = Number(a.id);
    const bId = Number(b.id);
    return projectSortBy === 'newest' ? bId - aId : aId - bId;
  });

  return (
    <section className="w-full max-w-6xl mx-auto px-4 pt-20 -pb-20 md:pt-32 md:-pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Engineered Systems.
          </h1>
          <p className="text-lg text-muted-foreground">
            From privacy-first React applications to zero-dependency open-source
            tools. Production-ready systems built with clear architecture,
            automated CI/CD validation, and long-term maintainability.
          </p>
        </div>
      </header>

      {/* --- CATEGORY AND SORT BY FILTER BUTTONS --- */}
      <section className="flex flex-col gap-5 md:flex-row md:justify-between items-center mb-12">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={clsx(
                'px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border',
                activeCategory === category
                  ? 'bg-foreground text-background border-foreground shadow-lg'
                  : 'bg-foreground/5 text-muted-foreground border-foreground/10 hover:border-foreground/30 hover:bg-foreground/10',
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <label
          htmlFor="project-sort-by"
          className="flex items-center gap-2 ml-auto sm:ml-0"
        >
          Sort by:
          <select
            name="project-sort-by"
            id="project-sort-by"
            value={projectSortBy}
            onChange={(e) => setProjectSortBy(e.target.value)}
            className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 border"
          >
            <option disabled value="">
              Select
            </option>

            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </label>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sortedProjects.map((project, index) => (
          <ProjectCard
            key={`${project.id}-${activeCategory}-${projectSortBy}`}
            project={project}
            index={index}
          />
        ))}
      </section>

      <CTAsection {...projectsCTA} />
    </section>
  );
}
