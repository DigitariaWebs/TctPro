import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import UsedVehiclesSection from "@/components/sections/UsedVehiclesSection";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <UsedVehiclesSection />
      </main>
      <Footer />
    </div>
  );
}
