'use client';

import CTAsection from '@/components/cta-section/cta-section';
import ProjectCard from '@/components/project-card/project-card';
import { projectsCTA } from '@/constants/cta-data';
import { projectData } from '@/constants/projects-data';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { motion } from 'motion/react';

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
            tools. I build Production-ready systems built with clear
            architecture, automated CI/CD validation, and long-term
            maintainability.
          </p>
        </div>
      </header>

      {/* --- CATEGORY AND SORT BY FILTER --- */}
      <section className="flex flex-col items-end justify-center gap-3 md:flex-row md:justify-between md:items-center mb-12">
        <h3 className="font-bold mr-8 md:mr-0">Filter Projects</h3>
        <div className="flex flex-col gap-6 md:flex-row md:justify-end items-end md:items-center">
          {/* Category Filter */}
          <div className="flex flex-col items-start justify-center md:flex-row md:items-center gap-3">
            <Label
              htmlFor="project-category"
              className="whitespace-nowrap font-semibold"
            >
              Category:
            </Label>
            <Select value={activeCategory} onValueChange={setActiveCategory}>
              <SelectTrigger
                className="w-35 sm:w-45 border border-foreground/10 bg-accent/40 hover:bg-accent/70 hover:border-foreground/20 transition-all duration-300 ease-in-out"
                id="project-category"
              >
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Sort By Filter */}
          <div className="flex flex-col items-start justify-center md:flex-row md:items-center gap-3">
            <Label
              htmlFor="project-sort-by"
              className="whitespace-nowrap font-semibold"
            >
              Sort by:
            </Label>
            <Select value={projectSortBy} onValueChange={setProjectSortBy}>
              <SelectTrigger
                className="w-35 sm:w-45 border border-foreground/10 bg-accent/40 hover:bg-accent/70 hover:border-foreground/20 transition-all duration-300 ease-in-out"
                id="project-sort-by"
              >
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort by</SelectLabel>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <motion.section layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sortedProjects.length > 0 ? (
          sortedProjects.map((project, index) => (
            <ProjectCard
              key={`${project.id}-${activeCategory}-${projectSortBy}`}
              project={project}
              loading="eager"
              index={index}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg text-muted-foreground">
              No System found for this category yet.
            </p>
          </div>
        )}
      </motion.section>

      <CTAsection {...projectsCTA} />
    </section>
  );
}
