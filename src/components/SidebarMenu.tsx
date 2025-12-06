import { useEffect, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";

const languages = [
  { code: "UZ", label: "UZ", flag: "🇺🇿" },
  { code: "RU", label: "RU", flag: "🇷🇺" },
  { code: "EN", label: "EN", flag: "🇬🇧" },
];

const SidebarMenu = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (prev: boolean) => void;
}) => {
  const { t, i18n } = useTranslation();
  const { selectedLang, setSelectedLang } = useLanguage();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isSidebarOpen) setIsAnimating(true);
    else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isSidebarOpen]);

  const handleLanguageChange = (lang: string) => {
    setSelectedLang(lang);
  };

  return (
    <>
      {(isSidebarOpen || isAnimating) && (
        <div
          className={
            isSidebarOpen
              ? "fixed top-0 left-0 w-64 z-50 h-full transition-transform duration-300 ease-in-out bg-white shadow-lg transform border-r translate-x-0"
              : "fixed top-0 left-0 w-64 z-50 h-full transition-transform duration-300 ease-in-out bg-white shadow-lg transform border-r -translate-x-full"
          }
        >
          <div className="flex justify-end mr-1 mt-1">
            <HiXMark
              className="text-3xl cursor-pointer"
              onClick={() => setIsSidebarOpen(false)}
            />
          </div>

          <div className="flex justify-center mt-2">
            <Link
              to="/"
              className="text-4xl font-light tracking-[1.08px] max-sm:text-3xl max-[400px]:text-2xl"
            >
              FASHION
            </Link>
          </div>

          <div className="flex flex-col items-center gap-1 mt-7">
            <Link to="/" className="py-2 border-y w-full flex justify-center">
              {t("home")}
            </Link>
            <Link
              to="/shop"
              className="py-2 border-y w-full flex justify-center"
            >
              {t("shop")}
            </Link>
            <Link
              to="/search"
              className="py-2 border-y w-full flex justify-center"
            >
              {t("search")}
            </Link>
            <Link
              to="/cart"
              className="py-2 border-y w-full flex justify-center"
            >
              {t("shoppingCart")}
            </Link>
          </div>

          <div className="mt-10 px-4">
            <h3 className="text-center mb-3 font-semibold">{t("language")}</h3>
            <div className="flex justify-center gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`px-3 py-1 rounded flex items-center gap-1 border ${
                    selectedLang === lang.code
                      ? "bg-black text-white"
                      : "bg-gray-100"
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarMenu;
