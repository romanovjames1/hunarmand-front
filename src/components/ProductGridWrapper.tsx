import React, { ReactElement, useCallback, useEffect, useState } from "react";
import customFetch from "../axios/custom";
import { useAppDispatch, useAppSelector } from "../hooks";
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

  useEffect(() => {
    if (externalProducts && externalProducts.length > 0) {
      const sliced = limit
        ? externalProducts.slice(0, limit)
        : externalProducts;

      setProducts(sliced);
      dispatch(setShowingProducts(sliced.length));
      dispatch(setTotalProducts(externalProducts.length));
    }
  }, [externalProducts, limit]);

  const loadProductsFromAPI = useCallback(
    async (query: string, sort: string, page: number) => {
      if (externalProducts) return;

      try {
        const response = await customFetch("/product");
        const allProducts = response.data.data;

        let searchedProducts = [...allProducts];

        if (query) {
          searchedProducts = searchedProducts.filter((product: Product) =>
            product.title.toLowerCase().includes(query.toLowerCase())
          );
        }

        // 🔹 CATEGORY FILTER TO'G'RILANDI
        if (category) {
          searchedProducts = searchedProducts.filter(
            (product: Product) =>
              product.category?.title.toLowerCase() === category.toLowerCase()
          );
        }

        if (totalProducts !== searchedProducts.length) {
          dispatch(setTotalProducts(searchedProducts.length));
        }

        if (sort === "price-asc") {
          searchedProducts.sort((a, b) => a.price - b.price);
        } else if (sort === "price-desc") {
          searchedProducts.sort((a, b) => b.price - a.price);
        }

        let sliced = searchedProducts;

        if (limit) {
          sliced = searchedProducts.slice(0, limit);
        } else if (page) {
          sliced = searchedProducts.slice(0, page * 9);
        }

        setProducts(sliced);
        dispatch(setShowingProducts(sliced.length));
      } catch (error) {
        console.log("ERROR LOADING PRODUCTS", error);
        setProducts([]);
      }
    },
    [externalProducts, category, totalProducts, dispatch, limit] // category qo‘shildi
  );

  useEffect(() => {
    if (!externalProducts) {
      loadProductsFromAPI(searchQuery || "", sortCriteria || "", page || 1);
    }
  }, [searchQuery, sortCriteria, page]);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { products });
    }
    return child;
  });

  return childrenWithProps;
};

export default ProductGridWrapper;
