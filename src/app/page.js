import About from '@/components/sections/About';
import CaseStudies from '@/components/sections/CaseStudies';
import Contact from '@/components/sections/Contact';
import Experience from '@/components/sections/Experience';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Skills from '@/components/sections/Skills';

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Services />
        <CaseStudies />
        <Contact />
      </main>
    </>
  );
}
