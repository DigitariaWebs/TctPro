import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Grid3X3 } from "lucide-react";
import { Vehicle } from "../../Data/Cars";

interface CarDetailsModelProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
}

const CarDetailsModel: React.FC<CarDetailsModelProps> = ({
  vehicle,
  isOpen,
  onClose,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showThumbnails, setShowThumbnails] = useState(false);

  // Combine cover image with gallery for complete image set
  const allImages = vehicle ? [vehicle.image, ...vehicle.gallery] : [];

  // Reset state when modal opens/closes or vehicle changes
  useEffect(() => {
    if (isOpen && vehicle) {
      setCurrentImageIndex(0);
      setShowThumbnails(false);
    }
  }, [isOpen, vehicle]);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      // Store the current scroll position
      const scrollY = window.scrollY;

      // Prevent scrolling on body
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      return () => {
        // Restore scrolling and position when modal closes
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";

        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowLeft":
          navigateImage("prev");
          break;
        case "ArrowRight":
          navigateImage("next");
          break;
        case "Escape":
          onClose();
          break;
        case "g":
        case "G":
          setShowThumbnails(!showThumbnails);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isOpen, currentImageIndex, showThumbnails, onClose]);

  const navigateImage = (direction: "next" | "prev") => {
    if (!allImages.length) return;

    if (direction === "next") {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    } else {
      setCurrentImageIndex(
        (prev) => (prev - 1 + allImages.length) % allImages.length
      );
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
    setShowThumbnails(false);
  };

  if (!isOpen || !vehicle) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="relative w-full h-full max-w-7xl mx-auto p-4 flex flex-col"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4 px-2">
            <div className="flex items-center space-x-4">
              <h2
                className="text-2xl md:text-3xl font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                {vehicle.name}
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowThumbnails(!showThumbnails)}
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 transition-colors cursor-pointer"
                style={{ color: "var(--color-text)" }}
                title="Toggle thumbnails (G)"
              >
                <Grid3X3 size={20} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 transition-colors cursor-pointer"
                style={{ color: "var(--color-text)" }}
                title="Close (Esc)"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Main Image Container */}
          <div className="flex-1 relative flex items-center justify-center min-h-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={allImages[currentImageIndex]}
                alt={`${vehicle.name} - Image ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>

            {/* Navigation Arrows */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={() => navigateImage("prev")}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-all hover:scale-110 cursor-pointer"
                  style={{ color: "var(--color-primary)" }}
                  title="Previous image (←)"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => navigateImage("next")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-all hover:scale-110 cursor-pointer"
                  style={{ color: "var(--color-primary)" }}
                  title="Next image (→)"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          <AnimatePresence>
            {showThumbnails && allImages.length > 1 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 overflow-hidden"
              >
                <div className="flex space-x-2 overflow-x-auto pb-2 px-2">
                  {allImages.map((image, index) => (
                    <motion.button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? "border-amber-500 opacity-100"
                          : "border-slate-600 opacity-60 hover:opacity-80"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Image Counter Dots */}
          {allImages.length > 1 && !showThumbnails && (
            <div className="flex justify-center mt-4 space-x-2">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? "bg-amber-500 scale-125"
                      : "bg-slate-600 hover:bg-slate-500"
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CarDetailsModel;
