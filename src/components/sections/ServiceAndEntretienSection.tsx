'use client';

import React from 'react';
import { motion } from "framer-motion";

// Animation variants for cards
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.25, 0.25, 0.75] as const, // Custom cubic-bezier easing
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as const, // easeOutQuart equivalent
    },
  },
};

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const iconVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as const, // easeOutQuart equivalent
    },
  },
};

// Structure de données des services - facilement modifiable par l'équipe
const servicesData = [
  {
    id: "used-vehicles",
    title: "Vente de Véhicules d'Occasion",
    description: "Inventaire étendu avec options de financement.",
    bullets: [
      "Historique du véhicule vérifié",
      "Évaluation sur place",
      "Assistance pour échange",
    ],
    ctaText: "Voir l'Inventaire",
    ctaHref: "/used-vehicles",
    icon: "car",
  },
  {
    id: "maintenance-repair",
    title: "Entretien et Réparation Automobile",
    description: "Service mécanique complet et diagnostics.",
    bullets: [
      "Entretien de routine",
      "Freins et suspension",
      "Moteur et transmission",
    ],
    ctaText: "Réserver un Service",
    ctaHref: "/book-service",
    icon: "wrench",
  },
  {
    id: "detailing",
    title: "Services de Détaillage Professionnel",
    description:
      "Restaurer l'éclat de salle d'exposition intérieur et extérieur.",
    bullets: [
      "Nettoyage intérieur en profondeur",
      "Décontamination de la peinture",
      "Options céramique/protectrices",
    ],
    ctaText: "Obtenir un Devis",
    ctaHref: "/get-quote",
    icon: "sparkles",
  },
  {
    id: "customization",
    title: "Personnalisation de Véhicules",
    description: "Personnaliser le style et les performances.",
    bullets: [
      "Roues/pneus",
      "Pelliculages/teintes",
      "Kits carrosserie et aéro",
    ],
    ctaText: "Personnaliser Ma Voiture",
    ctaHref: "/customization",
    icon: "cog",
  },
  {
    id: "consultation",
    title: "Consultation Automobile",
    description: "Conseils d'experts pour des décisions éclairées.",
    bullets: [
      "Conseils d'achat",
      "Planification d'entretien",
      "Coût de possession",
    ],
    ctaText: "Parler à un Expert",
    ctaHref: "/consultation",
    icon: "chat",
  },
  {
    id: "transportation",
    title: "Services de Transport de Véhicules",
    description: "Transport et logistique fiables pour voitures d'occasion.",
    bullets: [
      "Options fermées/ouvertes",
      "Livraison intercités",
      "Support de planification",
    ],
    ctaText: "Organiser le Transport",
    ctaHref: "/transport",
    icon: "truck",
  },
];

