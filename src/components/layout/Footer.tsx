"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[var(--color-background)] text-[var(--color-text)] pt-16 pb-8">
      {/* Accent border at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-primary)]"></div>
      
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Logo & About */}
          <div className="flex flex-col">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/Logo.png"
                alt="TIGERBEC CARS INC."
                width={200}
                height={200}
                className="h-16 w-auto"
              />
            </Link>
            <p className="mb-4 text-sm leading-relaxed">
              Centre automobile complet offrant vente de véhicules, service d&apos;entretien, 
              detailing et customisation pour une expérience automobile complète depuis plus de 10 ans.
            </p>
            <div className="flex space-x-4 mt-2">
              <Link 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors duration-300"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors duration-300"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors duration-300"
              >
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Navigation Rapide</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Accueil" },
                { href: "/vehicules", label: "Véhicules d'occasion" },
                { href: "/financement", label: "Financement" },
                { href: "/#a-propos", label: "À Propos" },
                { href: "/service", label: "Service et entretien" },
                { href: "/contact", label: "Contact" },
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="inline-block text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors duration-300 group"
                  >
                    <span className="flex items-center">
                      <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">›</span>
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
                { label: "Vente de véhicules" },
                { label: "Entretien et réparation" },
                { label: "Detailing professionnel" },
                { label: "Customisation" },
                { label: "Financement automobile" },
                { label: "Conseil d'achat" },
              ].map((service, index) => (
                <li key={index} className="flex items-center text-[var(--color-text)]">
                  <span className="text-[var(--color-primary)] mr-2">•</span>
                  {service.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Contactez-nous</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-[var(--color-primary)] mt-1 mr-3 flex-shrink-0" />
                <span>11770 5e Avenue, Montréal, QC H1E 2X4</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-[var(--color-primary)] mr-3 flex-shrink-0" />
                <a 
                  href="tel:+15144943795" 
                  className="hover:text-[var(--color-primary)] transition-colors duration-300"
                >
                  (514) 494-3795
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-[var(--color-primary)] mr-3 flex-shrink-0" />
                <a 
                  href="mailto:info@tigerbecars.ca" 
                  className="hover:text-[var(--color-primary)] transition-colors duration-300"
                >
                  info@tigerbecars.ca
                </a>
              </li>
              <li className="flex items-start">
                <Clock size={18} className="text-[var(--color-primary)] mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p>Lun - Ven: 9h à 18h</p>
                  <p>Sam: 10h à 16h</p>
                  <p>Dim: Fermé</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section with copyright and policy links */}
        <div className="pt-6 border-t border-[var(--color-primary-dark)]/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">
              © {currentYear} TIGERBEC CARS INC. (TCT Pro) | Tous droits réservés
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link 
                href="/politique-confidentialite"
                className="hover:text-[var(--color-primary)] transition-colors duration-300"
              >
                Politique de confidentialité
              </Link>
              <Link 
                href="/conditions-utilisation"
                className="hover:text-[var(--color-primary)] transition-colors duration-300"
              >
                Conditions d&apos;utilisation
              </Link>
              <Link 
                href="/mentions-legales"
                className="hover:text-[var(--color-primary)] transition-colors duration-300"
              >
                Mentions légales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
