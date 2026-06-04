import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import TopicsSection from "@/components/TopicsSection";
import SpeakersSection from "@/components/SpeakersSection";
import HappeningsSection from "@/components/HappeningsSection";
import MediaPartnersSection from "@/components/MediaPartnersSection";
import SponsorshipSection from "@/components/SponsorshipSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <SpeakersSection />
      <TopicsSection />
      <HappeningsSection />
      <SponsorshipSection />
      <MediaPartnersSection />
      <BlogSection />
      <TestimonialsSection />
    </main>
  );
}
