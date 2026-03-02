import TechMarquee from '@/components/home/tech-marquee/tech-marquee';
import HeroSection from '@/components/home/hero-section/hero-section';
import AboutSection from '@/components/home/about-section/about-section';
import CTAsection from '@/components/cta-section/cta-section';
import ProjectSection from '@/components/home/project-section/project-section';
import { homeCTA } from '@/constants/cta-data';

export default function Home() {
  return (
    <section>
      <HeroSection />
      <TechMarquee />
      <ProjectSection />
      <AboutSection />
      <CTAsection {...homeCTA} />
    </section>
  );
}
