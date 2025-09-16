"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import ContactModal from '../models/ContactModal';

interface ModalContextType {
  openModal: (type: string, serviceName?: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<string>('consultation');
  const [serviceName, setServiceName] = useState<string>('');

  const openModal = (type: string, serviceName?: string) => {
    setModalType(type);
    setServiceName(serviceName || '');
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <ContactModal
        isOpen={isOpen}
        onClose={closeModal}
        formType={modalType}
        serviceName={serviceName}
      />
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};