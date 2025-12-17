// import React, { ReactElement, useCallback, useEffect, useState } from "react";
// import customFetch from "../axios/custom";
// import { useAppDispatch, useAppSelector } from "../hooks";
// import {
//   setShowingProducts,
//   setTotalProducts,
// } from "../features/shop/shopSlice";

// interface WrapperProps {
//   searchQuery?: string;
//   sortCriteria?: string;
//   category?: string;
//   page?: number;
//   limit?: number;
//   products?: Product[];
//   children:
//     | ReactElement<{ products: Product[] }>
//     | ReactElement<{ products: Product[] }>[];
// }

// const ProductGridWrapper = ({
//   searchQuery,
//   sortCriteria,
//   category,
//   page,
//   limit,
//   products: externalProducts,
//   children,
// }: WrapperProps) => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const dispatch = useAppDispatch();
//   const { totalProducts } = useAppSelector((state) => state.shop);

//   useEffect(() => {
//     if (externalProducts && externalProducts.length > 0) {
//       const sliced = limit
//         ? externalProducts.slice(0, limit)
//         : externalProducts;

//       setProducts(sliced);
//       dispatch(setShowingProducts(sliced.length));
//       dispatch(setTotalProducts(externalProducts.length));
//     }
//   }, [externalProducts, limit]);

//   const loadProductsFromAPI = useCallback(
//     async (query: string, sort: string, page: number) => {
//       if (externalProducts) return;

//       try {
//         const response = await customFetch("/product");
//         const allProducts = response.data.data;

//         let searchedProducts = [...allProducts];

//         if (query) {
//           searchedProducts = searchedProducts.filter((product: Product) =>
//             product.title.toLowerCase().includes(query.toLowerCase())
//           );
//         }

//         // 🔹 CATEGORY FILTER TO'G'RILANDI
//         if (category) {
//           searchedProducts = searchedProducts.filter(
//             (product: Product) =>
//               product.category?.title.toLowerCase() === category.toLowerCase()
//           );
//         }

//         if (totalProducts !== searchedProducts.length) {
//           dispatch(setTotalProducts(searchedProducts.length));
//         }

//         if (sort === "price-asc") {
//           searchedProducts.sort((a, b) => a.price - b.price);
//         } else if (sort === "price-desc") {
//           searchedProducts.sort((a, b) => b.price - a.price);
//         }

//         let sliced = searchedProducts;

//         if (limit) {
//           sliced = searchedProducts.slice(0, limit);
//         } else if (page) {
//           sliced = searchedProducts.slice(0, page * 9);
//         }

//         setProducts(sliced);
//         dispatch(setShowingProducts(sliced.length));
//       } catch (error) {
//         console.log("ERROR LOADING PRODUCTS", error);
//         setProducts([]);
//       }
//     },
//     [externalProducts, category, totalProducts, dispatch, limit] // category qo‘shildi
//   );

//   useEffect(() => {
//     if (!externalProducts) {
//       loadProductsFromAPI(searchQuery || "", sortCriteria || "", page || 1);
//     }
//   }, [searchQuery, sortCriteria, page]);

//   const childrenWithProps = React.Children.map(children, (child) => {
//     if (React.isValidElement(child)) {
//       return React.cloneElement(child, { products });
//     }
//     return child;
//   });

//   return childrenWithProps;
// };

// export default ProductGridWrapper;

import React, { ReactElement, useCallback, useEffect, useState } from "react";
import customFetch from "../axios/custom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useTranslation } from "react-i18next"; // Added for language awareness
import {
  setShowingProducts,
  setTotalProducts,
} from "../features/shop/shopSlice";

interface WrapperProps {
  searchQuery?: string;
  sortCriteria?: string;
  category?: string;
  page?: number;
  limit?: number;
  products?: Product[];
  children:
    | ReactElement<{ products: Product[] }>
    | ReactElement<{ products: Product[] }>[];
}

const ProductGridWrapper = ({
  searchQuery,
  sortCriteria,
  category,
  page,
  limit,
  products: externalProducts,
  children,
}: WrapperProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useAppDispatch();
  const { totalProducts } = useAppSelector((state) => state.shop);
  const { i18n } = useTranslation(); // Detect language changes
  const currentLang = i18n.language.toUpperCase();

  // Handle external products (like in search results)
  useEffect(() => {
    if (externalProducts && externalProducts.length > 0) {
      const sliced = limit
        ? externalProducts.slice(0, limit)
        : externalProducts;

      setProducts(sliced);
      dispatch(setShowingProducts(sliced.length));
      dispatch(setTotalProducts(externalProducts.length));
    }
  }, [externalProducts, limit, dispatch]);

  const loadProductsFromAPI = useCallback(
    async (query: string, sort: string, pageNum: number) => {
      if (externalProducts) return;

      try {
        const response = await customFetch("/product");
        // Grab the data array from the nested response
        const allProducts = response.data.data || [];

        let processedProducts = [...allProducts];

        // FIX 1: Search inside the translations array
        if (query) {
          processedProducts = processedProducts.filter((product: any) => {
            const translation = product.translations?.find(
              (t: any) => t.language === currentLang
            );
            return translation?.title
              .toLowerCase()
              .includes(query.toLowerCase());
          });
        }

        // FIX 2: Filter category using the new multi-language keys
        if (category && category !== "all") {
          processedProducts = processedProducts.filter((product: any) => {
            const cat = product.category;
            if (!cat) return false;

            // Match the filter to the current site language
            const catTitle =
              currentLang === "UZ"
                ? cat.title_uz
                : currentLang === "RU"
                ? cat.title_ru
                : cat.title_en;

            return catTitle?.toLowerCase() === category.toLowerCase();
          });
        }

        // Dispatch total count to Redux for the "Showing X products" text
        dispatch(setTotalProducts(processedProducts.length));

        // FIX 3: Sorting and Pagination
        if (sort === "price-asc")
          processedProducts.sort((a, b) => a.price - b.price);
        if (sort === "price-desc")
          processedProducts.sort((a, b) => b.price - a.price);

        let sliced = processedProducts;
        if (limit) sliced = processedProducts.slice(0, limit);
        else if (pageNum) sliced = processedProducts.slice(0, pageNum * 9);

        setProducts(sliced);
        dispatch(setShowingProducts(sliced.length));
      } catch (error) {
        console.error("API Error:", error);
        setProducts([]);
      }
    },
    [externalProducts, category, currentLang, dispatch, limit]
  );

  // Reload when query, sort, page, OR LANGUAGE changes
  useEffect(() => {
    if (!externalProducts) {
      loadProductsFromAPI(searchQuery || "", sortCriteria || "", page || 1);
    }
  }, [
    searchQuery,
    sortCriteria,
    page,
    currentLang,
    externalProducts,
    loadProductsFromAPI,
  ]);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { products });
    }
    return child;
  });

  return <>{childrenWithProps}</>;
};

export default ProductGridWrapper;
