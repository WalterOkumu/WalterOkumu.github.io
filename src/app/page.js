import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Services from '../components/sections/Services';
import Experience from '../components/sections/Experience';
import CaseStudies from '../components/sections/CaseStudies';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Experience />
        <CaseStudies />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}