// Icon components - minimal outline style
const IconComponents = {
  car: () => (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 17a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM22 17a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM4 12H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2M4 12v5h12v-5M4 12l2-5h12l2 5"
      />
    </svg>
  ),
  wrench: () => (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
      />
    </svg>
  ),
  sparkles: () => (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M5 3l1.5 1.5L5 6 3.5 4.5 5 3zM12 3l1.5 1.5L12 6l-1.5-1.5L12 3zM5 12l1.5 1.5L5 15l-1.5-1.5L5 12zM19 3l1.5 1.5L19 6l-1.5-1.5L19 3zM19 12l1.5 1.5L19 15l-1.5-1.5L19 12zM12 12l3 3-3 3-3-3 3-3z"
      />
    </svg>
  ),
  cog: () => (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
  chat: () => (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  ),
  truck: () => (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 18V6a2 2 0 012-2h4a2 2 0 012 2v12M8 18a2 2 0 104 0M8 18H6a2 2 0 01-2-2V8a2 2 0 012-2h2M16 18a2 2 0 104 0m0 0a2 2 0 002-2V8a2 2 0 00-2-2h-2"
      />
    </svg>
  ),
};

// Service Card Component
const ServiceCard = ({ service }: { service: (typeof servicesData)[0] }) => {
  const IconComponent =
    IconComponents[service.icon as keyof typeof IconComponents];

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, amount: 0.3 }}
      className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-amber-500/30 transition-colors duration-300 hover:shadow-xl hover:shadow-amber-500/10 h-full flex flex-col"
    >
      {/* Icon */}
      <motion.div
        variants={iconVariants}
        className="flex items-center justify-center w-16 h-16 rounded-xl bg-slate-700/50 mb-6 group-hover:bg-amber-500/10 transition-colors duration-300 flex-shrink-0"
      >
        <div className="text-slate-400 group-hover:text-amber-400 transition-colors duration-300">
          <IconComponent />
        </div>
      </motion.div>

      {/* Content - Flex grow to fill available space */}
      <div className="flex flex-col flex-grow">
        {/* Title with consistent height */}
        <motion.h3
          className="text-xl font-semibold text-slate-100 group-hover:text-white transition-colors duration-300 mb-4 min-h-[3.5rem] flex items-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          {service.title}
        </motion.h3>

        {/* Description with consistent height */}
        <motion.p
          className="text-slate-400 leading-relaxed mb-6 min-h-[3rem] flex items-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
        >
          {service.description}
        </motion.p>

        {/* Bullets - Flex grow to take available space */}
        <motion.ul
          className="space-y-2 flex-grow mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
        >
          {service.bullets.map((bullet, index) => (
            <motion.li
              key={index}
              className="flex items-start text-sm text-slate-300"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-3 flex-shrink-0 mt-2"></div>
              <span className="leading-relaxed">{bullet}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
};

// Main Services Component
const ServicesTCTPro = () => {
  return (
    <section
      id="services"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-slate-900"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
            <div className="w-1 h-1 rounded-full bg-amber-400 mr-2"></div>
            <span className="text-amber-400 text-sm font-medium">
              Montréal • 35+ Ans • Partenaire Auto Complet •
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Services et Entretien
            <span className="block text-amber-400">Automobiles Complets</span>
          </h2>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            De la vente au service, de la personnalisation à la
            consultation—votre partenaire de confiance pour tous vos besoins
            automobiles à Montréal.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 items-stretch"
        >
          {servicesData.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>

        {/* Trust Strip */}
        <div className="border-t border-slate-700/50 pt-12 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-white">
                Financement Disponible
              </h4>
              <p className="text-slate-400 text-sm">
                Options de paiement flexibles pour tous les services
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-white">
                Techniciens Licenciés
              </h4>
              <p className="text-slate-400 text-sm">
                Professionnels certifiés en qui vous pouvez avoir confiance
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-white">Options de Garantie</h4>
              <p className="text-slate-400 text-sm">
                Couverture complète pour votre tranquillité d&apos;esprit
              </p>
            </div>
          </div>
        </div>

        {/* Sticky Mini-CTA Row */}
        <div className="sticky bottom-8 z-10">
          <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <span className="text-slate-300 font-medium">
                Prêt à commencer?
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="/used-vehicles"
                  className="inline-flex items-center px-6 py-2.5 bg-amber-500 text-slate-900 rounded-lg font-semibold text-sm hover:bg-amber-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-800"
                  aria-label="Voir notre inventaire de véhicules d'occasion"
                >
                  Voir l&apos;Inventaire
                </a>
                <a
                  href="/financement"
                  className="inline-flex items-center px-6 py-2.5 bg-transparent border border-amber-500 text-amber-400 rounded-lg font-semibold text-sm hover:bg-amber-500 hover:text-slate-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-800"
                  aria-label="Explorer nos options de financement"
                >
                  Options de Financement
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center px-6 py-2.5 bg-transparent border border-amber-500 text-amber-400 rounded-lg font-semibold text-sm hover:bg-amber-500 hover:text-slate-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-800"
                  aria-label="Nous contacter pour plus d'informations"
                >
                  Nous Contacter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesTCTPro;
