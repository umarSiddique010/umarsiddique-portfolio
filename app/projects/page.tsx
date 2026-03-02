import CTAsection from '@/components/cta-section/cta-section';
import ProjectCard from '@/components/project-card/project-card';
import { projectsCTA } from '@/constants/cta-data';
import { projects } from '@/constants/projects';

export default function Projects() {
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

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </section>

      <CTAsection {...projectsCTA} />
    </section>
  );
}
