import Hero from "@/components/Hero";
import AnnouncementsMarquee from "@/components/AnnouncementsMarquee";
import PillarsSection from "@/components/PillarsSection";
import AboutSection from "@/components/AboutSection";
import SpeakersSection from "@/components/SpeakersSection";
import ThemesSection from "@/components/ThemesSection";
import FWCSection from "@/components/FWCSection";
import HappeningsSection from "@/components/HappeningsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import SponsorsSection from "@/components/SponsorsSection";
import TresconSection from "@/components/TresconSection";

export default function Home() {
  return (
    <>
      <Hero />
      <AnnouncementsMarquee />
      <SpeakersSection />
      <AboutSection />
      <ThemesSection />
      <FWCSection />
      <HappeningsSection />
      <TestimonialsSection />
      <SponsorsSection />
      <PillarsSection />
      <TresconSection />
    </>
  );
}
