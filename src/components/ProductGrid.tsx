import React from "react";
import ProductItem from "./ProductItem";

type Product = {
  _id: string;
  title: string;
  price: number;
  thumbnail: string;
  images: string[];
  category: {
    _id: string;
    title: string;
    language: string;
  };
  language: string;
  stockQuantity: number;
  popularity?: number;
};

interface Props {
  products?: Product[];
}

const ProductGrid: React.FC<Props> = ({ products = [] }) => {
  if (!products.length)
    return (
      <p className="text-center w-full mt-10">
        No products found for this language.
      </p>
    );

  return (
    <div
      id="gridTop"
      className="
        max-w-screen-2xl 
        flex flex-wrap 
        justify-between 
        max-sm:justify-center     /* 📌 mobile: markazga olib keladi */
        items-center 
        gap-y-8 
        mx-auto mt-12 
        max-xl:justify-start 
        max-xl:gap-5 
        px-5 
        max-[400px]:px-3
      "
    >
      {products.map((product) => (
        <ProductItem
          key={product._id}
          id={product._id}
          image={product.thumbnail || product.images?.[0] || ""}
          title={product.title}
          category={product.category}
          price={product.price}
          popularity={product.popularity ?? 0}
          stock={product.stockQuantity}
        />
      ))}
    </div>
  );
};

export default React.memo(ProductGrid);
