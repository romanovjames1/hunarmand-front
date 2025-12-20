import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

// Project-specific imports
import { useAppDispatch } from "../hooks";
import { addProductToTheCart } from "../features/cart/cartSlice";
import {
  Button,
  Dropdown,
  ProductItem,
  QuantityInput,
  StandardSelectInput,
} from "../components";

// Helper wrappers
import WithSelectInputWrapper from "../utils/withSelectInputWrapper";
import WithNumberInputWrapper from "../utils/withNumberInputWrapper";

// 1. Updated Type to match your Backend
type Product = {
  _id: string;
  translations: {
    language: string;
    title: string;
    description: string;
  }[];
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

const SingleProduct = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.toUpperCase();
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string }>();

  // Components using HOCs
  const SelectInputUpgrade = WithSelectInputWrapper(StandardSelectInput);
  const QuantityInputUpgrade = WithNumberInputWrapper(QuantityInput);

  const [products, setProducts] = useState<Product[]>([]);
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);
  const [size, setSize] = useState<string>("XS");
  const [color, setColor] = useState<string>("black");
  const [quantity, setQuantity] = useState<number>(1);

  // 2. Helper to get the correct translated text
  const activeTranslation =
    singleProduct?.translations?.find(
      (trans) => trans.language === currentLang
    ) || singleProduct?.translations?.[0];

  const categoryTitle = singleProduct?.category
    ? currentLang === "UZ"
      ? singleProduct.category.title_uz
      : currentLang === "RU"
      ? singleProduct.category.title_ru
      : singleProduct.category.title_en
    : "";

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await fetch(
          `https://hunarmand.qaxramonov.uz/product/${params.id}`
        );
        const data = await response.json();
        setSingleProduct(data);
      } catch (err) {
        console.error("Fetch single product failed", err);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch("https://hunarmand.qaxramonov.uz/product");
        const data = await response.json();
        setProducts(data.data || []);
      } catch (err) {
        console.error("Fetch products failed", err);
      }
    };

    fetchSingleProduct();
    fetchProducts();
  }, [params.id]);

  const handleAddToCart = () => {
    if (singleProduct && activeTranslation) {
      dispatch(
        addProductToTheCart({
          id: singleProduct._id + size + color,
          image: singleProduct.thumbnail || singleProduct.images?.[0] || "",
          translations: singleProduct.translations, // CRITICAL: Pass translations for Cart
          title: activeTranslation.title,
          price: singleProduct.price,
          quantity,
          size,
          color,
          stockQuantity: singleProduct.stockQuantity, // Corrected from .stock
        })
      );
      toast.success(t("cart.addedSuccess"));
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-5 max-[400px]:px-3">
      <div className="grid grid-cols-3 gap-x-8 max-lg:grid-cols-1">
        <div className="lg:col-span-2">
          <img
            src={singleProduct?.thumbnail || singleProduct?.images?.[0] || ""}
            alt={activeTranslation?.title}
            className="w-full h-auto"
          />
        </div>

        <div className="w-full flex flex-col gap-5 mt-9">
          <div className="flex flex-col gap-2">
            {/* Dynamic Title from Database */}
            <h1 className="text-4xl">
              {activeTranslation?.title || "Yuklanmoqda..."}
            </h1>

            <div className="flex justify-between items-center">
              {/* Dynamic Category */}
              <p className="text-base text-secondaryBrown">{categoryTitle}</p>
              <p className="text-base font-bold">${singleProduct?.price}</p>
            </div>
          </div>
          {/* 1. Insert Size and Color Selectors here */}
          <div className="flex flex-col gap-4 mb-2">
            {/* Size Selector - */}
            {singleProduct?.sizes && singleProduct.sizes.length > 0 && (
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400 uppercase">Size</label>
                <select
                  className="w-full border border-gray-300 p-2 text-sm"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  {singleProduct.sizes.map((size: string) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Color Selector - */}
            {singleProduct?.colors && singleProduct.colors.length > 0 && (
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400 uppercase">Color</label>
                <select
                  className="w-full border border-gray-300 p-2 text-sm"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                >
                  {singleProduct.colors.map((color: string) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          {/* Button with Static Translation */}
          <div className="flex flex-col gap-3">
            <Button
              mode="brown"
              text={t("cart.addToCart")}
              onClick={handleAddToCart}
            />
          </div>

          {/* Description with Static Title and Dynamic Content */}
          <Dropdown dropdownTitle={t("product.description")}>
            <p className="text-gray-600 leading-relaxed">
              {activeTranslation?.description}
            </p>
          </Dropdown>
        </div>
      </div>

      {/* Similar Products Section */}
      <div>
        <h2 className="text-black/90 text-5xl mt-24 mb-12 text-center max-lg:text-4xl">
          Similar Products
        </h2>
        <div className="flex flex-wrap justify-between items-center gap-y-8 mt-12">
          {products.slice(0, 3).map((product) => {
            const simTranslation =
              product.translations?.find((t) => t.language === currentLang) ||
              product.translations?.[0];
            return (
              <ProductItem
                key={product._id}
                id={product._id}
                image={product.thumbnail || product.images?.[0] || ""}
                title={simTranslation?.title || "No Title"}
                category={product.category}
                price={product.price}
                stock={product.stockQuantity}
                popularity={product.popularity ?? 0}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
