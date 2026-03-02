import ProjectCard from '@/components/project-card/project-card';
import { projects } from '@/constants/projects';

export default function ProjectSection() {
  const homeProjects = projects.filter(
    (p) => p.title === 'Resume Craft' || p.title === 'useHttpRequest',
  );
  return (
    <section id="projects" className="w-full py-24 px-6 max-w-7xl mx-auto">
      <div className="space-y-4 mb-16 text-left">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
          Featured Projects
        </h2>
        <p className="text-muted-foreground text-lg max-w-md font-medium">
          A selection of recent projects showcasing practical problem-solving
          and production-ready architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {homeProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
