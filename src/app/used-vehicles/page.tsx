"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  Car,
  Fuel,
  Settings,
  Calendar,
  DollarSign,
  Star,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { featuredVehicles, Vehicle } from "@/Data/Cars";
import CarDetailsModel from "@/components/models/CarDetailsModel";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
  hover: { y: -8, transition: { duration: 0.1 } },
};

type SortOption = "name" | "year" | "price" | "mileage";
type SortDirection = "asc" | "desc";
type ViewMode = "grid" | "list";

const UsedVehiclesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFuel, setSelectedFuel] = useState<string>("");
  const [selectedTransmission, setSelectedTransmission] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [yearRange, setYearRange] = useState<[number, number]>([2000, 2025]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isCarDetailsOpen, setIsCarDetailsOpen] = useState(false);

  // Get unique values for filters
  const fuelTypes = useMemo(() => {
    const fuels = [...new Set(featuredVehicles.map((vehicle) => vehicle.fuel))];
    return fuels;
  }, []);

  const transmissionTypes = useMemo(() => {
    const transmissions = [
      ...new Set(featuredVehicles.map((vehicle) => vehicle.transmission)),
    ];
    return transmissions;
  }, []);

  // Parse price string to number for filtering
  const parsePrice = (priceStr: string): number => {
    return parseInt(priceStr.replace(/[^0-9]/g, ""));
  };

  // Parse mileage string to number for sorting
  const parseMileage = (mileageStr: string): number => {
    return parseInt(mileageStr.replace(/[^0-9]/g, ""));
  };

  // Filter and sort vehicles
  const filteredAndSortedVehicles = useMemo(() => {
    const filtered = featuredVehicles.filter((vehicle) => {
      const matchesSearch =
        vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.year.toString().includes(searchTerm);
      const matchesFuel = !selectedFuel || vehicle.fuel === selectedFuel;
      const matchesTransmission =
        !selectedTransmission || vehicle.transmission === selectedTransmission;
      const matchesPrice =
        parsePrice(vehicle.price) >= priceRange[0] &&
        parsePrice(vehicle.price) <= priceRange[1];
      const matchesYear =
        vehicle.year >= yearRange[0] && vehicle.year <= yearRange[1];
      const matchesAvailability = !showAvailableOnly || vehicle.isAvailable;

      return (
        matchesSearch &&
        matchesFuel &&
        matchesTransmission &&
        matchesPrice &&
        matchesYear &&
        matchesAvailability
      );
    });

    // Sort vehicles
    filtered.sort((a, b) => {
      let aValue: string | number, bValue: string | number;

      switch (sortBy) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "year":
          aValue = a.year;
          bValue = b.year;
          break;
        case "price":
          aValue = parsePrice(a.price);
          bValue = parsePrice(b.price);
          break;
        case "mileage":
          aValue = parseMileage(a.mileage);
          bValue = parseMileage(b.mileage);
          break;
        default:
          return 0;
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });

    return filtered;
  }, [
    searchTerm,
    selectedFuel,
    selectedTransmission,
    priceRange,
    yearRange,
    showAvailableOnly,
    sortBy,
    sortDirection,
  ]);

  const handleSortChange = (newSortBy: SortOption) => {
    if (sortBy === newSortBy) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortDirection("asc");
    }
  };

  const openCarDetails = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsCarDetailsOpen(true);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedFuel("");
    setSelectedTransmission("");
    setPriceRange([0, 200000]);
    setYearRange([2000, 2025]);
    setShowAvailableOnly(false);
  };

  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-screen">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/HeroSection.jpg')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <motion.div
            className="text-center text-white px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              style={{ color: "var(--color-primary)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Véhicules d&apos;occasion
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Découvrez notre inventaire complet de véhicules d&apos;occasion
              premium. Tous nos véhicules sont rigoureusement inspectés et
              garantis.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center space-x-2 text-lg">
                <Car size={24} style={{ color: "var(--color-primary)" }} />
                <span>{featuredVehicles.length} véhicules disponibles</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section
        className="py-20 relative"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter Bar */}
          <motion.div
            className="mb-12"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              {/* Search Bar */}
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Rechercher par modèle, marque..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-6 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white hover:bg-slate-600/50 transition-colors cursor-pointer"
                >
                  <SlidersHorizontal size={20} />
                  <span>Filtres</span>
                </button>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                      viewMode === "grid"
                        ? "bg-amber-500 border-amber-500 text-black"
                        : "bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600/50"
                    }`}
                  >
                    <Grid3X3 size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                      viewMode === "list"
                        ? "bg-amber-500 border-amber-500 text-black"
                        : "bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600/50"
                    }`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>

              {/* Filters */}
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-slate-600 pt-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {/* Fuel Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Fuel size={16} className="inline mr-2" />
                        Carburant
                      </label>
                      <select
                        value={selectedFuel}
                        onChange={(e) => setSelectedFuel(e.target.value)}
                        className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                      >
                        <option value="">Tous</option>
                        {fuelTypes.map((fuel) => (
                          <option key={fuel} value={fuel}>
                            {fuel}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Transmission */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Settings size={16} className="inline mr-2" />
                        Transmission
                      </label>
                      <select
                        value={selectedTransmission}
                        onChange={(e) =>
                          setSelectedTransmission(e.target.value)
                        }
                        className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                      >
                        <option value="">Tous</option>
                        {transmissionTypes.map((transmission) => (
                          <option key={transmission} value={transmission}>
                            {transmission}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Year Range */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Calendar size={16} className="inline mr-2" />
                        Année ({yearRange[0]} - {yearRange[1]})
                      </label>
                      <div className="px-3">
                        <input
                          type="range"
                          min="2000"
                          max="2025"
                          value={yearRange[1]}
                          onChange={(e) =>
                            setYearRange([
                              yearRange[0],
                              parseInt(e.target.value),
                            ])
                          }
                          className="w-full accent-amber-500"
                        />
                      </div>
                    </div>

                    {/* Availability */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Disponibilité
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={showAvailableOnly}
                          onChange={(e) =>
                            setShowAvailableOnly(e.target.checked)
                          }
                          className="accent-amber-500 cursor-pointer"
                        />
                        <span className="text-white">
                          Disponibles uniquement
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                      Réinitialiser les filtres
                    </button>
                    <div className="text-gray-400">
                      {filteredAndSortedVehicles.length} véhicule
                      {filteredAndSortedVehicles.length !== 1 ? "s" : ""} trouvé
                      {filteredAndSortedVehicles.length !== 1 ? "s" : ""}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Sort Options */}
          <motion.div
            className="flex flex-wrap gap-2 mb-8"
            variants={itemVariants}
          >
            {[
              { key: "name", label: "Nom", icon: null },
              { key: "year", label: "Année", icon: Calendar },
              { key: "price", label: "Prix", icon: DollarSign },
              { key: "mileage", label: "Kilométrage", icon: null },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => handleSortChange(key as SortOption)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors cursor-pointer ${
                  sortBy === key
                    ? "bg-amber-500 border-amber-500 text-black"
                    : "bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600/50"
                }`}
              >
                {Icon && <Icon size={16} />}
                <span>{label}</span>
                {sortBy === key &&
                  (sortDirection === "asc" ? (
                    <SortAsc size={16} />
                  ) : (
                    <SortDesc size={16} />
                  ))}
              </button>
            ))}
          </motion.div>

          {/* Vehicles Display */}
          {filteredAndSortedVehicles.length === 0 ? (
            <motion.div className="text-center py-16" variants={itemVariants}>
              <Car size={64} className="mx-auto text-gray-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-400 mb-2">
                Aucun véhicule trouvé
              </h3>
              <p className="text-gray-500">
                Essayez de modifier vos critères de recherche.
              </p>
            </motion.div>
          ) : (
            <motion.div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-6"
              }
              variants={containerVariants}
            >
              {filteredAndSortedVehicles.map((vehicle, index) => (
                <motion.div
                  key={vehicle.id}
                  className={`group relative overflow-hidden rounded-2xl transition-shadow duration-200 ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(245, 158, 11, 0.2)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                  }}
                  variants={cardVariants}
                  whileHover="hover"
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className={`relative overflow-hidden ${
                      viewMode === "list" ? "w-1/3 h-84" : "h-64"
                    }`}
                  >
                    <Image
                      src={vehicle.image}
                      alt={vehicle.name}
                      fill
                      className={`object-cover transition-transform duration-300 ${
                        viewMode === "list" ? "h-83" : "h-64"
                      }`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
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

                  <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1 min-h-[3.5rem]">
                        <h3
                          className="text-xl font-bold mb-2 leading-tight overflow-hidden"
                          style={{
                            color: "#ffffff",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {vehicle.name}
                        </h3>
                        <div className="flex items-center justify-between gap-2 mb-3">
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
                            <span
                              className="text-sm"
                              style={{ color: "#d1d5db" }}
                            >
                              {vehicle.year}
                            </span>
                          </div>
                          <div
                            className="text-xl font-bold"
                            style={{ color: "var(--color-primary)" }}
                          >
                            {vehicle.price}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Vehicle Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
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
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 mt-auto">
                      <div className="flex gap-3">
                        <motion.button
                          className={`flex-1 py-3 px-4 rounded-lg font-semibold text-center transition-all duration-75 h-12 ${
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
                          onClick={(e) => {
                            e.stopPropagation();
                            if (vehicle.isAvailable) {
                              // Handle contact modal or navigation
                            }
                          }}
                        >
                          Réserver un essai
                        </motion.button>
                        <motion.button
                          className="flex-1 py-3 px-4 rounded-lg font-semibold border-2 text-center transition-all duration-75 h-12 cursor-pointer"
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
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = "tel:5144943795";
                          }}
                        >
                          Appeler
                        </motion.button>
                      </div>
                      <motion.button
                        className="w-full py-3 px-4 rounded-lg font-semibold text-center transition-all duration-75 h-12 cursor-pointer"
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
                        onClick={(e) => {
                          e.stopPropagation();
                          openCarDetails(vehicle);
                        }}
                      >
                        Voir tous les détails
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Car Details Modal */}
      <CarDetailsModel
        vehicle={selectedVehicle}
        isOpen={isCarDetailsOpen}
        onClose={() => setIsCarDetailsOpen(false)}
      />

      <Footer />
    </div>
  );
};

export default UsedVehiclesPage;
