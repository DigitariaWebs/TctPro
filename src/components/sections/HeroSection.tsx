"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const HeroSection: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/HeroSection.jpg";
    img.onload = () => {
      setImageLoaded(true);
    };

    // Fallback in case image takes too long to load
    const timeout = setTimeout(() => {
      setImageLoaded(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative w-full h-auto md:h-screen pt-16 md:pt-0">
      {/* Mobile: Image container with aspect ratio, Desktop: Full screen */}
      <div className="relative w-full h-auto aspect-video md:w-full md:h-full md:aspect-auto">
        {/* Background Image */}
        <div
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ease-out ${
            imageLoaded ? "filter-none" : "filter blur-sm scale-105"
          }`}
          style={{
            backgroundImage: "url('/HeroSection.jpg')",
          }}
        />

        {/* Overlay Grid - matches image dimensions exactly */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
          {/* Top Left Quadrant - Inventaire neuf */}
          <Link
            href="/used-vehicles"
            className="relative flex items-center justify-center border-r border-b md:border-r-3 md:border-b-3 border-white/80 bg-black/30 hover:bg-white/20 hover:shadow-2xl hover:text-gray-100 transition-all duration-300 cursor-pointer"
          >
            <div className="text-center">
              <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-white tracking-wide">
                Véhicules d&apos;occasion
              </h2>
            </div>
          </Link>

          {/* Top Right Quadrant - Inventaire d'occasion */}
          <Link
            href="/financement"
            className="relative flex items-center justify-center border-l border-b md:border-l-3 md:border-b-3 border-white/80 bg-black/30 hover:bg-white/20 hover:shadow-2xl hover:text-gray-100 transition-all duration-300 cursor-pointer"
          >
            <div className="text-center">
              <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-white tracking-wide">
                Financement
              </h2>
            </div>
          </Link>

          {/* Bottom Left Quadrant - Rendez-vous au service */}
          <Link
            href="/#a-propos"
            className="relative flex items-center justify-center border-r border-t md:border-r-3 md:border-t-3 border-white/80 bg-black/30 hover:bg-white/20 hover:shadow-2xl hover:text-gray-100 transition-all duration-300 cursor-pointer"
          >
            <div className="text-center">
              <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-white tracking-wide">
                À Propos
              </h2>
            </div>
          </Link>

          {/* Bottom Right Quadrant - Offres */}
          <Link
            href="/#services"
            className="relative flex items-center justify-center border-l border-t md:border-l-3 md:border-t-3 border-white/80 bg-black/30 hover:bg-white/20 hover:shadow-2xl hover:text-gray-100 transition-all duration-300 cursor-pointer"
          >
            <div className="text-center">
              <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-white tracking-wide">
                Services et Entretien
              </h2>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
