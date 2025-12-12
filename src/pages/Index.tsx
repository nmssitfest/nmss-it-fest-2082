import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SponsorsSection from '@/components/SponsorsSection';
import EventsPreview from '@/components/EventsPreview';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <SponsorsSection />
      <EventsPreview />
      <Footer />
    </div>
  );
};

export default Index;
