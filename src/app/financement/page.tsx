"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, CreditCard, Car, Settings, FileText, Users, Calculator } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const FinancementPage: React.FC = () => {
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


  const financingOptions = [
    {
      title: "Prêt Auto Standard",
      description: "Financement classique avec des taux compétitifs et des durées flexibles de 12 à 84 mois.",
      icon: CreditCard,
      features: [
        "Taux d'intérêt avantageux",
        "Durée de remboursement flexible",
        "Pas de pénalité de remboursement anticipé",
        "Montant de financement jusqu'à 50 000 $"
      ],
      color: "var(--color-primary)"
    },
    {
      title: "Location avec Option d'Achat",
      description: "Profitez d'une voiture neuve avec des mensualités réduites et la possibilité d'achat en fin de contrat.",
      icon: Car,
      features: [
        "Mensualités plus basses",
        "Option d'achat à la fin du contrat",
        "Garantie véhicule neuf",
        "Possibilité de changer de véhicule régulièrement"
      ],
      color: "var(--color-primary-light)"
    },
    {
      title: "Financement Flexible",
      description: "Solutions adaptées pour les situations particulières avec des options de paiement personnalisées.",
      icon: Settings,
      features: [
        "Acceptation plus facile",
        "Plans de paiement personnalisés",
        "Possibilité de reporter des paiements",
        "Refinancement possible"
      ],
      color: "var(--color-primary-dark)"
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const processSteps = [
    {
      step: 1,
      title: "Évaluation Financière",
      description:
        "Analyse complète de votre situation financière pour déterminer la meilleure option.",
      icon: Calculator,
    },
    {
      step: 2,
      title: "Choix du Programme",
      description:
        "Sélection du programme de financement le plus adapté à vos besoins.",
      icon: CheckCircle,
    },
    {
      step: 3,
      title: "Documentation",
      description: "Préparation et signature des documents nécessaires.",
      icon: FileText,
    },
    {
      step: 4,
      title: "Approbation",
      description:
        "Validation rapide de votre dossier par nos partenaires financiers.",
      icon: Users,
    },
  ];

  return (
    <div>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative w-full h-screen">
          <div
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ease-out ${
              imageLoaded ? "filter-none" : "filter blur-sm scale-105"
            }`}
            style={{
              backgroundImage: "url('/HeroSection.jpg')",
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Content */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--color-primary)] mb-6">
                Financement
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-gray-200 mb-8 font-light">
                Des options de financement flexibles et adaptées à votre budget
              </p>
            </motion.div>
          </div>
        </section>

        {/* Financing Options Section */}
        <section className="py-20 md:py-24 lg:py-28 bg-[var(--color-background)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-semibold mb-4">
                Solutions Flexibles
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-primary)] mb-4">
                Nos Options de Financement
              </h2>
              <p className="text-xl text-[var(--color-text)] max-w-3xl mx-auto">
                Découvrez nos solutions adaptées à vos besoins
              </p>
            </div>

            <div className="space-y-16">
              {financingOptions.map((option, index) => (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`flex flex-col lg:flex-row items-center gap-12 ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Visual Section */}
                  <div className="flex-shrink-0 lg:w-1/3">
                    <div className="relative">
                      {/* Background Circle */}
                      <div
                        className="w-48 h-48 rounded-full opacity-20 absolute inset-0 "
                        style={{ backgroundColor: option.color }}
                      />
                      {/* Icon Container */}
                      <div className="relative z-10 w-48 h-48 rounded-full border-4 border-[var(--color-primary)]/30 flex items-center justify-center bg-[var(--color-background)]/80 backdrop-blur-sm">
                        <div
                          className="w-20 h-20 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: option.color }}
                        >
                          <option.icon className="w-10 h-10 text-[var(--color-background)]" />
                        </div>
                      </div>
                      {/* Decorative Elements */}
                      <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-[var(--color-primary)]/20"></div>
                      <div className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full bg-[var(--color-primary)]/10"></div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 text-center lg:text-left">
                    <div className="mb-6">
                      <span className="inline-block px-4 py-2 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-semibold mb-4">
                        Option {index + 1}
                      </span>
                      <h3 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">
                        {option.title}
                      </h3>
                      <p className="text-lg text-[var(--color-text)] opacity-90 leading-relaxed">
                        {option.description}
                      </p>
                    </div>

                    {/* Features Grid */}
                    <motion.div
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      {option.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          variants={itemVariants}
                          className="flex items-center gap-3 p-3 rounded-lg bg-[var(--color-background-light)]/50 hover:bg-[var(--color-background-light)] transition-shadow duration-300"
                        >
                          <CheckCircle className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0" />
                          <span className="text-[var(--color-text)] font-medium">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 md:py-24 lg:py-28 bg-[var(--color-background-transparent)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[var(--color-primary)] mb-4">
                Notre Processus
              </h2>
              <p className="text-xl text-[var(--color-text)] max-w-3xl mx-auto">
                Simple, rapide et transparent
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {/* Connecting Lines - Desktop Only */}
              <div className="hidden lg:block absolute top-10 left-0 right-0 h-0.5 bg-[var(--color-primary)]/30 -translate-y-1/2">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-primary)]/30 to-transparent"></div>
              </div>

              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center relative z-10 flex flex-col"
                >
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-[var(--color-primary)] flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <step.icon className="w-10 h-10 text-[var(--color-background)]" />
                    </div>
                  </div>

                  <div className="bg-[var(--color-background-light)] rounded-2xl p-6 ring-1 ring-white/10 shadow-lg flex-1 flex flex-col justify-between min-h-[200px]">
                    <div>
                      <div className="text-4xl font-bold text-[var(--color-primary)] mb-2">
                        {step.step}
                      </div>
                      <h3 className="text-xl font-semibold text-[var(--color-text)] mb-3">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-[var(--color-text)] opacity-80">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FinancementPage;
