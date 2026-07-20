import LandingNavbar from "@/components/landing/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import CategoriesSection from "@/components/landing/CategoriesSection";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import ForTechnicians from "@/components/landing/ForTechnicians";
import PricingSection from "@/components/landing/PricingSection";
import Testimonials from "@/components/landing/Testimonials";
import LandingFooter from "@/components/landing/LandingFooter";

export default function Home() {
  return (
    <main className="scroll-smooth">
      <LandingNavbar />
      <HeroSection />
      <HowItWorks />
      <CategoriesSection />
      <WhyChooseUs />
      <ForTechnicians />
      <PricingSection />
      <Testimonials />
      <LandingFooter />
    </main>
  );
}
