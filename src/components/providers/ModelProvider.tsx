"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import ContactModel from '../models/ContactModel';
import CarContactModel from "../models/CarContactModel";

interface ModelContextType {
  openModel: (type: string, serviceName?: string, carName?: string) => void;
  closeModel: () => void;
}

const ModelContext = createContext<ModelContextType | undefined>(undefined);

interface ModelProviderProps {
  children: ReactNode;
}

export const ModelProvider: React.FC<ModelProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modelType, setModelType] = useState<string>("consultation");
  const [serviceName, setServiceName] = useState<string>("");
  const [carName, setCarName] = useState<string>("");

  const openModel = (type: string, serviceName?: string, carName?: string) => {
    setModelType(type);
    setServiceName(serviceName || "");
    setCarName(carName || "");
    setIsOpen(true);
  };

  const closeModel = () => {
    setIsOpen(false);
  };

  return (
    <ModelContext.Provider value={{ openModel, closeModel }}>
      {children}
      {modelType === "car-contact" ? (
        <CarContactModel
          isOpen={isOpen}
          onClose={closeModel}
          carName={carName}
        />
      ) : (
        <ContactModel
          isOpen={isOpen}
          onClose={closeModel}
          formType={modelType}
          serviceName={serviceName}
        />
      )}
    </ModelContext.Provider>
  );
};

export const useModel = (): ModelContextType => {
  const context = useContext(ModelContext);
  if (context === undefined) {
    throw new Error('useModel must be used within a ModelProvider');
  }
  return context;
};