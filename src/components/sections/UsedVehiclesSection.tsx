"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Fuel, Settings, Calendar, Heart, Star, Shield, CheckCircle } from "lucide-react";
import { featuredVehicles } from "@/Data/Cars";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
  hover: {
    y: -4,
    transition: {
      duration: 0.2,
    },
  },
};

const UsedVehiclesSection: React.FC = () => {
  return (
    <motion.section
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-background)" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.05)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              border: "1px solid rgba(245, 158, 11, 0.2)",
            }}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Shield
              className="w-4 h-4"
              style={{ color: "var(--color-primary)" }}
            />
            <span
              className="text-sm font-medium"
              style={{ color: "var(--color-primary)" }}
            >
              Véhicules Certifiés
            </span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ color: "var(--color-text)" }}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Véhicules d&apos;occasion
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-8"
            style={{ color: "var(--color-text)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Découvrez notre sélection exclusive de véhicules d&apos;occasion
            premium, tous rigoureusement inspectés selon nos standards
            d&apos;excellence
          </motion.p>
        </motion.div>

        {/* Vehicle Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 items-stretch"
          variants={containerVariants}
        >
          {featuredVehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              className="group relative overflow-hidden rounded-2xl transition-shadow duration-200 flex flex-col h-full"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(245, 158, 11, 0.2)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              }}
              variants={cardVariants}
              whileHover="hover"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}
            >

              <div className="relative overflow-hidden">
                <motion.img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-64 object-cover"
                  variants={{
                    hover: { scale: 1.05 },
                    initial: { scale: 1 },
                  }}
                  transition={{ duration: 0.1 }}
                />

                {/* Badge */}
                <motion.div
                  className="absolute top-4 left-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg backdrop-blur-sm ${
                      vehicle.isAvailable
                        ? "bg-gradient-to-r from-emerald-500 to-emerald-600 ring-1 ring-emerald-400/50"
                        : "bg-gradient-to-r from-rose-500 to-rose-600 ring-1 ring-rose-400/50"
                    }`}
                    style={{
                      boxShadow: vehicle.isAvailable
                        ? "0 2px 8px rgba(0, 0, 0, 0.1)"
                        : "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {vehicle.isAvailable ? (
                      <motion.div
                        initial={{ rotate: -90, scale: 0.5 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-100" />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ rotate: 90, scale: 0.5 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <Star className="w-4 h-4 text-rose-100" />
                      </motion.div>
                    )}
                    <span
                      className={`text-sm font-medium ${
                        vehicle.isAvailable ? "text-emerald-50" : "text-rose-50"
                      }`}
                    >
                      {vehicle.badge}
                    </span>
                  </div>
                </motion.div>
              </div>

              <div className="p-6 flex flex-col flex-1 relative">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 min-h-[3.5rem]">
                    <motion.h3
                      className="text-xl font-bold mb-2 leading-tight overflow-hidden"
                      style={{
                        color: "#ffffff",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {vehicle.name}
                    </motion.h3>
                    <motion.div
                      className="flex items-center justify-between gap-2 mb-3"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star
                            className="w-4 h-4 fill-current"
                            style={{ color: "var(--color-primary)" }}
                          />
                          <Star
                            className="w-4 h-4 fill-current"
                            style={{ color: "var(--color-primary)" }}
                          />
                          <Star
                            className="w-4 h-4 fill-current"
                            style={{ color: "var(--color-primary)" }}
                          />
                          <Star
                            className="w-4 h-4 fill-current"
                            style={{ color: "var(--color-primary)" }}
                          />
                          <Star
                            className="w-4 h-4 fill-current"
                            style={{ color: "var(--color-primary)" }}
                          />
                        </div>
                        <span className="text-sm" style={{ color: "#d1d5db" }}>
                          {vehicle.year}
                        </span>
                      </div>
                      <div
                        className="text-xl font-bold"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {vehicle.price}
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Vehicle Stats */}
                <motion.div
                  className="grid grid-cols-3 gap-4 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div
                    className="flex flex-col items-center text-center p-3 rounded-lg min-h-[4rem]"
                    style={{ backgroundColor: "rgba(245, 158, 11, 0.05)" }}
                  >
                    <Calendar
                      className="w-5 h-5 mb-1 flex-shrink-0"
                      style={{ color: "var(--color-primary)" }}
                    />
                    <span
                      className="text-xs font-medium text-center leading-tight"
                      style={{ color: "#e5e7eb" }}
                    >
                      {vehicle.mileage}
                    </span>
                  </div>
                  <div
                    className="flex flex-col items-center text-center p-3 rounded-lg min-h-[4rem]"
                    style={{ backgroundColor: "rgba(245, 158, 11, 0.05)" }}
                  >
                    <Settings
                      className="w-5 h-5 mb-1 flex-shrink-0"
                      style={{ color: "var(--color-primary)" }}
                    />
                    <span
                      className="text-xs font-medium text-center leading-tight"
                      style={{ color: "#e5e7eb" }}
                    >
                      {vehicle.transmission}
                    </span>
                  </div>
                  <div
                    className="flex flex-col items-center text-center p-3 rounded-lg min-h-[4rem]"
                    style={{ backgroundColor: "rgba(245, 158, 11, 0.05)" }}
                  >
                    <Fuel
                      className="w-5 h-5 mb-1 flex-shrink-0"
                      style={{ color: "var(--color-primary)" }}
                    />
                    <span
                      className="text-xs font-medium text-center leading-tight"
                      style={{ color: "#e5e7eb" }}
                    >
                      {vehicle.fuel}
                    </span>
                  </div>
                </motion.div>

                {/* Features */}
                <motion.div
                  className="mb-6 min-h-[3rem]"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex flex-wrap gap-2 justify-start">
                    {vehicle.features
                      .slice(0, 3)
                      .map((feature, featureIndex) => (
                        <motion.span
                          key={feature}
                          className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full border flex-shrink-0"
                          style={{
                            backgroundColor: "rgba(245, 158, 11, 0.08)",
                            borderColor: "rgba(245, 158, 11, 0.2)",
                            color: "var(--color-primary)",
                          }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: 0.8 + index * 0.1 + featureIndex * 0.05,
                            duration: 0.1,
                          }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <CheckCircle className="w-3 h-3 flex-shrink-0" />
                          {feature}
                        </motion.span>
                      ))}
                  </div>
                </motion.div>

                {/* Actions */}
                <motion.div
                  className="space-y-3 mt-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.button
                    className="w-full py-3 px-4 rounded-lg font-semibold text-center transition-all duration-75 h-12 cursor-pointer"
                    style={{
                      backgroundColor: "var(--color-primary)",
                      color: "var(--color-background)",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    Réserver un essai
                  </motion.button>
                  <motion.button
                    className="w-full py-3 px-4 rounded-lg font-semibold border-2 text-center transition-all duration-75 h-12 cursor-pointer"
                    style={{
                      borderColor: "var(--color-primary)",
                      color: "var(--color-primary)",
                      backgroundColor: "transparent",
                    }}
                    whileHover={{
                      backgroundColor: "rgba(245, 158, 11, 0.1)",
                      borderColor: "var(--color-primary)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    Voir les détails
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div className="text-center" variants={itemVariants}>
          <motion.button
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-75 group shadow-lg hover:shadow-xl cursor-pointer"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-background)",
              border: "2px solid transparent",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Voir tous nos véhicules</span>
            <motion.div
              className="flex items-center"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.button>

          {/* Additional Info */}
          <motion.div
            className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 text-sm"
            style={{ color: "var(--color-text)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle
                className="w-4 h-4 flex-shrink-0"
                style={{ color: "var(--color-primary)" }}
              />
              <span className="whitespace-nowrap">Inspection 150 points</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield
                className="w-4 h-4 flex-shrink-0"
                style={{ color: "var(--color-primary)" }}
              />
              <span className="whitespace-nowrap">Garantie incluse</span>
            </div>
            <div className="flex items-center gap-2">
              <Star
                className="w-4 h-4 flex-shrink-0"
                style={{ color: "var(--color-primary)" }}
              />
              <span className="whitespace-nowrap">Service après-vente</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default UsedVehiclesSection;
