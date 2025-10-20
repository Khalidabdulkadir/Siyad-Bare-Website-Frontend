import HeroSection from "@/components/HeroSection";
import TimelinePreview from "@/components/TimelinePreview";
import AboutPreview from "@/components/AboutPreview";
import HistoricalGallery from "@/components/HistoricalGallery";
import FutureProjects from "@/components/FutureProjects";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <TimelinePreview />
      <HistoricalGallery />
      <AboutPreview />
      <FutureProjects />
    </div>
  );
};

export default Home;
