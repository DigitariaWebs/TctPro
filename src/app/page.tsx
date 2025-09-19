import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ShopGallerySection from "@/components/sections/ShopGallerySection";
import UsedVehiclesSection from "@/components/sections/UsedVehiclesSection";
import ContactSection from "@/components/sections/ContactSection";
import ServiceAndEntretienSection from "@/components/sections/ServiceAndEntretienSection";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ShopGallerySection />
        <UsedVehiclesSection />
        <ServiceAndEntretienSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
