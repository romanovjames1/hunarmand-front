// import React from "react";
// import ProductItem from "./ProductItem";

// type Product = {
//   _id: string;
//   title: string;
//   price: number;
//   thumbnail: string;
//   images: string[];
//   category: {
//     _id: string;
//     title_uz: string;
//     title_ru: string;
//     title_en: string;
//   };
//   stockQuantity: number;
//   popularity?: number;
// };

// interface Props {
//   products?: Product[];
// }

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
import { useTranslation } from "react-i18next";

type Translation = {
  language: string;
  title: string;
  description: string;
};

type Product = {
  _id: string;
  translations: Translation[]; // Must be here to match your API!
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

const ProductGrid: React.FC<Props> = ({ products = [] }) => {
  const { i18n } = useTranslation();
  // Match i18next language to your DB "UZ", "RU", "EN"
  const currentLang = i18n.language.toUpperCase();

  // If the array is empty, it shows the "no_products" message you see now
  if (!products || products.length === 0)
    return <p className="text-center w-full mt-10">no_products</p>;

  return (
    <div className="max-w-screen-2xl flex flex-wrap justify-between items-center gap-y-8 mx-auto mt-12 px-5">
      {products.map((product) => {
        // Find translation for current language
        const activeTranslation =
          product.translations?.find((t) => t.language === currentLang) ||
          product.translations?.[0];

        // Pick category title based on language
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
            title={activeTranslation?.title || "No Title"}
            category={categoryTitle || "Uncategorized"}
            price={product.price}
            popularity={product.popularity ?? 0}
            stock={product.stockQuantity}
          />
        );
      })}
    </div>
  );
};

export default React.memo(ProductGrid);
