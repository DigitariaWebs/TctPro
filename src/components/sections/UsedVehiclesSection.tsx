"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Fuel,
  Settings,
  Calendar,
  Star,
  Shield,
  CheckCircle,
} from "lucide-react";
import { featuredVehicles, Vehicle } from "@/Data/Cars";
import { useModel } from "@/components/providers/ModelProvider";
import CarDetailsModel from "@/components/models/CarDetailsModel";

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
      duration: 0.4,
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
      duration: 0.5,
    },
  },
  hover: {
    y: -4,
    transition: {
      duration: 0.1,
    },
  },
};

const UsedVehiclesSection: React.FC = () => {
  const { openModel } = useModel();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isCarDetailsOpen, setIsCarDetailsOpen] = useState(false);

  return (
    <section
      id="vehicules"
      className="py-8 md:py-20 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-background)" }}
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
        <div className="text-center mb-8 md:mb-16">
          <h2
            className="text-2xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight"
            style={{ color: "var(--color-primary)" }}
          >
            Véhicules d&apos;occasion
          </h2>

          <p
            className="text-sm md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed mb-6 md:mb-8"
            style={{ color: "var(--color-text)" }}
          >
            Découvrez notre sélection exclusive de véhicules d&apos;occasion
            premium, tous rigoureusement inspectés selon nos standards
            d&apos;excellence
          </p>
        </div>

        {/* Vehicle Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-16 items-stretch"
          variants={containerVariants}
        >
          {featuredVehicles.slice(-3).map((vehicle, index) => (
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
                    hover: {},
                    initial: { scale: 1 },
                  }}
                  transition={{ duration: 0.1 }}
                />

                {/* Badge */}
                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                    vehicle.isAvailable
                      ? "bg-green-500/90 text-white"
                      : "bg-red-500/90 text-white"
                  }`}
                >
                  {vehicle.badge}
                </div>
              </div>

              <div className="p-4 md:p-6 flex flex-col flex-1 relative">
                <div className="flex justify-between items-start mb-3 md:mb-4">
                  <div className="flex-1 min-h-[2.5rem] md:min-h-[3.5rem]">
                    <motion.h3
                      className="text-lg md:text-xl font-bold mb-2 leading-tight overflow-hidden"
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
                      className="flex items-center justify-between gap-2 mb-2 md:mb-3"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="text-lg md:text-xl font-bold"
                          style={{ color: "var(--color-primary)" }}
                        >
                          {vehicle.year}
                        </div>
                      </div>
                      <div
                        className="text-lg md:text-xl font-bold"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {vehicle.price}
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Vehicle Stats */}
                <motion.div
                  className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div
                    className="flex flex-col items-center text-center p-2 md:p-3 rounded-lg min-h-[3rem] md:min-h-[4rem]"
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
                    className="flex flex-col items-center text-center p-2 md:p-3 rounded-lg min-h-[3rem] md:min-h-[4rem]"
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
                    className="flex flex-col items-center text-center p-2 md:p-3 rounded-lg min-h-[3rem] md:min-h-[4rem]"
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

                {/* Actions */}
                <motion.div
                  className="flex flex-col gap-3 mt-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex flex-col gap-2 md:flex-row md:gap-3">
                    <motion.button
                      className={`flex-1 py-2 px-2 md:py-3 md:px-4 rounded-lg font-semibold text-center transition-all duration-75 h-10 md:h-12 text-xs md:text-base ${
                        !vehicle.isAvailable
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer"
                      }`}
                      style={{
                        backgroundColor: !vehicle.isAvailable
                          ? "#6b7280"
                          : "var(--color-primary)",
                        color: !vehicle.isAvailable
                          ? "#9ca3af"
                          : "var(--color-background)",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        whiteSpace: "nowrap",
                      }}
                      whileHover={
                        !vehicle.isAvailable
                          ? {}
                          : {
                              scale: 1.02,
                              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                            }
                      }
                      whileTap={!vehicle.isAvailable ? {} : { scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      disabled={!vehicle.isAvailable}
                      onClick={() =>
                        vehicle.isAvailable &&
                        openModel("car-contact", "", vehicle.name)
                      }
                    >
                      Réserver un essai
                    </motion.button>
                    <motion.button
                      className="flex-1 py-2 px-2 md:py-3 md:px-4 rounded-lg font-semibold border-2 text-center transition-all duration-75 h-10 md:h-12 text-xs md:text-base cursor-pointer"
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
                      onClick={() =>
                        (window.location.href = "tel:+15144943795")
                      }
                    >
                      Appeler
                    </motion.button>
                  </div>
                  <motion.button
                    className="w-full py-2 px-2 md:py-3 md:px-4 rounded-lg font-semibold text-center transition-all duration-75 h-10 md:h-12 text-xs md:text-base cursor-pointer"
                    style={{
                      border: "2px solid #6b7280",
                      color: "#6b7280",
                      backgroundColor: "transparent",
                    }}
                    whileHover={{
                      backgroundColor: "#f3f4f6",
                      borderColor: "#4b5563",
                      color: "#4b5563",
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => {
                      setSelectedVehicle(vehicle);
                      setIsCarDetailsOpen(true);
                    }}
                  >
                    Voir tous les détails
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
            onClick={() => (window.location.href = "/used-vehicles")}
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
              <span className="whitespace-nowrap">Véhicules Certifiés</span>
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

      {/* Car Details Modal */}
      <CarDetailsModel
        vehicle={selectedVehicle}
        isOpen={isCarDetailsOpen}
        onClose={() => {
          setIsCarDetailsOpen(false);
          setSelectedVehicle(null);
        }}
      />
    </section>
  );
};

export default UsedVehiclesSection;
