import ProductGridWrapper from "./ProductGridWrapper";
import ProductGrid from "./ProductGrid";
import { useLanguage } from "../context/LanguageContext";
import { useProducts } from "../hooks/useProducts";
import { useTranslation } from "react-i18next";
import { CircleLoader } from "react-spinners";

const HomeCollectionSection = () => {
  const { selectedLang } = useLanguage();
  const { products, loading } = useProducts();
  const { t } = useTranslation();

  const filteredProducts = products.filter((p) =>
    // Check if any item in the translations array matches the selected language
    p.translations?.some(
      (translation: any) => translation.language === selectedLang.toUpperCase()
    )
  );

  if (loading)
    return (
      <div className="py-28 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-5">
          <CircleLoader size={70} color="#8B5E3C" speedMultiplier={1.2} />

          <p className="text-lg text-gray-700 animate-pulse">{t("loading")}</p>
        </div>
      </div>
    );

  return (
    <div>
      <h2 className="text-black text-5xl font-normal mt-24 text-center">
        {t("homeCollection")}
      </h2>

      {filteredProducts.length === 0 ? (
        <p className="text-center mt-10">
          {t("no_products", { lang: selectedLang })}
        </p>
      ) : (
        <ProductGridWrapper products={filteredProducts} limit={6}>
          <ProductGrid />
        </ProductGridWrapper>
      )}
    </div>
  );
};

export default HomeCollectionSection;
