import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/HeroSection.jpg')"
        }}
      />
      
      {/* Overlay Grid */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
        
        {/* Top Left Quadrant - Inventaire neuf */}
        <div className="relative flex items-center justify-center border-r-3 border-b-3 border-white/80 bg-black/30">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-wide">
              Inventaire neuf
            </h2>
          </div>
        </div>

        {/* Top Right Quadrant - Inventaire d'occasion */}
        <div className="relative flex items-center justify-center border-l-3 border-b-3 border-white/80 bg-black/30">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-wide">
              Inventaire d&apos;occasion
            </h2>
          </div>
        </div>

        {/* Bottom Left Quadrant - Rendez-vous au service */}
        <div className="relative flex items-center justify-center border-r-3 border-t-3 border-white/80 bg-black/30">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-wide">
              Rendez-vous au service
            </h2>
          </div>
        </div>

        {/* Bottom Right Quadrant - Offres */}
        <div className="relative flex items-center justify-center border-l-3 border-t-3 border-white/80 bg-black/30">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-wide">
              Offres
            </h2>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
