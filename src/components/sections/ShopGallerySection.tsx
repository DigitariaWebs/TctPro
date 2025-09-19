"use client";

import React from 'react';
import Image from 'next/image';

const ShopGallerySection = () => {
  // Array of all images from the ShopGallerySection folder
  const galleryImages = [
    'AbderhmanInThePic.jpeg',
    'GMCFromTheFront.jpeg',
    'CarWithDoorOpened.jpeg',
    'Garage.jpeg',
    'ChevrolletFromBehind.jpeg',
    'WhiteMan.jpeg',
    'GMCGettingInTheGarage.jpeg',
    'ManCleaningTheCar.jpeg',
    'LaveAuto.jpeg',
    'MotorCucleFromTheFront.jpeg',  
    'MotorCycleFromTheSide1.jpeg',
    'MotorCycleFromTheSide2.jpeg',
    'PicciSign.jpeg',
    'Barbier.jpeg',
    'WhiteManWithCigarette.jpeg'
  ];

  return (
    <section className="py-4 px-4 md:py-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="columns-3 md:columns-5 gap-2 md:gap-4 w-full">
          {galleryImages.map((image, index) => (
            <div key={index} className="block mb-2 md:mb-4 break-inside-avoid">
              <Image
                src={`/ShopGallerySection/${image}`}
                alt={`Gallery image ${index + 1}`}
                width={300}
                height={0}
                className="w-full h-auto block rounded-md md:rounded-lg shadow-sm md:shadow-md"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopGallerySection;