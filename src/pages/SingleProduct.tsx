// import {
//   Button,
//   Dropdown,
//   ProductItem,
//   QuantityInput,
//   StandardSelectInput,
// } from "../components";
// import { useParams } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import { addProductToTheCart } from "../features/cart/cartSlice";
// import { useAppDispatch } from "../hooks";
// import WithSelectInputWrapper from "../utils/withSelectInputWrapper";
// import WithNumberInputWrapper from "../utils/withNumberInputWrapper";
// import { formatCategoryName } from "../utils/formatCategoryName";
// import toast from "react-hot-toast";

// type Product = {
//   _id: string;
//   title: string;
//   price: number;
//   thumbnail: string;
//   images: string[];
//   category: {
//     _id: string;
//     title: string;
//     language: string;
//   };
//   stockQuantity: number;
//   popularity?: number;
// };

// const SingleProduct = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [singleProduct, setSingleProduct] = useState<Product | null>(null);
//   const [size, setSize] = useState<string>("XS");
//   const [color, setColor] = useState<string>("black");
//   const [quantity, setQuantity] = useState<number>(1);

//   const params = useParams<{ id: string }>();
//   const dispatch = useAppDispatch();

//   const SelectInputUpgrade = WithSelectInputWrapper(StandardSelectInput);
//   const QuantityInputUpgrade = WithNumberInputWrapper(QuantityInput);

//   useEffect(() => {
//     const fetchSingleProduct = async () => {
//       const response = await fetch(
//         `https://hunarmand.qaxramonov.uz/product/${params.id}`
//       );
//       const data = await response.json();
//       setSingleProduct(data);
//     };

//     const fetchProducts = async () => {
//       const response = await fetch("https://hunarmand.qaxramonov.uz/product");
//       const data = await response.json();
//       setProducts(data.data || []);
//     };

//     fetchSingleProduct();
//     fetchProducts();
//   }, [params.id]);

//   const handleAddToCart = () => {
//     if (singleProduct) {
//       dispatch(
//         addProductToTheCart({
//           id: singleProduct._id + size + color,
//           image: singleProduct.thumbnail || singleProduct.images?.[0] || "",
//           title: singleProduct.title,
//           category: singleProduct.category,
//           price: singleProduct.price,
//           quantity,
//           size,
//           color,
//           popularity: singleProduct.popularity ?? 0,
//           stock: singleProduct.stockQuantity,
//         })
//       );
//       toast.success("Product added to the cart");
//     }
//   };

//   return (
//     <div className="max-w-screen-2xl mx-auto px-5 max-[400px]:px-3">
//       <div className="grid grid-cols-3 gap-x-8 max-lg:grid-cols-1">
//         <div className="lg:col-span-2">
//           <img
//             src={singleProduct?.thumbnail || singleProduct?.images?.[0] || ""}
//             alt={singleProduct?.title}
//           />
//         </div>
//         <div className="w-full flex flex-col gap-5 mt-9">
//           <div className="flex flex-col gap-2">
//             <h1 className="text-4xl">{singleProduct?.title}</h1>
//             <div className="flex justify-between items-center">
//               <p className="text-base text-secondaryBrown">
//                 {singleProduct?.category
//                   ? formatCategoryName(singleProduct.category.title)
//                   : ""}
//               </p>
//               <p className="text-base font-bold">${singleProduct?.price}</p>
//             </div>
//           </div>

//           <div className="flex flex-col gap-2">
//             <SelectInputUpgrade
//               selectList={[
//                 { id: "xs", value: "XS" },
//                 { id: "sm", value: "SM" },
//                 { id: "m", value: "M" },
//                 { id: "lg", value: "LG" },
//                 { id: "xl", value: "XL" },
//                 { id: "2xl", value: "2XL" },
//               ]}
//               value={size}
//               onChange={(e) => setSize(e.target.value)}
//             />
//             <SelectInputUpgrade
//               selectList={[
//                 { id: "black", value: "BLACK" },
//                 { id: "red", value: "RED" },
//                 { id: "blue", value: "BLUE" },
//                 { id: "white", value: "WHITE" },
//                 { id: "rose", value: "ROSE" },
//                 { id: "green", value: "GREEN" },
//               ]}
//               value={color}
//               onChange={(e) => setColor(e.target.value)}
//             />
//             <QuantityInputUpgrade
//               value={quantity}
//               onChange={(e) => setQuantity(parseInt(e.target.value))}
//             />
//           </div>

//           <div className="flex flex-col gap-3">
//             <Button mode="brown" text="Add to cart" onClick={handleAddToCart} />
//             <p className="text-secondaryBrown text-sm text-right">
//               Delivery estimated on the Friday, July 26
//             </p>
//           </div>

//           <Dropdown dropdownTitle="Description">
//             {singleProduct?.description}
//           </Dropdown>
//           <Dropdown dropdownTitle="Product Details">
//             Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//           </Dropdown>
//           <Dropdown dropdownTitle="Delivery Details">
//             Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//           </Dropdown>
//         </div>
//       </div>

//       {/* Similar products */}
//       <div>
//         <h2 className="text-black/90 text-5xl mt-24 mb-12 text-center max-lg:text-4xl">
//           Similar Products
//         </h2>
//         <div className="flex flex-wrap justify-between items-center gap-y-8 mt-12 max-xl:justify-start max-xl:gap-5">
//           {(products || []).slice(0, 3).map((product: Product) => (
//             <ProductItem
//               key={product._id}
//               id={product._id}
//               image={product.thumbnail || product.images?.[0] || ""}
//               title={product.title}
//               category={product.category}
//               price={product.price}
//               popularity={product.popularity ?? 0}
//               stock={product.stockQuantity}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SingleProduct;

import { useTranslation } from "react-i18next"; // Added for language support

// 1. Update the Product Type to match the new structure
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
    title_uz: string; // Updated field names
    title_ru: string;
    title_en: string;
  };
  stockQuantity: number;
  popularity?: number;
};

const SingleProduct = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.toUpperCase(); // e.g., "UZ"

  const [products, setProducts] = useState<Product[]>([]);
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);
  const [size, setSize] = useState<string>("XS");
  const [color, setColor] = useState<string>("black");
  const [quantity, setQuantity] = useState<number>(1);

  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

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

  const handleAddToCart = () => {
    if (singleProduct && activeTranslation) {
      dispatch(
        addProductToTheCart({
          id: singleProduct._id + size + color,
          image: singleProduct.thumbnail || singleProduct.images?.[0] || "",
          // FIX: Send the translations array so the Cart can read it
          translations: singleProduct.translations,
          title: activeTranslation.title, // Also send a flat title for safety
          price: singleProduct.price,
          quantity,
          size,
          color,
          stockQuantity: singleProduct.stockQuantity, // Corrected field name
        })
      );
      toast.success(t("cart.addedSuccess"));
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-5">
      <div className="grid grid-cols-3 gap-x-8 max-lg:grid-cols-1">
        <div className="lg:col-span-2">
          <img
            src={singleProduct?.thumbnail || singleProduct?.images?.[0] || ""}
            alt={activeTranslation?.title}
          />
        </div>
        <div className="w-full flex flex-col gap-5 mt-9">
          <div className="flex flex-col gap-2">
            {/* FIX: Use Translated Title */}
            <h1 className="text-4xl">
              {activeTranslation?.title || "Loading..."}
            </h1>
            <div className="flex justify-between items-center">
              <p className="text-base text-secondaryBrown">{categoryTitle}</p>
              <p className="text-base font-bold">${singleProduct?.price}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              mode="brown"
              text={t("cart.addToCart")}
              onClick={handleAddToCart}
            />
          </div>

          {/* FIX: Use Translated Description */}
          <Dropdown dropdownTitle={t("product.description")}>
            {activeTranslation?.description}
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
