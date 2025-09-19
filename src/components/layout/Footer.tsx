"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[var(--color-background)] text-[var(--color-text)] pt-16 pb-8">
      {/* Accent border at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-primary)]"></div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-12">
          {/* Column 1: Logo & About */}
          <div className="flex flex-col">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/Logo.png"
                alt="TCT Pro - Centre Automobile"
                width={200}
                height={200}
                className="h-16 w-auto"
              />
            </Link>
            <p className="mb-4 text-sm leading-relaxed">
              Centre automobile complet offrant vente de véhicules
              d&apos;occasion, service d&apos;entretien et réparation pour une
              expérience automobile complète depuis plus de 35 ans.
            </p>
          </div>

          {/* Columns 2 & 3: Navigation & Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Navigation</h3>
              <ul className="space-y-2">
                {[
                  { href: "/", label: "Accueil" },
                  { href: "/#vehicules", label: "Véhicules d'occasion" },
                  { href: "/#contact", label: "Contact" },
                ].map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="inline-block text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors duration-300 group"
                    >
                      <span className="flex items-center">
                        <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          ›
                        </span>
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Services */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Nos Services</h3>
              <ul className="space-y-2">
                {[
                  { label: "Vente de véhicules d'occasion" },
                  { label: "Entretien et réparation" },
                  { label: "Service après-vente" },
                  { label: "Évaluation de véhicules" },
                ].map((service, index) => (
                  <li
                    key={index}
                    className="flex items-center text-[var(--color-text)]"
                  >
                    <span className="text-[var(--color-primary)] mr-2">•</span>
                    {service.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section with copyright and policy links */}
        <div className="pt-6 border-t border-[var(--color-primary-dark)]/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">
              © {currentYear} TIGERBEC CARS INC. (TCT Pro) | Tous droits
              réservés
            </p>
            <div className="flex flex-wrap gap-7 text-sm">
              <Link
                href="https://facebook.com/tctpro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors duration-300"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://instagram.com/tctpro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors duration-300"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://youtube.com/@tctpro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors duration-300"
              >
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
