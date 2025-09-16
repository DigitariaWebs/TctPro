import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import UsedVehiclesSection from "@/components/sections/UsedVehiclesSection";

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <AboutSection />
      <UsedVehiclesSection />
    </div>
  );
}
