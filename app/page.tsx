import TechMarquee from '@/components/home/tech-marquee/tech-marquee';
import ProjectSection from '@/components/home/project-section/project-section';
import HeroSection from '@/components/home/hero-section/hero-section';
import AboutSection from '@/components/home/about-section/about-section';
import CTAsection from '@/components/home/cta-section/cta-section';

export default function Home() {
  return (
    <section>
      <HeroSection />
      <TechMarquee />
      <ProjectSection />
      <AboutSection />
      <CTAsection />
    </section>
  );
}
