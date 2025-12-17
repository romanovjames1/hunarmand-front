// import { Link } from "react-router-dom";
// import { formatCategoryName } from "../utils/formatCategoryName";
// import { useTranslation } from "react-i18next";

// const ProductItem = ({
//   id,
//   image,
//   title,
//   category,
//   price,
//   popularity: _popularity,
//   stock: _stock,
// }: {
//   id: string;
//   image: string;
//   title: string;
//   category: { title: string };
//   price: number;
//   popularity: number;
//   stock: number;
// }) => {
//   const { t } = useTranslation();

//   return (
//     <div className="w-[400px] flex flex-col gap-2 justify-center max-md:w-[300px]">
//       <Link
//         to={`/product/${id}`}
//         className="w-full h-[300px] max-md:h-[200px] overflow-hidden"
//       >
//         <img src={image} alt={title} className="w-full h-full object-cover" />
//       </Link>
//       <Link
//         to={`/product/${id}`}
//         className="text-black text-center text-3xl tracking-[1.02px] max-md:text-2xl"
//       >
//         <h2>{title}</h2>
//       </Link>
//       <p className="text-secondaryBrown text-lg tracking-wide text-center max-md:text-base">
//         {category ? formatCategoryName(category.title) : ""}
//       </p>
//       <p className="text-black text-2xl text-center font-bold max-md:text-xl">
//         ${price}
//       </p>
//       <div className="w-full flex flex-col gap-1">
//         <Link
//           to={`/product/${id}`}
//           className="text-white bg-secondaryBrown text-center text-xl font-normal tracking-[0.6px] leading-[72px] w-full h-12 flex items-center justify-center max-md:text-base"
//         >
//           {t("viewProduct")}
//         </Link>
//         <Link
//           to={`/product/${id}`}
//           className="bg-white text-black text-center text-xl border border-[rgba(0, 0, 0, 0.40)] font-normal tracking-[0.6px] leading-[72px] w-full h-12 flex items-center justify-center max-md:text-base"
//         >
//           {t("learnMore")}
//         </Link>
//       </div>
//     </div>
//   );
// };
// export default ProductItem;

import { Link } from "react-router-dom";
import { formatCategoryName } from "../utils/formatCategoryName";
import { useTranslation } from "react-i18next";

// Updated the type definition for 'category' from object to string
interface ProductItemProps {
  id: string;
  image: string;
  title: string;
  category: string; // Changed from { title: string } to string
  price: number;
  popularity?: number;
  stock?: number;
}

const ProductItem = ({
  id,
  image,
  title,
  category,
  price,
  popularity: _popularity,
  stock: _stock,
}: ProductItemProps) => {
  const { t } = useTranslation();

  return (
    <div className="w-[400px] flex flex-col gap-2 justify-center max-md:w-[300px]">
      <Link
        to={`/product/${id}`}
        className="w-full h-[300px] max-md:h-[200px] overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <Link
        to={`/product/${id}`}
        className="text-black text-center text-3xl tracking-[1.02px] max-md:text-2xl mt-2 font-medium truncate px-2"
      >
        <h2>{title}</h2>
      </Link>

      {/* Since category is now a string, we display it directly or format it */}
      <p className="text-secondaryBrown text-lg tracking-wide text-center max-md:text-base italic">
        {category ? formatCategoryName(category) : t("uncategorized")}
      </p>

      <p className="text-black text-2xl text-center font-bold max-md:text-xl">
        ${price}
      </p>

      <div className="w-full flex flex-col gap-2 mt-2 px-4">
        <Link
          to={`/product/${id}`}
          className="text-white bg-secondaryBrown text-center text-xl font-normal tracking-[0.6px] w-full h-12 flex items-center justify-center rounded transition-colors hover:bg-opacity-90 max-md:text-base"
        >
          {t("viewProduct")}
        </Link>
        <Link
          to={`/product/${id}`}
          className="bg-white text-black text-center text-xl border border-gray-300 font-normal tracking-[0.6px] w-full h-12 flex items-center justify-center rounded transition-colors hover:bg-gray-50 max-md:text-base"
        >
          {t("learnMore")}
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
