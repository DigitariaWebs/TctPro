"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--color-background)] shadow-lg py-1"
          : "bg-[var(--color-background-transparent)] backdrop-blur-lg py-1"
      }`}
    >
      <div className="container mx-auto px-16">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/Logo.png"
              alt="TIGERBEC CARS INC."
              width={460}
              height={460}
              className="h-16 w-auto hover:opacity-80 transition-opacity duration-300"
            />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {[
              { href: "/", label: "Accueil" },
            { href: "/#vehicules", label: "Véhicules d'occasion" },
              { href: "#", label: "Financement" },
              { href: "/#a-propos", label: "À Propos" },
              { href: "#", label: "Service et entretien" },
            ].map((link, index) => (
              <Link
                key={`${link.href}-${index}`}
                href={link.href}
                className={`relative font-medium transition-colors duration-300 group ${
                  pathname === link.href
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-text)] hover:text-[var(--color-primary)]"
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-0 bottom-0 h-0.5 bg-[var(--color-primary)] transform origin-left transition-transform duration-300 ${
                    pathname === link.href
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Contact Button */}
          <Link
            href="/#contact"
            className="bg-[var(--color-primary)] text-[var(--color-text-dark)] px-6 py-2 rounded-lg font-semibold 
                     hover:bg-[var(--color-primary-light)] transform hover:scale-105 transition-all 
                     duration-300 shadow-md hover:shadow-[var(--shadow-primary)] active:scale-95"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
