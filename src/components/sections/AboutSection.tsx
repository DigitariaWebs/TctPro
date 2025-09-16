"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section
      id="a-propos"
      aria-label="À propos"
      className="relative py-12 md:py-20 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 items-center">
          {/* Image block with framed accent */}
          <div className="relative w-full md:max-w-[380px] lg:max-w-[400px] justify-self-center md:justify-self-start order-2 md:order-1 mb-8 md:mb-0 md:ml-6 lg:ml-8">
            {/* Accent rounded frame behind the image */}
            <div
              className="absolute -inset-2 sm:-inset-3 md:-inset-4 rounded-[2.25rem] md:rounded-[3.5rem] border-[6px] sm:border-[8px] md:border-[10px] opacity-60 border-[var(--color-primary)]"
              aria-hidden="true"
            />

            <motion.figure
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: 0 }}
              className="group relative z-10 overflow-hidden rounded-[2rem] md:rounded-[2.5rem] shadow-sm ring-1 ring-black/5 will-change-transform"
            >
              <Image
                src="/AboutSection.jpg"
                alt="Centre automobile TCT Pro - Station multi-services"
                width={1000}
                height={1400}
                className="w-full h-auto object-cover object-center origin-center transition-transform duration-300 group-hover:scale-105 will-change-transform"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
            </motion.figure>
          </div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
            className="relative order-1 md:order-2"
          >
            <p className="text-sm font-semibold tracking-wide">
              <span className="text-[var(--color-primary)]">
                Expertise Automobile
              </span>
            </p>
            <h2 className="mt-2 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-[var(--color-text)]">
              À Votre Service
            </h2>

            <div className="mt-4 space-y-3 text-[15px] md:text-lg leading-relaxed text-justify text-[var(--color-text)]">
              {/* Encadré storytelling */}
              <div
                className="relative rounded-2xl p-5 sm:p-6 ring-1 ring-black/5 shadow-sm overflow-hidden bg-[var(--color-background-light)] border-[var(--color-primary)]"
                aria-label="Encadré: Notre centre automobile"
              >
                <div className="absolute -inset-px rounded-[inherit] pointer-events-none shadow-[inset_0_0_0_1px_var(--color-primary-light)]" />
                <h3 className="text-xl font-bold mb-3 text-[var(--color-primary-light)]">
                  Un centre complet à votre service
                </h3>
                <p className="text-[var(--color-text)]">
                  Notre{" "}
                  <span className="font-semibold text-[var(--color-primary-light)]">
                    station multi-services
                  </span>{" "}
                  a été conçue pour répondre à tous vos besoins automobiles en
                  un seul endroit. Que vous souhaitiez entretenir votre
                  véhicule, lui redonner son éclat d&apos;origine, changer de
                  look, ou même acquérir une nouvelle voiture, notre équipe de{" "}
                  <span className="font-semibold text-[var(--color-primary)]">
                    professionnels
                  </span>{" "}
                  est là pour vous.
                </p>
                <div className="mt-3 space-y-3 text-[var(--color-text)]">
                  <p>
                    Avec plus de{" "}
                    <span className="font-semibold text-[var(--color-primary)]">
                      10 ans d&apos;expertise
                    </span>{" "}
                    dans le secteur automobile, nous mettons notre savoir-faire
                    à votre service pour vous offrir une expérience complète et
                    personnalisée.
                  </p>
                  <p>
                    De l&apos;entretien mécanique au detailing, en passant par
                    la customisation et la vente de véhicules, TCT Pro est votre
                    partenaire automobile de confiance.
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative car-themed icon in the corner */}
            <svg
              className="pointer-events-none absolute -bottom-4 right-0 w-40 md:w-56 opacity-25"
              viewBox="0 0 200 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M10 60 C 40 10, 80 110, 110 30 C 130 -10, 160 120, 190 20"
                stroke="currentColor"
                strokeWidth="2"
                className="text-[var(--color-muted)]"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
