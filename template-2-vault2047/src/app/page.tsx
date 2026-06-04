import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Speakers from "@/components/Speakers";
import Themes from "@/components/Themes";
import Experience from "@/components/Experience";
import Partners from "@/components/Partners";
import Testimonials from "@/components/Testimonials";
import Roadmap from "@/components/Roadmap";
import Media from "@/components/Media";
import Register from "@/components/Register";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/LenisProvider";

import {
  getActiveSpeakers,
  getActivePartners,
  getActiveTestimonials,
  getActiveBlogs,
} from "@/lib/db";

export default function Home() {
  const speakers = getActiveSpeakers();
  const partners = getActivePartners();
  const testimonials = getActiveTestimonials();
  const blogs = getActiveBlogs();

  return (
    <LenisProvider>
      <Navbar />
      <Hero />
<About />
      <Speakers initialSpeakers={speakers} />
      <Themes />
      <Experience />
      <Partners initialPartners={partners} />
      <Testimonials initialTestimonials={testimonials} />
      <Roadmap />
      <Media initialBlogs={blogs} />
      <Register />
      <Footer />
    </LenisProvider>
  );
}
