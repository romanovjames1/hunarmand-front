// import React from "react";
// import ProductItem from "./ProductItem";

type Product = {
  _id: string;
  title: string;
  price: number;
  thumbnail: string;
  images: string[];
  category: {
    _id: string;
    title_uz: string;
    title_ru: string;
    title_en: string;
  };
  stockQuantity: number;
  popularity?: number;
};

interface Props {
  products?: Product[];
}

// const ProductGrid: React.FC<Props> = ({ products = [] }) => {
//   if (!products.length)
//     return (
//       <p className="text-center w-full mt-10">
//         No products found for this language.
//       </p>
//     );

//   return (
//     <div
//       id="gridTop"
//       className="
//         max-w-screen-2xl
//         flex flex-wrap
//         justify-between
//         max-sm:justify-center     /* 📌 mobile: markazga olib keladi */
//         items-center
//         gap-y-8
//         mx-auto mt-12
//         max-xl:justify-start
//         max-xl:gap-5
//         px-5
//         max-[400px]:px-3
//       "
//     >
//       {products.map((product) => (
//         <ProductItem
//           key={product._id}
//           id={product._id}
//           image={product.thumbnail || product.images?.[0] || ""}
//           title={product.title}
//           category={product.category}
//           price={product.price}
//           popularity={product.popularity ?? 0}
//           stock={product.stockQuantity}
//         />
//       ))}
//     </div>
//   );
// };

// export default React.memo(ProductGrid);

import React from "react";
import ProductItem from "./ProductItem";
import { useTranslation } from "react-i18next"; // Use the hook you found

// ... types (make sure Translation array is included) ...

const ProductGrid: React.FC<Props> = ({ products = [] }) => {
  const { i18n } = useTranslation();

  // Normalize language to match your DB ("UZ", "RU", "EN")
  const currentLang = i18n.language.toUpperCase();

  if (!products.length)
    return <p className="text-center w-full mt-10">No products found.</p>;

  return (
    <div
      id="gridTop"
      className="max-w-screen-2xl flex flex-wrap justify-between items-center gap-y-8 mx-auto mt-12 px-5"
    >
      {products.map((product) => {
        // 1. FIND the translation for the current language
        const activeTranslation =
          product.translations?.find((t) => t.language === currentLang) ||
          product.translations?.[0]; // Fallback if UZ/RU/EN is missing

        // 2. CHOOSE the category translation
        const categoryTitle =
          currentLang === "UZ"
            ? product.category?.title_uz
            : currentLang === "RU"
            ? product.category?.title_ru
            : product.category?.title_en;

        return (
          <ProductItem
            key={product._id}
            id={product._id}
            image={product.thumbnail || product.images?.[0] || ""}
            title={activeTranslation?.title || "No Title"} // Dynamic Title
            category={categoryTitle || "Uncategorized"} // Dynamic Category
            price={product.price}
            popularity={product.popularity ?? 0}
            stock={product.stockQuantity}
          />
        );
      })}
    </div>
  );
};
