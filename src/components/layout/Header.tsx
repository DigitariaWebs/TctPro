"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect with proper cleanup
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside or on link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationLinks = [
    { href: "/", label: "Accueil" },
    { href: "/#vehicules", label: "Véhicules d'occasion" },
    { href: "/financement", label: "Financement" },
    { href: "/#a-propos", label: "À Propos" },
    { href: "/#services", label: "Services et Entretien" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[var(--color-background)] shadow-lg py-1"
            : "bg-[var(--color-background-transparent)] backdrop-blur-lg py-1"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center z-50"
              onClick={closeMobileMenu}
            >
              <Image
                src="/Logo.png"
                alt="TCT Pro - TIGERBEC CARS INC."
                width={460}
                height={460}
                className="h-12 sm:h-14 w-auto hover:opacity-80 transition-opacity duration-300"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationLinks.map((link, index) => (
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

            <div className="flex items-center space-x-4">
              {/* Contact Button - Hidden on mobile, visible on desktop */}
              <Link
                href="/#contact"
                className="hidden lg:block bg-[var(--color-primary)] text-[var(--color-text-dark)] px-6 py-2 rounded-lg font-semibold 
                         hover:bg-[var(--color-primary-light)] transform hover:scale-105 transition-all 
                         duration-300 shadow-md hover:shadow-[var(--shadow-primary)] active:scale-95"
              >
                Contact
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-background-light)] transition-colors duration-300"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-[var(--color-background)] shadow-2xl transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
            <span className="text-lg font-semibold text-[var(--color-text)]">
              Menu
            </span>
            <button
              onClick={closeMobileMenu}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-background-light)] transition-colors duration-300"
              aria-label="Close mobile menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex-1 py-4">
            {navigationLinks.map((link, index) => (
              <Link
                key={`mobile-${link.href}-${index}`}
                href={link.href}
                onClick={closeMobileMenu}
                className={`block px-4 py-3 text-base font-medium transition-colors duration-300 border-l-4 ${
                  pathname === link.href
                    ? "text-[var(--color-primary)] bg-[var(--color-background-light)] border-[var(--color-primary)]"
                    : "text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-background-light)] border-transparent"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Contact Button */}
          <div className="p-4 border-t border-[var(--color-border)]">
            <Link
              href="/#contact"
              onClick={closeMobileMenu}
              className="block w-full text-center bg-[var(--color-primary)] text-[var(--color-text-dark)] px-6 py-3 rounded-lg font-semibold 
                       hover:bg-[var(--color-primary-light)] transition-all duration-300 shadow-md"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
