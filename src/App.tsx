import AnimatedBackground from './components/AnimatedBackground';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MarqueeTicker from './components/MarqueeTicker';
import AboutSection from './components/AboutSection';
import CursorTrailSection from './components/CursorTrailSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import AchievementsSection from './components/AchievementsSection';
import ExperienceSection from './components/ExperienceSection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import SocialFloat from './components/SocialFloat';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

export default function App() {
  return (
    <div className="bg-dark text-white min-h-screen relative">
      <AnimatedBackground />
      <CustomCursor />
      <SocialFloat />
      <Navbar />
      <HeroSection />
      <MarqueeTicker />
      <AboutSection />
      <SkillsSection />
      <MarqueeTicker />
      <ProjectsSection />
      <AchievementsSection />
      <CursorTrailSection />
      <ExperienceSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <Chatbot />
    </div>
  );
}
