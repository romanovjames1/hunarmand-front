import React, { createContext, useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface LanguageContextType {
  selectedLang: string;
  setSelectedLang: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedLang, setSelectedLang] = useState("UZ");
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(selectedLang.toLowerCase());
  }, [selectedLang]);

  return (
    <LanguageContext.Provider value={{ selectedLang, setSelectedLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
