import TechMarquee from '@/components/tech-marquee/tech-marquee';
import ProjectSection from '@/components/project-section/project-section';
import HeroSection from '@/components/hero-section/hero-section';

export default function Home() {
  return (
    <section>
      <HeroSection />
      <TechMarquee />
      <ProjectSection />
    </section>
  );
}
